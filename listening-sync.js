const rules = require("./listening-rules.js");
const { sanitizeTrack } = require("./account-store.js");

const minuteMs = 60 * 1000;
const historyWindowMs = 30 * 24 * 60 * minuteMs;
// App-reported listening near a history play means Side B already counted it.
const appEventWindowMs = 5 * minuteMs;

class ReconnectRequiredError extends Error {
  constructor(message = "Spotify sign-in was revoked or expired. Reconnect Spotify.") {
    super(message);
    this.needsReconnect = true;
  }
}

function trackFromSpotify(item) {
  if (!item || item.type !== "track" || item.is_local) return null;
  return sanitizeTrack({
    id: item.id,
    title: item.name,
    artist: (item.artists || []).map((artist) => artist.name).join(", "),
    album: item.album?.name,
    // The 300 px album art (Spotify usually offers 640, 300 and 64).
    image: (item.album?.images || []).find((image) => image.width >= 100 && image.width <= 300)?.url || item.album?.images?.[0]?.url,
    duration: item.duration_ms / 1000,
    spotifyUri: item.uri,
    spotifyUrl: item.external_urls?.spotify,
    type: "discovery"
  });
}

const { detectTimestampMode, classifyPlays } = rules;

function createListeningSync({ store, log = console }) {
  const tokenCache = new Map();
  const refreshes = new Map();
  const syncs = new Map();
  let rateLimitedUntil = 0;

  function rememberAccessToken(userId, payload) {
    tokenCache.set(userId, {
      accessToken: payload.access_token,
      expiresAt: Date.now() + Number(payload.expires_in || 3600) * 1000,
      scope: payload.scope || ""
    });
  }

  async function refreshAccessToken(userId) {
    // Re-read the user so a refresh token rotated by an earlier refresh is used.
    const user = store.getUser(userId);
    let refreshToken;
    try {
      refreshToken = user && store.refreshTokenFor(user);
    } catch (error) {
      log.error("A stored Spotify token could not be decrypted; the user must reconnect.", error.message);
    }
    if (!refreshToken) {
      if (user) store.markNeedsReconnect(userId, "Reconnect Spotify to keep recording your listening.");
      throw new ReconnectRequiredError();
    }
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken, client_id: user.client_id }),
      signal: AbortSignal.timeout(15_000)
    });
    const payload = await response.json().catch(() => ({}));
    if (response.status === 400 || response.status === 401) {
      tokenCache.delete(userId);
      store.markNeedsReconnect(userId, "Spotify sign-in was revoked or expired. Reconnect Spotify.");
      throw new ReconnectRequiredError();
    }
    if (!response.ok || !payload.access_token) throw new Error(`Spotify token refresh failed (${response.status}).`);
    if (payload.refresh_token) store.updateRefreshToken(userId, payload.refresh_token);
    rememberAccessToken(userId, { ...payload, scope: payload.scope || user.scope });
    return tokenCache.get(userId);
  }

  // One refresh per user at a time, shared by the browser and the background job.
  function accessTokenFor(user, { force = false } = {}) {
    const cached = tokenCache.get(user.id);
    if (!force && cached && cached.expiresAt > Date.now() + minuteMs) return Promise.resolve(cached);
    if (!refreshes.has(user.id)) {
      refreshes.set(user.id, refreshAccessToken(user.id).finally(() => refreshes.delete(user.id)));
    }
    return refreshes.get(user.id);
  }

  async function spotifyGet(user, endpoint, retried = false) {
    const { accessToken } = await accessTokenFor(user, { force: retried });
    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      headers: { Accept: "application/json", Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(15_000)
    });
    if (response.status === 401 && !retried) return spotifyGet(user, endpoint, true);
    if (response.status === 429) {
      rateLimitedUntil = Date.now() + (Number(response.headers.get("retry-after")) || 60) * 1000;
      throw new Error("Spotify asked Side B to slow down; listening will sync later.");
    }
    if (!response.ok) throw new Error(`Spotify request failed (${response.status}) for ${endpoint.split("?")[0]}.`);
    return response.json();
  }

  async function runSync(userId, now) {
    const user = store.getUser(userId);
    if (!user || user.needs_reconnect || !user.refresh_token_enc) return null;
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (user.last_played_at) params.set("after", String(user.last_played_at));
      const history = await spotifyGet(user, `/me/player/recently-played?${params}`);
      const plays = (history.items || [])
        .map((item) => ({ playedAt: Date.parse(item.played_at), track: trackFromSpotify(item.track) }))
        .filter((play) => play.track && Number.isFinite(play.playedAt));
      // On the first sync, songs you already know shouldn't all show up as discoveries.
      const baseline = !user.baseline_done;
      const knownTracks = [];
      if (baseline) {
        for (const range of ["short_term", "medium_term", "long_term"]) {
          const top = await spotifyGet(user, `/me/top/tracks?time_range=${range}&limit=50`);
          (top.items || []).map(trackFromSpotify).filter(Boolean).forEach((track) => knownTracks.push(track));
        }
      }
      const recorded = { heard: 0, skipped: 0, discoveries: 0 };
      store.transaction(() => {
        knownTracks.forEach((track) => store.markKnown(userId, { ...track, type: "familiar" }, now));
        plays.forEach((play) => {
          store.insertPlay(userId, play, baseline ? "baseline" : null);
          if (baseline) store.markKnown(userId, play.track, play.playedAt);
        });
        const stored = store.recentPlays(userId, now - historyWindowMs);
        const mode = detectTimestampMode(stored);
        for (const { play, outcome, listenedRatio } of classifyPlays(stored, mode, now)) {
          const windowMs = play.track.duration * 1000 + appEventWindowMs;
          let finalOutcome = outcome;
          if (outcome !== "unknown"
            && store.hasAppEventNear(userId, play.track.id, play.playedAt - windowMs, play.playedAt + windowMs)) {
            finalOutcome = "app";
          } else if (outcome === "heard") {
            const result = store.markHeard(userId, play.track, { discoverIfNew: true, at: play.playedAt });
            recorded.heard += 1;
            if (result.discovered) recorded.discoveries += 1;
          } else if (outcome === "skipped" && store.applySkip(userId, play.track, listenedRatio, play.playedAt)) {
            recorded.skipped += 1;
          }
          store.setPlayOutcome(userId, play.playedAt, finalOutcome);
        }
        store.prune(userId, now - historyWindowMs);
        store.recordSync(userId, {
          baselineDone: true,
          lastPlayedAt: plays.reduce((latest, play) => Math.max(latest, play.playedAt), 0)
        });
      });
      return recorded;
    } catch (error) {
      if (!error.needsReconnect) store.recordSync(userId, { error: error.message });
      throw error;
    }
  }

  // minIntervalMs lets the browser ask for a sync on open without hammering Spotify.
  function syncUser(userId, { minIntervalMs = 0, now = Date.now() } = {}) {
    const user = store.getUser(userId);
    if (!user || (minIntervalMs && user.last_sync_at && now - user.last_sync_at < minIntervalMs)
      || Date.now() < rateLimitedUntil) {
      return Promise.resolve(null);
    }
    if (!syncs.has(userId)) syncs.set(userId, runSync(userId, now).finally(() => syncs.delete(userId)));
    return syncs.get(userId);
  }

  function start(intervalMinutes) {
    const syncEveryone = async () => {
      for (const user of store.syncableUsers()) {
        if (Date.now() < rateLimitedUntil) return;
        try {
          await syncUser(user.id);
        } catch (error) {
          log.error("Background listening sync failed for a user:", error.message);
        }
      }
    };
    const firstRun = setTimeout(() => void syncEveryone(), 10_000);
    const timer = setInterval(() => void syncEveryone(), intervalMinutes * minuteMs);
    return () => {
      clearTimeout(firstRun);
      clearInterval(timer);
    };
  }

  return {
    accessTokenFor,
    rememberAccessToken,
    syncUser,
    start,
    forget: (userId) => tokenCache.delete(userId)
  };
}

module.exports = { createListeningSync, detectTimestampMode, classifyPlays, trackFromSpotify, ReconnectRequiredError };
