const tracks = [
  { id: "afterglow", title: "Afterglow Avenue", artist: "Mira Sol", album: "Small Hours", duration: 218, color: "linear-gradient(145deg,#b87964,#e5b481 58%,#4d5550)", symbol: "a", familiarity: 96, periods: ["day", "week", "month"] },
  { id: "blue-hour", title: "Blue Hour in June", artist: "The Paper Kites", album: "Between the Lines", duration: 236, color: "linear-gradient(145deg,#3b6575,#a6b5a0 60%,#e5bd82)", familiarity: 90, periods: ["week", "month"] },
  { id: "slow-motion", title: "Slow Motion", artist: "Arlo Parks", album: "Soft Focus", duration: 202, color: "linear-gradient(145deg,#c4a3bb,#e4d3bb 58%,#879a84)", familiarity: 87, periods: ["day", "week", "month"] },
  { id: "coastline", title: "Coastline Static", artist: "Juniper Vale", album: "Open Roads", duration: 194, color: "linear-gradient(145deg,#4d7b72,#c6ac7b 58%,#e3d7b4)", familiarity: 82, periods: ["week", "month"] },
  { id: "golden", title: "Golden", artist: "Jill Scott", album: "Beautifully Human", duration: 219, color: "linear-gradient(145deg,#e3a747,#d48349 56%,#9a4b47)", familiarity: 80, periods: ["day", "week", "month"] },
  { id: "little-lights", title: "Little Lights", artist: "Kieran Moss", album: "Familiar Weather", duration: 227, color: "linear-gradient(145deg,#545e80,#a6a5bd 56%,#ded0a4)", familiarity: 76, periods: ["month"] },
  { id: "sunday", title: "Sunday Kind of Love", artist: "Etta James", album: "At Last!", duration: 228, color: "linear-gradient(145deg,#844b46,#d3946a 56%,#e3c78d)", familiarity: 73, periods: ["day", "week", "month"] },
  { id: "soft-landing", title: "Soft Landing", artist: "Orla Gartland", album: "Freckle Season", duration: 203, color: "linear-gradient(145deg,#597a6a,#b0c29a 58%,#d6b284)", familiarity: 68, periods: ["week", "month"] },
  { id: "somewhere", title: "Somewhere, Slowly", artist: "Samia", album: "Honey", duration: 241, color: "linear-gradient(145deg,#b25f53,#e7ac80 58%,#8b7e66)", familiarity: 64, periods: ["month"] },
  { id: "golden-hour", title: "Golden Hour", artist: "Kacey Musgraves", album: "Golden Hour", duration: 210, color: "linear-gradient(145deg,#e3b76d,#c88167 56%,#766077)", familiarity: 61, periods: ["day", "week", "month"] },
  { id: "northbound", title: "Northbound", artist: "Luna Li", album: "Duality", duration: 189, color: "linear-gradient(145deg,#718c79,#d0c99d 56%,#c5835d)", familiarity: 0, periods: [] },
  { id: "electric-feel", title: "Electric Feel", artist: "MGMT", album: "Oracular Spectacular", duration: 229, color: "linear-gradient(145deg,#d69255,#b95155 56%,#4c527c)", familiarity: 0, periods: [] },
  { id: "pink-moon", title: "Pink Moon", artist: "Nick Drake", album: "Pink Moon", duration: 169, color: "linear-gradient(145deg,#b7a2a0,#e7d1b5 56%,#848e91)", familiarity: 0, periods: [] },
  { id: "bloom", title: "Bloom", artist: "The Japanese House", album: "Good at Falling", duration: 231, color: "linear-gradient(145deg,#536776,#8bb0a2 56%,#e0c18b)", familiarity: 0, periods: [] },
  { id: "dreams", title: "Dreams", artist: "Fleetwood Mac", album: "Rumours", duration: 257, color: "linear-gradient(145deg,#7e775e,#c7aa72 56%,#a7554e)", familiarity: 0, periods: [] },
  { id: "garden-song", title: "Garden Song", artist: "Phoebe Bridgers", album: "Punisher", duration: 220, color: "linear-gradient(145deg,#5e7867,#bdc4a4 56%,#d4a17d)", familiarity: 0, periods: [] },
  { id: "sweet-disposition", title: "Sweet Disposition", artist: "The Temper Trap", album: "Conditions", duration: 235, color: "linear-gradient(145deg,#6f657f,#baa0aa 56%,#d9bb88)", familiarity: 0, periods: [] },
  { id: "come-back", title: "Come Back to Earth", artist: "Mac Miller", album: "Swimming", duration: 150, color: "linear-gradient(145deg,#506d78,#9ab1a8 56%,#d9c290)", familiarity: 0, periods: [] },
  { id: "television", title: "Television / So Far So Good", artist: "Rex Orange County", album: "Who Cares?", duration: 271, color: "linear-gradient(145deg,#d89c60,#c57762 56%,#6d8282)", familiarity: 0, periods: [] },
  { id: "mystery", title: "Mystery of Love", artist: "Sufjan Stevens", album: "Call Me by Your Name", duration: 248, color: "linear-gradient(145deg,#9daf8a,#d7d2a9 56%,#b98067)", familiarity: 0, periods: [] },
  { id: "underwater", title: "Underwater", artist: "Hana Vu", album: "Public Storage", duration: 213, color: "linear-gradient(145deg,#4e6c7d,#789fa0 56%,#d4b598)", familiarity: 0, periods: [] }
];

const periodLabels = { day: "Today", week: "This week", month: "This month" };
const storageKeys = {
  discoveries: "sideb-discoveries-v1",
  saved: "sideb-saved-v1",
  likes: "sideb-likes-v1",
  clientId: "sideb-spotify-client-id-v1",
  held: "sideb-held-v1",
  heard: "sideb-heard-v1",
  seeds: "sideb-seeds-v1",
  pickMode: "sideb-pick-mode-v1",
  likedTracks: "sideb-liked-tracks-v1",
  savedUpdatedAt: "sideb-saved-updated-v1",
  nowPlaying: "sideb-now-playing-v1",
  listenSession: "sideb-listen-session-v1"
};
const spotifyTokenKey = "sideb-spotify-session-v1";
const spotifyScopes = [
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
  "streaming",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private"
];
const state = {
  period: "month",
  ratio: 65,
  lengthMode: "duration",
  durationMinutes: 45,
  trackCountTarget: 12,
  playlist: [],
  saved: readStorage(storageKeys.saved, []),
  discoveries: readStorage(storageKeys.discoveries, []),
  liked: readStorage(storageKeys.likes, []),
  // Song details for liked ids, so the Liked list can show and play them.
  likedTracks: readStorage(storageKeys.likedTracks, {}),
  held: readHeldTracks(),
  heard: readStorage(storageKeys.heard, []),
  seedTracks: readStorage(storageKeys.seeds, []),
  seedMode: readStorage(storageKeys.pickMode, "keep"),
  activeIndex: -1,
  elapsed: 0,
  timer: null,
  remoteTimer: null,
  remotePlayback: false,
  lastRemoteTrackId: null,
  // What the last progress check saw, so a tap can act without asking Spotify again first.
  lastSpotifyPlayback: null,
  // Spotify is on a song that isn't in the mix (past its end, or from Spotify's own queue).
  outsideMix: false,
  // That song, so skipping it early holds it back like a mix song.
  outsideTrack: null,
  currentSavedMixId: null,
  currentView: "mix",
  spotifyUser: null,
  spotifyError: null,
  spotifyConnecting: false,
  spotifyTopTracks: [],
  spotifyTopArtists: [],
  spotifyPlaylist: null,
  webPlayer: null,
  webPlayerDeviceId: null,
  pendingSpotifyPlay: null,
  listenSession: null
};
const listeningRules = window.SideBListeningRules;
const { heardThreshold, songKey } = listeningRules;
const isMobileBrowser = navigator.userAgentData?.mobile === true
  || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

const $ = (selector) => document.querySelector(selector);
const trackList = $("#track-list");
const collectionList = $("#collection-list");

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    showToast("Couldn't load saved data from this browser.");
    console.error(`Could not read ${key} from local storage.`, error);
    return fallback;
  }
}

// Earlier versions saved a cleared hold list as [] instead of {}.
function readHeldTracks() {
  const held = readStorage(storageKeys.held, {});
  return Array.isArray(held) ? {} : held;
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    showToast("Couldn't save in this browser. Check your storage settings.");
    console.error(`Could not write ${key} to local storage.`, error);
    return false;
  }
  return true;
}

function activeHeldEntries() {
  return Object.values(state.held).filter((entry) => listeningRules.isHoldActive(entry));
}

// A hold covers every release of the song, not only the one that was skipped.
function isTrackUnavailable(track) {
  if (listeningRules.isHoldActive(state.held[track.id])) return true;
  const key = songKey(track);
  return Boolean(key) && activeHeldEntries().some((entry) => songKey(entry.track) === key);
}

function sameSongIn(list, track) {
  const key = songKey(track);
  return list.find((candidate) => candidate.id === track.id || (key && songKey(candidate) === key));
}

function markTrackHeard(track) {
  if (!track?.id) return;
  if (!state.heard.includes(track.id)) {
    const nextHeard = [...state.heard, track.id];
    if (!writeStorage(storageKeys.heard, nextHeard)) return;
    state.heard = nextHeard;
  }
  const nextHeld = { ...state.held };
  if (nextHeld[track.id] && !nextHeld[track.id].blocked) {
    delete nextHeld[track.id];
    if (writeStorage(storageKeys.held, nextHeld)) state.held = nextHeld;
  }
  updateCounts();
}

function listenedSeconds(track) {
  return state.listenSession?.trackId === track?.id ? state.listenSession.listened : 0;
}

// Saved every few seconds so a refresh can carry on counting; a failed save just means that song starts over.
function saveListenSession(session) {
  try {
    localStorage.setItem(storageKeys.listenSession, JSON.stringify(session));
  } catch (error) {
    console.error("Couldn't save listening progress.", error);
  }
}

// Counts time actually spent listening, so seeking or resuming mid-song doesn't count as hearing it.
function recordListening(track, positionSeconds, isPlaying) {
  const now = Date.now();
  let session = state.listenSession;
  if (!session || session.trackId !== track.id) {
    // A song that started since the last check (even while the phone screen was off) gets its time so far.
    const secondsSinceLastCheck = session ? (now - session.lastCheckedAt) / 1000 : 5;
    session = state.listenSession = {
      trackId: track.id,
      listened: isPlaying && positionSeconds <= secondsSinceLastCheck + 2 ? positionSeconds : 0,
      lastPosition: positionSeconds,
      lastCheckedAt: now
    };
  } else {
    // Network delay varies between checks, so progress can run a little ahead of the clock. Cap it at the
    // time that passed instead of dropping it, so a slow connection doesn't lose listening but a seek still can't add any.
    const progressed = positionSeconds - session.lastPosition;
    const wallSeconds = (now - session.lastCheckedAt) / 1000;
    if (isPlaying && progressed > 0) session.listened += Math.min(progressed, wallSeconds + 2);
    session.lastPosition = positionSeconds;
    session.lastCheckedAt = now;
  }
  saveListenSession(session);
  if (session.counted || session.listened / track.duration < heardThreshold) return;
  session.counted = true;
  recordHeard(track);
}

function holdSkippedTrack(track, progressSeconds) {
  if (!track?.id) return;
  // A song heard past 60% counts as listened, so moving on from it isn't a skip.
  if (listenedSeconds(track) / track.duration >= heardThreshold) {
    // Usually already counted the moment it passed 60%; only count it here if that was missed.
    if (!state.listenSession?.counted) recordHeard(track);
    return;
  }
  const progressRatio = progressSeconds / track.duration;
  const hold = applyHold(track, progressRatio);
  if (!hold) return;
  rememberAppListen(track);
  reportListening({ type: "skip", track: accountTrack(track), progressRatio });
  showToast(hold.blocked
    ? `"${track.title}" was skipped early ${hold.earlySkipCount} times, so it's blocked. Allow it again from Held back.`
    : hold.earlySkip
      ? `"${track.title}" was skipped early and held back for ${hold.holdDays} days.`
      : `"${track.title}" was held back for ${hold.holdDays} days after the skip.`);
}

// Returns the new hold, or null when the song is blocked: a blocked song stays blocked.
function applyHold(track, progressRatio) {
  if (state.held[track.id]?.blocked) return null;
  const { holdDays, ...hold } = listeningRules.nextHold(state.held[track.id], progressRatio);
  const nextHeld = { ...state.held, [track.id]: { track, ...hold } };
  if (!writeStorage(storageKeys.held, nextHeld)) return null;
  state.held = nextHeld;
  updateCounts();
  return { ...hold, holdDays };
}

// Marks a song heard past 60%, saving it as a discovery when it came from the "new for you" pool.
function recordHeard(track) {
  // Only the first listen makes a discovery, so a song removed from Discoveries doesn't come back.
  const discovery = track.type === "discovery" && !state.heard.includes(track.id);
  markTrackHeard(track);
  if (discovery) saveDiscovery(track);
  rememberAppListen(track);
  reportListening({ type: "heard", track: accountTrack(track), discovery });
}

function removeDiscovery(track) {
  const nextDiscoveries = state.discoveries.filter((discovery) => discovery.id !== track.id);
  if (!writeStorage(storageKeys.discoveries, nextDiscoveries)) return;
  state.discoveries = nextDiscoveries;
  updateCounts();
  renderCollection();
  reportListening({ type: "remove-discovery", trackId: track.id });
  showToast(`Removed "${track.title}" from your discoveries.`);
}

function releaseHeldTrack(trackId, blocked = false) {
  const entry = state.held[trackId];
  if (!entry) return;
  const nextHeld = { ...state.held, [trackId]: { ...entry, blocked, heldUntil: blocked ? null : new Date().toISOString() } };
  // Allowing a blocked song again gives it a fresh start: it leaves Held back and its next skip counts as a first skip.
  if (entry.blocked && !blocked) delete nextHeld[trackId];
  if (!writeStorage(storageKeys.held, nextHeld)) return;
  state.held = nextHeld;
  updateCounts();
  renderCollection();
  reportListening({ type: "release", trackId, blocked });
  showToast(blocked ? "Song blocked from future mixes." : "Song is eligible for rotation again.");
}

function formatTime(seconds) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function spotifyClientId() {
  return localStorage.getItem(storageKeys.clientId) || SideBMusicPlatforms.clientId("spotify") || "";
}

function redirectUri() {
  return `${window.location.origin}${window.location.pathname}`;
}

function randomVerifier() {
  const bytes = crypto.getRandomValues(new Uint8Array(64));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function createCodeChallenge(verifier) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  const bytes = new Uint8Array(digest);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function readSpotifySession() {
  try {
    return JSON.parse(sessionStorage.getItem(spotifyTokenKey) || "null");
  } catch (error) {
    console.error("Could not read the Spotify session.", error);
    return null;
  }
}

function writeSpotifySession(session) {
  try {
    sessionStorage.setItem(spotifyTokenKey, JSON.stringify(session));
  } catch (error) {
    console.error("Could not save the Spotify session in this browser tab.", error);
    showToast("Couldn't keep the Spotify session in this tab. Check browser storage settings.");
    return false;
  }
  return true;
}

async function authorizeSpotify() {
  await SideBMusicPlatforms.loadConfig();
  const clientId = spotifyClientId().trim();
  if (!clientId) {
    openSpotifyDialog();
    showToast("Add your Spotify Client ID to connect.");
    return;
  }
  if (window.location.protocol === "file:") {
    showToast("Run Side B at http://127.0.0.1:4173 before connecting Spotify.");
    return;
  }
  const verifier = randomVerifier();
  const oauthState = randomVerifier().slice(0, 32);
  sessionStorage.setItem("sideb-spotify-verifier", verifier);
  sessionStorage.setItem("sideb-spotify-oauth-state", oauthState);
  const challenge = await createCodeChallenge(verifier);
  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri(),
    scope: spotifyScopes.join(" "),
    state: oauthState,
    code_challenge_method: "S256",
    code_challenge: challenge
  });
  window.location.assign(`https://accounts.spotify.com/authorize?${params.toString()}`);
}

async function exchangeSpotifyToken(body) {
  let response;
  try {
    response = await fetch("/spotify/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ ...body, client_id: spotifyClientId() }),
      signal: AbortSignal.timeout(15_000)
    });
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      throw new Error("Spotify sign-in timed out. Check your connection and try again.");
    }
    throw new Error(`Couldn't reach Spotify sign-in: ${error.message}`);
  }
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error_description || payload.error || `Spotify sign-in failed (${response.status}).`);
    error.status = response.status;
    error.code = payload.error;
    throw error;
  }
  const previousSession = readSpotifySession();
  // With a server session, the refresh token stays encrypted on the server and never reaches the browser.
  const serverSession = Boolean(payload.server_session);
  const session = {
    access_token: payload.access_token,
    refresh_token: serverSession ? null : payload.refresh_token || previousSession?.refresh_token || null,
    server_session: serverSession,
    scope: payload.scope || previousSession?.scope || "",
    expires_at: Date.now() + payload.expires_in * 1000
  };
  if (!writeSpotifySession(session)) throw new Error("Could not store your Spotify session in this browser tab.");
  return session;
}

const spotifyExpiredMessage = "Your Spotify session expired. Reconnect Spotify.";

// Clears a session Spotify no longer accepts so the UI asks to reconnect instead of showing "connected".
function endSpotifySession(message = spotifyExpiredMessage) {
  sessionStorage.removeItem(spotifyTokenKey);
  if (!state.spotifyUser) return;
  stopPlayback();
  disconnectSpotifyWebPlayer();
  state.spotifyUser = null;
  state.spotifyPlaylist = null;
  state.spotifyError = message;
  updateSpotifyUi();
  renderPlaylist();
  showToast(message);
}

async function getSpotifyAccessToken({ forceRefresh = false } = {}) {
  let session = readSpotifySession();
  if (!session?.access_token) {
    if (state.spotifyUser) endSpotifySession();
    throw new Error(state.spotifyError || "Connect your Spotify account to continue.");
  }
  if (!forceRefresh && session.expires_at > Date.now() + 30_000) return session.access_token;
  if (!session.refresh_token && !session.server_session) {
    endSpotifySession();
    throw new Error(spotifyExpiredMessage);
  }
  try {
    session = await exchangeSpotifyToken(session.server_session
      ? { grant_type: "refresh_token", ...(forceRefresh ? { force: "true" } : {}) }
      : { grant_type: "refresh_token", refresh_token: session.refresh_token });
  } catch (error) {
    // Only a rejected sign-in ends the session; network and server hiccups can be retried.
    if (error.status === 400 || error.status === 401) {
      endSpotifySession();
      throw new Error(spotifyExpiredMessage);
    }
    throw error;
  }
  return session.access_token;
}

async function spotifyRequest(endpoint, options = {}, retried = false) {
  const token = await getSpotifyAccessToken({ forceRefresh: retried });
  let response;
  try {
    response = await fetch(`/spotify/api/v1${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers
      },
      signal: AbortSignal.timeout(15_000)
    });
  } catch (error) {
    if (error.name === "TimeoutError" || error.name === "AbortError") {
      throw new Error("Spotify didn't respond in time. Check your connection and retry.");
    }
    throw new Error(`Couldn't reach Spotify: ${error.message}`);
  }
  if (response.status === 401) {
    // The token can be revoked or expire early; refresh once before giving up on the session.
    const session = readSpotifySession();
    if (!retried && (session?.refresh_token || session?.server_session)) return spotifyRequest(endpoint, options, true);
    endSpotifySession();
    throw new Error(spotifyExpiredMessage);
  }
  if (response.status === 429) {
    const retryAfterSeconds = Number(response.headers.get("retry-after")) || 30;
    state.spotifyQuietUntil = Date.now() + retryAfterSeconds * 1000;
    throw new Error(`Spotify asked Side B to slow down; trying again in ${retryAfterSeconds} seconds.`);
  }
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const reason = payload?.error?.message || payload?.error_description || `Spotify API request failed (${response.status}).`;
    const error = new Error(`${reason} (${endpoint})`);
    error.status = response.status;
    error.reason = payload?.error?.reason;
    throw error;
  }
  return payload;
}

function playableUris() {
  return state.playlist.map((track) => track.spotifyUri).filter(Boolean);
}

// Spotify accepts at most 100 songs per request.
async function replacePlaylistItems(playlistId, uris) {
  const endpoint = `/playlists/${encodeURIComponent(playlistId)}/items`;
  await spotifyRequest(endpoint, { method: "PUT", body: JSON.stringify({ uris: uris.slice(0, 100) }) });
  for (let start = 100; start < uris.length; start += 100) {
    await spotifyRequest(endpoint, { method: "POST", body: JSON.stringify({ uris: uris.slice(start, start + 100) }) });
  }
}

// The first song from index onward (wrapping around) that Spotify can play.
function playableIndexFrom(index, step = 1) {
  const count = state.playlist.length;
  for (let offset = 0; offset < count; offset += 1) {
    const candidate = ((index + offset * step) % count + count) % count;
    if (state.playlist[candidate]?.spotifyUri) return candidate;
  }
  return -1;
}

// Play only plays: it finds songs Spotify doesn't know yet, then hands Spotify the mix's songs.
// It never creates or changes a playlist; only Save to Spotify does that.
async function playMixOnSpotify(index = 0) {
  void state.webPlayer?.activateElement?.();
  if (state.playlist.some((track) => !track.spotifyUri)) {
    showToast("Finding these songs on Spotify…");
    const unmatched = await matchPlaylistTracksToSpotify();
    if (unmatched.length) {
      showToast(`${unmatched.length} ${unmatched.length === 1 ? "song isn't" : "songs aren't"} on Spotify and will be skipped.`);
    }
  }
  if (!playableUris().length) throw new Error("None of the songs in this mix could be found on Spotify.");
  await startSpotifyPlayback(playableIndexFrom(index));
}

// Spotify only lets apps start playback for Premium accounts.
function reportPlaybackError(error, prefix = "Couldn't start Spotify playback") {
  console.error(`${prefix}.`, error);
  if (error.status === 403) {
    showToast(state.spotifyPlaylist?.url
      ? "Spotify only lets apps start music for Premium accounts. Open this mix's Spotify copy and press play there."
      : "Spotify only lets apps start music for Premium accounts. Use Save to Spotify to keep this mix as a playlist, then play it in Spotify.",
    state.spotifyPlaylist?.url ? { label: "Open in Spotify", href: state.spotifyPlaylist.url } : null);
    return;
  }
  showToast(`${prefix}: ${error.message}`);
}

// A saved server sign-in lets a new tab or a reopened phone app reconnect without signing in again.
async function restoreServerSession() {
  try {
    await exchangeSpotifyToken({ grant_type: "refresh_token" });
  } catch (error) {
    if (error.code === "reconnect_required") state.spotifyError = error.message;
    else if (error.status !== 401) console.error("Couldn't restore the saved Spotify sign-in.", error);
  }
}

// Side B account: the server records listening in the background and keeps it the same on every device.
const accountPendingKey = "sideb-account-pending-v1";
const accountImportKey = "sideb-account-imported-v1";
let accountRequestSeq = 0;
let accountFlushBusy = false;
let lastAccountSyncAt = 0;

function hasServerAccount() {
  return Boolean(state.spotifyUser && readSpotifySession()?.server_session);
}

function accountTrack({ id, title, artist, album, duration, spotifyUri, spotifyUrl, type }) {
  return { id, title, artist, album, duration, spotifyUri, spotifyUrl, type };
}

async function accountRequest(path, { method = "GET", body } = {}) {
  const response = await fetch(path, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20_000)
  });
  if (response.status === 204) return null;
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.error || `Side B server request failed (${response.status}).`);
  return payload;
}

function applyAccountListening(listening) {
  if (!listening) return;
  state.heard = listening.heard;
  state.discoveries = listening.discoveries.map((track, index) => ({ ...track, color: track.color || getTrackColor(index) }));
  if (Array.isArray(listening.liked)) {
    state.likedTracks = Object.fromEntries(listening.liked.map((track, index) => [track.id, { ...track, color: track.color || getTrackColor(index) }]));
    state.liked = listening.liked.map((track) => track.id).reverse();
    writeStorage(storageKeys.likedTracks, state.likedTracks);
    writeStorage(storageKeys.likes, state.liked);
  }
  state.held = Object.fromEntries(Object.entries(listening.held).map(([trackId, entry], index) => [
    trackId,
    { ...entry, track: { ...entry.track, color: entry.track.color || getTrackColor(index) } }
  ]));
  writeStorage(storageKeys.heard, state.heard);
  writeStorage(storageKeys.discoveries, state.discoveries);
  writeStorage(storageKeys.held, state.held);
  updateCounts();
  renderPlaylist();
  if (state.currentView !== "mix") renderCollection();
}

// Events wait in browser storage until the server confirms them, so listening in a dead zone isn't lost.
function reportListening(event) {
  if (!hasServerAccount()) return;
  writeStorage(accountPendingKey, [...readStorage(accountPendingKey, []), event].slice(-200));
  void flushAccountEvents();
}

async function flushAccountEvents() {
  if (accountFlushBusy || !hasServerAccount()) return;
  accountFlushBusy = true;
  let failed = false;
  try {
    let pending = readStorage(accountPendingKey, []);
    while (pending.length) {
      const batch = pending.slice(0, 50);
      const seq = ++accountRequestSeq;
      const { listening } = await accountRequest("/api/listening/events", { method: "POST", body: { events: batch } });
      pending = readStorage(accountPendingKey, []).slice(batch.length);
      writeStorage(accountPendingKey, pending);
      // Only the newest response reflects every confirmed change.
      if (!pending.length && seq === accountRequestSeq) applyAccountListening(listening);
    }
  } catch (error) {
    failed = true;
    console.error("Couldn't save listening to your Side B account; it will retry.", error);
  } finally {
    accountFlushBusy = false;
  }
  if (!failed && readStorage(accountPendingKey, []).length) void flushAccountEvents();
}

// The first time a browser connects, its existing local history is added to the account.
async function importLocalListening() {
  const flag = `${accountImportKey}-${state.spotifyUser.id}`;
  // Likes were added to accounts later, so browsers that already imported their history import likes once more.
  const likedFlag = `${accountImportKey}-liked-${state.spotifyUser.id}`;
  const importAll = !localStorage.getItem(flag);
  if (!importAll && localStorage.getItem(likedFlag)) return;
  const liked = state.liked.map((id) => state.likedTracks[id]).filter(Boolean);
  await accountRequest("/api/listening/import", {
    method: "POST",
    body: importAll ? { heard: state.heard, discoveries: state.discoveries, held: state.held, liked } : { liked }
  });
  const now = new Date().toISOString();
  localStorage.setItem(flag, localStorage.getItem(flag) || now);
  localStorage.setItem(likedFlag, now);
}

function announceRecorded(recorded) {
  if (!recorded) return;
  const parts = [];
  if (recorded.discoveries) parts.push(`${recorded.discoveries} new ${recorded.discoveries === 1 ? "discovery" : "discoveries"}`);
  if (recorded.skipped) parts.push(`${recorded.skipped} ${recorded.skipped === 1 ? "skip" : "skips"} held back`);
  if (parts.length) showToast(`While you were away: ${parts.join(" · ")}.`);
}

// Saved mixes are kept on the server too, so they're the same on every device. The newest copy wins.
function writeSavedMixes(nextSaved) {
  if (!writeStorage(storageKeys.saved, nextSaved)) return false;
  state.saved = nextSaved;
  markSavedMixesChanged();
  return true;
}

let savedUploadTimer = null;
function markSavedMixesChanged() {
  writeStorage(storageKeys.savedUpdatedAt, Date.now());
  if (!hasServerAccount()) return;
  window.clearTimeout(savedUploadTimer);
  savedUploadTimer = window.setTimeout(() => void uploadSavedMixes(), 800);
}

async function uploadSavedMixes() {
  try {
    await accountRequest("/api/saved-mixes", {
      method: "PUT",
      body: { mixes: state.saved, updatedAt: readStorage(storageKeys.savedUpdatedAt, 0) || Date.now() }
    });
  } catch (error) {
    console.error("Couldn't save your mixes to your Side B account.", error);
  }
}

async function syncSavedMixes() {
  const server = await accountRequest("/api/saved-mixes");
  const localUpdatedAt = readStorage(storageKeys.savedUpdatedAt, 0);
  if (server.mixes && server.updatedAt > localUpdatedAt) {
    state.saved = server.mixes;
    writeStorage(storageKeys.saved, state.saved);
    writeStorage(storageKeys.savedUpdatedAt, server.updatedAt);
    if (state.currentView === "saved") renderCollection();
  } else if (localUpdatedAt > server.updatedAt || (!server.mixes && state.saved.length)) {
    await uploadSavedMixes();
  }
}

async function syncAccountListening() {
  if (!hasServerAccount() || Date.now() - lastAccountSyncAt < 60_000) return;
  lastAccountSyncAt = Date.now();
  try {
    await importLocalListening();
    await flushAccountEvents();
    await syncSavedMixes().catch((error) => console.error("Couldn't sync saved mixes.", error));
    const seq = ++accountRequestSeq;
    const result = await accountRequest("/api/listening/sync", { method: "POST" });
    if (seq === accountRequestSeq && !readStorage(accountPendingKey, []).length) applyAccountListening(result.listening);
    announceRecorded(result.recorded);
  } catch (error) {
    console.error("Couldn't sync listening with your Side B account.", error);
  }
}

// Play log: the last 30 days of Spotify plays. It lets "Today" and "This week" look further back than the
// 50 plays Spotify returns, and catches up listening done while Side B was closed when the server isn't
// recording it.
const playLogKey = "sideb-play-log-v1";
const appListenKey = "sideb-app-listens-v1";
const dayMs = 24 * 60 * 60 * 1000;
let catchUpBusy = false;
let lastCatchUpAt = 0;

// Remembers what Side B's own player counted, so the same play isn't counted again from history.
function rememberAppListen(track) {
  const recent = readStorage(appListenKey, []).filter((listen) => listen.at > Date.now() - 2 * dayMs);
  writeStorage(appListenKey, [...recent, { trackId: track.id, at: Date.now() }].slice(-300));
}

function addKnownTracks(trackIds) {
  const nextHeard = [...new Set([...state.heard, ...trackIds])];
  if (nextHeard.length !== state.heard.length && writeStorage(storageKeys.heard, nextHeard)) state.heard = nextHeard;
}

function judgePlays(plays) {
  const recorded = { discoveries: 0, skipped: 0 };
  const appListens = readStorage(appListenKey, []);
  const favoriteIds = new Set(state.spotifyTopTracks.map((track) => track.id));
  const mode = listeningRules.detectTimestampMode(plays);
  for (const { play, outcome, listenedRatio } of listeningRules.classifyPlays(plays, mode)) {
    play.outcome = outcome;
    if (outcome === "unknown") continue;
    const windowMs = play.track.duration * 1000 + 5 * 60 * 1000;
    if (appListens.some((listen) => listen.trackId === play.track.id && Math.abs(listen.at - play.playedAt) <= windowMs)) {
      play.outcome = "app";
      continue;
    }
    const track = { ...play.track, color: getTrackColor(recorded.discoveries + recorded.skipped) };
    if (outcome === "heard") {
      const isNew = !state.heard.includes(track.id) && !favoriteIds.has(track.id) && !sameSongIn(state.discoveries, track);
      markTrackHeard(track);
      if (isNew) {
        saveDiscovery({ ...track, type: "discovery" });
        recorded.discoveries += 1;
      }
    } else if (applyHold(track, listenedRatio)) {
      recorded.skipped += 1;
    }
  }
  return recorded;
}

async function catchUpPlayHistory() {
  if (!state.spotifyUser || catchUpBusy) return;
  catchUpBusy = true;
  lastCatchUpAt = Date.now();
  try {
    const log = readStorage(playLogKey, []);
    const params = new URLSearchParams({ limit: "50" });
    const newest = log.reduce((latest, play) => Math.max(latest, play.playedAt), 0);
    if (newest) params.set("after", String(newest));
    const history = await spotifyRequest(`/me/player/recently-played?${params.toString()}`);
    const firstRun = !log.length;
    // With a server account the server judges plays itself; then this log only feeds Today and This week.
    const judgeHere = !hasServerAccount() && !firstRun;
    const seen = new Set(log.map((play) => play.playedAt));
    const fresh = (history.items || [])
      .filter((item) => item.track?.type === "track" && !item.track.is_local)
      .map((item) => ({
        playedAt: Date.parse(item.played_at),
        track: accountTrack(fromSpotifyTrack(item.track, 0, "discovery")),
        outcome: judgeHere ? null : "not-judged"
      }))
      .filter((play) => Number.isFinite(play.playedAt) && !seen.has(play.playedAt));
    const plays = [...log, ...fresh]
      .filter((play) => play.playedAt >= Date.now() - 30 * dayMs)
      .sort((first, second) => first.playedAt - second.playedAt)
      .slice(-1000);
    // The first time, everything already played counts as known, so old favorites don't become discoveries.
    if (firstRun) addKnownTracks([...fresh.map((play) => play.track.id), ...state.spotifyTopTracks.map((track) => track.id)]);
    if (judgeHere) announceRecorded(judgePlays(plays));
    writeStorage(playLogKey, plays);
  } catch (error) {
    console.error("Couldn't catch up on Spotify listening.", error);
  } finally {
    catchUpBusy = false;
  }
}

// Plays since a time, from this browser's log plus the server's fuller log when there is one.
async function loggedPlaysSince(since) {
  const plays = new Map(readStorage(playLogKey, []).filter((play) => play.playedAt >= since).map((play) => [play.playedAt, play]));
  if (hasServerAccount()) {
    try {
      const result = await accountRequest(`/api/listening/plays?since=${since}`);
      result.plays.forEach((play) => plays.set(play.playedAt, play));
    } catch (error) {
      console.error("Couldn't load the server's play log.", error);
    }
  }
  return [...plays.values()];
}

// The play log stores Side B's track shape; mix building works with Spotify's.
function toSpotifyShape(track) {
  return {
    type: "track",
    id: track.id,
    uri: track.spotifyUri,
    name: track.title,
    artists: track.artist.split(", ").map((name) => ({ name })),
    album: { name: track.album },
    duration_ms: track.duration * 1000,
    external_urls: { spotify: track.spotifyUrl }
  };
}

async function handleSpotifyCallback() {
  if (SideBMusicPlatforms.hasPendingRedirect()) return false;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const returnedState = params.get("state");
  const oauthError = params.get("error");
  if (!code && !oauthError) return false;

  window.history.replaceState({}, document.title, redirectUri());
  if (oauthError) throw new Error(`Spotify sign-in was not completed: ${oauthError}.`);
  const expectedState = sessionStorage.getItem("sideb-spotify-oauth-state");
  const verifier = sessionStorage.getItem("sideb-spotify-verifier");
  sessionStorage.removeItem("sideb-spotify-oauth-state");
  sessionStorage.removeItem("sideb-spotify-verifier");
  if (!expectedState || returnedState !== expectedState || !verifier) {
    throw new Error("Spotify sign-in could not be verified. Please connect again.");
  }
  await exchangeSpotifyToken({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri(),
    code_verifier: verifier
  });
  return true;
}

function updateSpotifyUi() {
  const connected = Boolean(state.spotifyUser);
  const connectionLabel = connected
    ? "SPOTIFY CONNECTED"
    : state.spotifyConnecting
      ? "CONNECTING TO SPOTIFY"
      : state.spotifyError ? "SPOTIFY NEEDS ATTENTION" : "SAMPLE DATA";
  $("#connection-status").innerHTML = `<span class="status-dot"></span> ${connectionLabel}`;
  $("#connection-status").title = state.spotifyError || (connected ? "Spotify is connected." : "Using sample tracks until you connect Spotify.");
  $("#connect-button").querySelector("span:nth-child(2)").textContent = connected
    ? "Spotify connected"
    : state.spotifyConnecting ? "Connecting…"
      : state.spotifyError ? "Reconnect Spotify" : "Connect Spotify";
  $("#save-button").querySelector("span").textContent = saveButtonLabel();
  $("#save-local-button").classList.toggle("hidden", !connected);
  $("#save-local-button").textContent = state.currentSavedMixId ? "Update in Side B" : "Save in Side B";
  $("#data-source-label").textContent = connected ? "SPOTIFY TRACKS · SPOTIFY DEVICE PLAYBACK" : "SAMPLE TRACKS · PLAYBACK SIMULATED";
  $("#profile-button").querySelector(".profile-copy strong").textContent = state.spotifyUser?.display_name || "Music explorer";
  $("#profile-button").querySelector(".profile-copy small").textContent = connected ? "Spotify account" : "Connect Spotify";
  $("#profile-button .avatar").textContent = (state.spotifyUser?.display_name || "D").trim().charAt(0).toUpperCase();
  $("#playback-status-label").textContent = state.remotePlayback ? "SPOTIFY PLAYBACK" : connected ? "SPOTIFY DEVICE" : "DEMO PLAYBACK";
  $("#page-label").dataset.connected = String(connected);
}

function openSpotifyDialog() {
  const serverConfigured = Boolean(SideBMusicPlatforms.clientId("spotify"));
  $("#client-id-input").hidden = serverConfigured;
  $(".client-id-label[for='client-id-input']").hidden = serverConfigured;
  $("#client-id-input").value = spotifyClientId();
  $("#redirect-uri").textContent = redirectUri();
  $("#dialog-description").textContent = state.spotifyUser
    ? hasServerAccount()
      ? `Connected as ${state.spotifyUser.display_name || state.spotifyUser.id}. Side B records your Spotify listening in the background, even with this app closed. Disconnect signs out this device; Delete my Side B data stops recording and erases it.`
      : `Connected as ${state.spotifyUser.display_name || state.spotifyUser.id}. Reconnect to approve playback and playlist permissions, or disconnect this browser tab.`
    : serverConfigured
      ? "Connect your Spotify account. Side B uses its registered Spotify app; your Spotify password and account remain with Spotify."
      : "Create a Spotify developer app, then paste its Client ID here. Sign-in uses Spotify's PKCE flow; this app never asks for your Spotify password or a client secret.";
  $("#delete-account-button").classList.toggle("hidden", !hasServerAccount());
  $("#dialog-done").textContent = state.spotifyUser ? "Disconnect" : serverConfigured ? "Close" : "Save Client ID";
  $("#dialog-connect").textContent = state.spotifyUser ? "Reconnect" : serverConfigured ? "Connect Spotify" : "Save & connect";
  $("#info-dialog").showModal();
}

function getTrackColor(index) {
  const palettes = [
    "linear-gradient(145deg,#b87964,#e5b481 58%,#4d5550)",
    "linear-gradient(145deg,#3b6575,#a6b5a0 60%,#e5bd82)",
    "linear-gradient(145deg,#c4a3bb,#e4d3bb 58%,#879a84)",
    "linear-gradient(145deg,#4d7b72,#c6ac7b 58%,#e3d7b4)",
    "linear-gradient(145deg,#e3a747,#d48349 56%,#9a4b47)",
    "linear-gradient(145deg,#545e80,#a6a5bd 56%,#ded0a4)"
  ];
  return palettes[index % palettes.length];
}

function fromSpotifyTrack(track, index, type) {
  return {
    id: track.id,
    spotifyUri: track.uri,
    spotifyUrl: track.external_urls?.spotify,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    duration: Math.round(track.duration_ms / 1000),
    color: getTrackColor(index),
    familiarity: type === "familiar" ? Math.max(55, 100 - index * 3) : 0,
    type
  };
}

async function loadSpotifyMix() {
  if (!state.spotifyUser) return null;
  let familiarItems;
  if (state.period === "month") {
    const result = await spotifyRequest("/me/top/tracks?time_range=short_term&limit=50");
    familiarItems = result.items;
  } else {
    const result = await spotifyRequest("/me/player/recently-played?limit=50");
    const minTimestamp = Date.now() - (state.period === "day" ? 1 : 7) * dayMs;
    const plays = new Map();
    result.items.forEach((item) => {
      const playedAt = Date.parse(item.played_at);
      if (playedAt >= minTimestamp && item.track?.type === "track" && !item.track.is_local) plays.set(playedAt, item.track);
    });
    (await loggedPlaysSince(minTimestamp)).forEach((play) => {
      if (!plays.has(play.playedAt) && play.track.spotifyUri) plays.set(play.playedAt, toSpotifyShape(play.track));
    });
    const playedTracks = [...plays.values()];
    const playCounts = new Map();
    playedTracks.forEach((track) => playCounts.set(track.id, (playCounts.get(track.id) || 0) + 1));
    familiarItems = [...new Map(playedTracks.map((track) => [track.id, track])).values()]
      .sort((first, second) => (playCounts.get(second.id) || 0) - (playCounts.get(first.id) || 0));
    if (familiarItems.length < 12) {
      const fallback = await spotifyRequest("/me/top/tracks?time_range=short_term&limit=50");
      familiarItems = [...familiarItems, ...fallback.items.filter((track) => !playCounts.has(track.id))];
    }
  }

  const artistResult = await spotifyRequest("/me/top/artists?time_range=short_term&limit=20");
  state.spotifyTopTracks = familiarItems;
  state.spotifyTopArtists = artistResult.items;
  const familiarTracks = familiarItems.map((track, index) => fromSpotifyTrack(track, index, "familiar"));
  const familiarIds = new Set(familiarItems.map((track) => track.id));
  const genreCounts = new Map();
  artistResult.items.forEach((artist) => artist.genres?.forEach((genre) => genreCounts.set(genre, (genreCounts.get(genre) || 0) + 1)));
  const genres = [...genreCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([genre]) => genre);
  // Spotify no longer gives apps "similar artists", and often no genres either. The artists your
  // favorites collaborate with (but who aren't favorites themselves) are the best lead to new music.
  const topArtistNames = new Set(artistResult.items.map((artist) => artist.name.toLowerCase()));
  const collaborators = new Set();
  familiarItems.forEach((track) => track.artists.forEach((artist) => {
    if (!topArtistNames.has(artist.name.toLowerCase())) collaborators.add(artist.name);
  }));
  const queries = [
    ...genres.map((genre) => `genre:"${genre}"`),
    ...shuffle([...collaborators]).slice(0, 6).map((name) => `artist:"${name}"`)
  ];
  if (queries.length < 3) {
    queries.push(...shuffle(artistResult.items).slice(0, 4 - queries.length).map((artist) => `artist:"${artist.name}"`));
  }
  // Picks steer the search for new songs unless this mix doesn't use them.
  for (const seed of ["keep", "guide"].includes(state.seedMode) ? state.seedTracks : []) {
    const seedArtist = seed.artist.split(",")[0].trim();
    if (seedArtist && !queries.some((query) => query.toLowerCase().includes(seedArtist.toLowerCase()))) {
      queries.unshift(`artist:"${seedArtist}"`);
    }
  }
  const searchResults = await Promise.all(queries.map(async (query) => {
    const params = new URLSearchParams({ q: query, type: "track", limit: "10" });
    // Genre searches go deeper at random, so the same top results don't come back every time.
    if (query.startsWith("genre:")) params.set("offset", String(10 * Math.floor(Math.random() * 4)));
    if (state.spotifyUser.country) params.set("market", state.spotifyUser.country);
    const response = await spotifyRequest(`/search?${params.toString()}`);
    return response.tracks.items;
  }));
  // "New for you" means a song you haven't heard: not a favorite, not heard before, and not another
  // release of either. At most two per artist keeps one artist from filling the mix.
  const knownIds = new Set([...familiarIds, ...state.heard]);
  const knownSongs = new Set(familiarTracks.map(songKey));
  const songsPerArtist = new Map();
  const newTracks = [];
  shuffle(searchResults.flat()).forEach((track) => {
    if (track.is_local || knownIds.has(track.id)) return;
    const candidate = fromSpotifyTrack(track, newTracks.length + 1, "discovery");
    const key = songKey(candidate);
    const leadArtist = track.artists[0]?.name.toLowerCase() || "";
    if (knownSongs.has(key) || (songsPerArtist.get(leadArtist) || 0) >= 2) return;
    knownSongs.add(key);
    songsPerArtist.set(leadArtist, (songsPerArtist.get(leadArtist) || 0) + 1);
    newTracks.push(candidate);
  });
  return { familiarTracks, newTracks };
}

function composeMix(favorites, discoveries) {
  // Liked songs come up more often: they get a head start in the shuffle of familiar songs.
  const likedIds = new Set(state.liked);
  const usePicks = state.seedMode !== "off";
  const seedIds = new Set(usePicks ? state.seedTracks.map((track) => track.id) : []);
  const eligible = (track) => !isTrackUnavailable(track);
  const availableSeeds = usePicks ? state.seedTracks.filter(eligible) : [];
  const favoriteKeys = new Set(favorites.map(songKey));
  const pools = {
    familiar: shuffle(favorites.filter((track) => eligible(track) && !seedIds.has(track.id))),
    // Another release of a song you already play isn't new for you.
    discovery: shuffle(discoveries.filter((track) => eligible(track)
      && !seedIds.has(track.id) && !favoriteKeys.has(songKey(track))))
  };
  pools.familiar = pools.familiar
    .map((track) => ({ track, weight: Math.random() + (likedIds.has(track.id) ? 0.6 : 0) }))
    .sort((first, second) => second.weight - first.weight)
    .map(({ track }) => track);
  const seedArtists = new Set(availableSeeds.map((track) => track.artist.toLowerCase()));
  const favorSeedArtists = (pool) => pool.sort((first, second) => {
    const firstMatch = [...seedArtists].some((artist) => artist && first.artist.toLowerCase().includes(artist));
    const secondMatch = [...seedArtists].some((artist) => artist && second.artist.toLowerCase().includes(artist));
    return Number(secondMatch) - Number(firstMatch);
  });
  if (state.seedMode === "guide") {
    favorSeedArtists(pools.familiar);
    favorSeedArtists(pools.discovery);
  }
  // "Only my picks": the mix is the picks, shuffled, whatever the length setting.
  if (state.seedMode === "only") {
    pools.familiar = [];
    pools.discovery = [];
  }
  const chosen = [];
  let ranOut = null;
  // One version per song, even when Spotify returns the album and single releases separately.
  const chosenKeys = new Set();
  let totalSeconds = 0;
  let familiarCount = 0;
  const targetSeconds = state.durationMinutes * 60;
  if (state.seedMode === "keep" || state.seedMode === "only") {
    availableSeeds.forEach((track) => {
      if (chosenKeys.has(songKey(track))) return;
      chosenKeys.add(songKey(track));
      const type = track.type || (track.familiarity > 0 ? "familiar" : "discovery");
      chosen.push({ ...track, type });
      if (type === "familiar") familiarCount += 1;
      totalSeconds += track.duration;
    });
  }

  while ((state.lengthMode === "duration" ? totalSeconds < targetSeconds : chosen.length < state.trackCountTarget)
    && (pools.familiar.length || pools.discovery.length)) {
    const currentFamiliarShare = chosen.length ? familiarCount / chosen.length : 0;
    const selectedPool = currentFamiliarShare < state.ratio / 100 ? "familiar" : "discovery";
    // Keep the chosen balance: when one kind runs out, end the mix rather than fill it with the other.
    if (!pools[selectedPool].length) {
      ranOut = selectedPool;
      break;
    }
    const track = pools[selectedPool].shift();
    if (chosenKeys.has(songKey(track))) continue;
    chosenKeys.add(songKey(track));
    chosen.push({
      ...track,
      type: track.type || (selectedPool === "familiar" ? "familiar" : "discovery")
    });
    if (selectedPool === "familiar") familiarCount += 1;
    totalSeconds += track.duration;
  }

  state.playlist = shuffle(chosen).map((track) => ({
    ...track,
    type: track.type || (track.familiarity > 0 ? "familiar" : "discovery")
  }));
  state.activeIndex = -1;
  state.spotifyPlaylist = null;
  state.currentSavedMixId = null;
  state.mixEdited = false;
  stopMixPlayback();
  renderPlaylist();
  $("#mix-date").textContent = "Just now";
  $("#mix-kicker").textContent = `MADE FOR ${state.period === "day" ? "TODAY" : `YOUR ${state.period.toUpperCase()}`}`;
  $("#playlist-title").textContent = ["The Long Way Home", "Soft Focus FM", "Somewhere New", "Windows Down Radio"][Math.floor(Math.random() * 4)];
  return { ranOut };
}

function updateDurationControl() {
  const range = $("#playlist-length");
  const legend = $(".duration-legend");
  if (state.lengthMode === "duration") {
    range.min = "15";
    range.max = "120";
    range.step = "15";
    range.value = String(state.durationMinutes);
    range.setAttribute("aria-label", "Playlist length in minutes");
    $("#duration-value").textContent = `${state.durationMinutes} min`;
    legend.firstElementChild.textContent = "15 min";
    legend.lastElementChild.textContent = "2 hours";
  } else {
    range.min = "5";
    range.max = "40";
    range.step = "1";
    range.value = String(state.trackCountTarget);
    range.setAttribute("aria-label", "Playlist length in songs");
    $("#duration-value").textContent = `${state.trackCountTarget} songs`;
    legend.firstElementChild.textContent = "5 songs";
    legend.lastElementChild.textContent = "40 songs";
  }
  const percentage = ((Number(range.value) - Number(range.min)) / (Number(range.max) - Number(range.min))) * 100;
  range.style.background = `linear-gradient(to right, var(--lime) 0 ${percentage}%, #3a3e35 ${percentage}% 100%)`;
}

function updateRatioControl() {
  const range = $("#mix-ratio");
  const percentage = ((state.ratio - Number(range.min)) / (Number(range.max) - Number(range.min))) * 100;
  range.style.background = `linear-gradient(to right, var(--lime) 0 ${percentage}%, #3a3e35 ${percentage}% 100%)`;
}

// Adds liked songs to the familiar ones a mix is built from (Spotify songs only when connected).
function withLikedSongs(familiar, spotifyOnly) {
  const pool = [...familiar];
  state.liked.map((id) => state.likedTracks[id]).filter(Boolean).forEach((track) => {
    const uri = spotifyUriOf(track);
    if ((spotifyOnly && !uri) || sameSongIn(pool, track)) return;
    pool.push({ ...track, spotifyUri: uri, type: "familiar", familiarity: Math.max(track.familiarity || 0, 70) });
  });
  return pool;
}

// A mix with songs added or removed by hand that isn't saved would be lost when replaced.
function confirmReplaceMix() {
  if (!state.mixEdited || state.currentSavedMixId) return true;
  const replace = window.confirm("Replace this mix? The songs you added or removed haven't been saved.");
  if (replace) state.mixEdited = false;
  return replace;
}

async function buildMix() {
  if (!confirmReplaceMix()) return;
  if (state.seedMode === "only") {
    composeMix([], []);
    showToast(state.playlist.length
      ? `Your ${state.playlist.length} picks, shuffled.`
      : "You haven't picked any songs yet. Use Add songs, then \u201cAdd to my picks\u201d.");
    return;
  }
  const button = $("#generate-button");
  if (!state.spotifyUser) {
    const favorites = withLikedSongs(tracks.filter((track) => track.familiarity > 0 && track.periods.includes(state.period)), false);
    const discoveries = tracks.filter((track) => track.familiarity === 0);
    composeMix(favorites, discoveries);
    const actualMinutes = state.playlist.reduce((sum, track) => sum + track.duration, 0) / 60;
    showToast(state.lengthMode === "tracks"
      ? `Sample mix ready with ${state.playlist.length} songs (~${Math.round(actualMinutes)} min).`
      : actualMinutes < state.durationMinutes
      ? `Sample catalog has about ${Math.floor(actualMinutes)} minutes. Connect Spotify for a longer mix.`
      : `Sample mix ready, about ${Math.round(actualMinutes)} minutes long.`);
    return;
  }
  button.disabled = true;
  button.querySelector("span").textContent = "Finding your tracks…";
  try {
    const data = await loadSpotifyMix();
    const { ranOut } = composeMix(withLikedSongs(data.familiarTracks, true), data.newTracks);
    if (!state.playlist.length) throw new Error("Spotify didn't return enough tracks for this listening window. Try a longer window.");
    const actualMinutes = state.playlist.reduce((sum, track) => sum + track.duration, 0) / 60;
    const newCount = state.playlist.filter((track) => track.type === "discovery").length;
    const familiarCount = state.playlist.length - newCount;
    const short = state.lengthMode === "tracks" ? state.playlist.length < state.trackCountTarget : actualMinutes < state.durationMinutes;
    showToast(short && ranOut
      ? `Found ${ranOut === "discovery" ? `${newCount} new` : `${familiarCount} familiar`} songs, so this mix is ${state.playlist.length} songs (~${Math.round(actualMinutes)} min) to keep your ${state.ratio}% familiar balance.`
      : state.lengthMode === "tracks"
        ? `Your ${state.playlist.length}-song mix is ready (~${Math.round(actualMinutes)} min).`
        : actualMinutes < state.durationMinutes
          ? `Spotify returned about ${Math.floor(actualMinutes)} minutes of unique tracks for this mix.`
          : `Your ~${state.durationMinutes}-minute mix is ready.`);
  } catch (error) {
    showToast(`Couldn't build your Spotify mix: ${error.message}`);
    console.error("Spotify playlist generation failed.", error);
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "Make my mix";
  }
}

function renderPlaylist() {
  trackList.replaceChildren(...state.playlist.map((track, index) => createTrackRow(track, index, false)));
  const totalSeconds = state.playlist.reduce((sum, track) => sum + track.duration, 0);
  $("#track-count").textContent = `${state.playlist.length} tracks`;
  const targetLabel = state.lengthMode === "duration"
    ? `${state.durationMinutes} min target`
    : `${state.trackCountTarget} songs target`;
  $("#mix-runtime").textContent = `${Math.round(totalSeconds / 60)} min · ${targetLabel}`;
  $("#save-button").classList.toggle("saved", Boolean(state.spotifyPlaylist));
  $("#save-button").querySelector("span").textContent = saveButtonLabel();
  $("#save-local-button").classList.toggle("hidden", !state.spotifyUser);
  $("#save-local-button").textContent = state.currentSavedMixId ? "Update in Side B" : "Save in Side B";
  const openSpotifyLink = $("#open-spotify-playlist");
  openSpotifyLink.classList.toggle("hidden", !state.spotifyPlaylist?.id);
  if (state.spotifyPlaylist?.id) {
    openSpotifyLink.href = `https://open.spotify.com/playlist/${encodeURIComponent(state.spotifyPlaylist.id)}`;
  } else {
    openSpotifyLink.removeAttribute("href");
  }
  $("#play-all-button").querySelector("span").textContent = state.spotifyUser ? "Play on Spotify" : "Play mix";
  updatePlayerHeart();
}

function createTrackRow(track, index, collection, collectionType = "") {
  const row = document.createElement("div");
  row.className = "track-row";
  if (collectionType === "held") row.classList.add("held-track-row");
  if (!collection && index === state.activeIndex) row.classList.add("playing");
  const rank = document.createElement("span");
  rank.className = "track-index";
  rank.textContent = String(index + 1).padStart(2, "0");
  const play = document.createElement("button");
  play.type = "button";
  play.className = "row-play";
  play.setAttribute("aria-label", `Play ${track.title}`);
  play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
  play.addEventListener("click", () => (collection ? void playSingleSong(track) : playTrack(index)));

  const main = document.createElement("div");
  main.className = "track-main";
  const cover = document.createElement("div");
  cover.className = "track-cover";
  cover.style.background = track.color;
  const symbol = document.createElement("span");
  symbol.textContent = track.title[0];
  cover.append(symbol);
  const copy = document.createElement("div");
  copy.className = "track-copy";
  const title = document.createElement("strong");
  title.textContent = track.title;
  const artist = document.createElement("span");
  artist.textContent = `${track.artist} · ${track.album}`;
  copy.append(title, artist);
  main.append(cover, copy);

  const why = document.createElement("div");
  const isFamiliar = state.heard.includes(track.id) || track.type === "familiar" || track.familiarity > 0;
  why.className = `track-type ${isFamiliar ? "" : "discovery"}`;
  const dot = document.createElement("span");
  dot.className = "type-dot";
  const chip = document.createElement("span");
  chip.className = "type-chip";
  chip.textContent = isFamiliar ? "In rotation" : "New for you";
  why.append(dot, chip);

  const time = document.createElement("div");
  time.className = "track-duration";
  const like = document.createElement("button");
  like.type = "button";
  like.className = `track-like ${state.liked.includes(track.id) ? "liked" : ""}`;
  like.setAttribute("aria-label", state.liked.includes(track.id) ? "Unlike track" : "Like track");
  like.textContent = state.liked.includes(track.id) ? "♥" : "♡";
  like.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleLike(track);
  });
  const duration = document.createElement("span");
  duration.textContent = formatTime(track.duration);
  time.append(like, duration);
  if (!collection) {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "track-remove";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Remove ${track.title} from this mix`);
    remove.addEventListener("click", (event) => {
      event.stopPropagation();
      removeTrackFromMix(index);
    });
    time.append(remove);
  } else if (collectionType === "discoveries") {
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "track-remove";
    remove.textContent = "×";
    remove.setAttribute("aria-label", `Remove ${track.title} from your discoveries`);
    remove.addEventListener("click", () => removeDiscovery(track));
    time.append(remove);
  } else if (collectionType === "held") {
    const entry = state.held[track.id];
    const actions = document.createElement("div");
    actions.className = "held-actions";
    const blockButton = document.createElement("button");
    blockButton.type = "button";
    blockButton.className = "text-button";
    blockButton.textContent = entry.blocked ? "Allow again" : "Don't show again";
    blockButton.addEventListener("click", () => releaseHeldTrack(track.id, !entry.blocked));
    actions.append(blockButton);
    if (!entry.blocked) {
      const returnButton = document.createElement("button");
      returnButton.type = "button";
      returnButton.className = "text-button";
      returnButton.textContent = "Return to rotation";
      returnButton.addEventListener("click", () => releaseHeldTrack(track.id, false));
      actions.append(returnButton);
    }
    time.append(actions);
    const whyText = document.createElement("span");
    whyText.className = "hold-reason";
    whyText.textContent = entry.blocked
      ? (entry.earlySkipCount >= listeningRules.earlySkipsToBlock ? `Blocked after ${entry.earlySkipCount} early skips` : "Blocked until you allow it")
      : `${entry.earlySkip ? "Early skip" : "Skipped"} · eligible ${new Date(entry.heldUntil).toLocaleDateString()}`;
    why.append(whyText);
  }
  row.append(rank, play, main, why, time);
  if (!collection) row.addEventListener("dblclick", () => playTrack(index));
  return row;
}

function removeTrackFromMix(index) {
  const [removed] = state.playlist.splice(index, 1);
  if (!removed) return;
  state.mixEdited = true;
  if (state.activeIndex === index) {
    // Removing the song that's playing in Spotify moves on to the next one.
    if (state.remotePlayback && state.playlist.length) {
      const nextIndex = index % state.playlist.length;
      void startSpotifyPlayback(nextIndex).catch((error) => {
        showToast(`Couldn't move on in Spotify: ${error.message}`);
        console.error("Spotify playback after removing a song failed.", error);
      });
    } else {
      stopMixPlayback();
      state.activeIndex = -1;
    }
  } else {
    if (state.activeIndex > index) state.activeIndex -= 1;
    queueSpotifySync();
  }
  renderPlaylist();
  persistEditedSavedMix();
  showToast(`Removed "${removed.title}" from this mix.`);
}

// Spotify plays its own copy of the song list. After the mix is edited, hand Spotify the new list and
// carry on from the same song and position. Quick edits in a row are sent together.
let spotifySyncTimer = null;
function queueSpotifySync() {
  if (!state.remotePlayback) return;
  rememberNowPlaying();
  window.clearTimeout(spotifySyncTimer);
  spotifySyncTimer = window.setTimeout(() => {
    spotifySkips = spotifySkips.then(syncSpotifyQueue).catch((error) => {
      showToast(`Spotify didn't take the edited mix: ${error.message}`);
      console.error("Spotify queue update failed.", error);
    });
  }, 700);
}

async function syncSpotifyQueue() {
  const current = state.playlist[state.activeIndex];
  // While a song outside the mix plays, the edited mix takes over when Spotify comes back to it or Next is pressed.
  if (!state.remotePlayback || state.outsideMix || !current?.spotifyUri) return;
  const playback = await spotifyRequest("/me/player");
  if (!playback?.device?.id) return;
  const sameSong = playback.item?.uri === current.spotifyUri;
  const isPlaying = Boolean(playback.is_playing);
  const position = sameSong ? playback.progress_ms : state.elapsed * 1000;
  await spotifyRequest(`/me/player/play?device_id=${encodeURIComponent(playback.device.id)}`, {
    method: "PUT",
    body: JSON.stringify({ uris: playableUris(), offset: { uri: current.spotifyUri }, position_ms: position })
  });
  if (!isPlaying) await spotifyRequest("/me/player/pause", { method: "PUT" });
  expectSpotifyState({ uri: current.spotifyUri, isPlaying });
}

function persistEditedSavedMix() {
  if (!state.currentSavedMixId) return;
  const index = state.saved.findIndex((mix) => mix.id === state.currentSavedMixId);
  if (index < 0) return;
  const nextSaved = [...state.saved];
  nextSaved[index] = { ...nextSaved[index], tracks: state.playlist, title: $("#playlist-title").textContent };
  writeSavedMixes(nextSaved);
}

// "My picks" are stored under the older "seeds" name, so existing picks carry over.
function savePicks(nextPicks) {
  if (!writeStorage(storageKeys.seeds, nextPicks)) return false;
  state.seedTracks = nextPicks;
  updatePicksButton();
  if ($("#picks-dialog").open) renderPicks();
  return true;
}

function updatePicksButton() {
  $("#picks-button").textContent = `See all (${state.seedTracks.length})`;
}

function rememberSeed(track) {
  if (state.held[track.id]?.blocked) {
    showToast(`"${track.title}" is blocked. Allow it from Held back before picking it.`);
    return;
  }
  if (sameSongIn(state.seedTracks, track)) {
    showToast(`"${track.title}" is already in your picks.`);
    return;
  }
  if (savePicks([...state.seedTracks, track])) showToast(`"${track.title}" added to your picks.`);
}

function removePick(track) {
  if (savePicks(state.seedTracks.filter((pick) => pick.id !== track.id))) showToast(`"${track.title}" removed from your picks.`);
}

function renderPicks() {
  const list = $("#picks-list");
  list.replaceChildren();
  $("#picks-clear").disabled = !state.seedTracks.length;
  if (!state.seedTracks.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = "No picks yet. Use Add songs, then \u201cAdd to my picks\u201d.";
    list.append(empty);
    return;
  }
  state.seedTracks.forEach((track) => {
    const row = document.createElement("div");
    row.className = "search-result";
    const copy = document.createElement("span");
    copy.className = "saved-mix-copy";
    const title = document.createElement("strong");
    title.textContent = track.title;
    const artist = document.createElement("small");
    artist.textContent = `${track.artist} \u00b7 ${formatTime(track.duration)}${track.spotifyUri || !state.spotifyUser ? "" : " \u00b7 not on Spotify"}`;
    copy.append(title, artist);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "text-button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove ${track.title} from your picks`);
    remove.addEventListener("click", () => removePick(track));
    row.append(copy, remove);
    list.append(row);
  });
}

// Sample-catalog songs picked before connecting Spotify: use the real song where Spotify has it, drop the rest.
async function cleanUpPicks() {
  if (!state.seedTracks.some((pick) => !pick.spotifyUri)) return;
  const nextPicks = [];
  let removed = 0;
  for (const pick of state.seedTracks) {
    if (pick.spotifyUri) {
      nextPicks.push(pick);
      continue;
    }
    const match = await findSpotifyTrack(pick).catch(() => null);
    if (!match) {
      removed += 1;
      continue;
    }
    const real = fromSpotifyTrack(match, nextPicks.length, pick.type === "familiar" ? "familiar" : "discovery");
    if (!sameSongIn(nextPicks, real)) nextPicks.push(real);
  }
  savePicks(nextPicks);
  if (removed) {
    showToast(`Removed ${removed} sample ${removed === 1 ? "song" : "songs"} from your picks; Spotify doesn't have ${removed === 1 ? "it" : "them"}.`);
  }
}

function addTrackToMix(track) {
  if (state.held[track.id]?.blocked) {
    showToast(`"${track.title}" is blocked. Allow it from Held back before adding it.`);
    return false;
  }
  const existing = sameSongIn(state.playlist, track);
  if (existing) {
    showToast(existing.id === track.id
      ? `"${track.title}" is already in this mix.`
      : `"${existing.title}" is already in this mix (another release of the same song).`);
    return false;
  }
  state.playlist = [...state.playlist, track];
  state.mixEdited = true;
  renderPlaylist();
  persistEditedSavedMix();
  queueSpotifySync();
  showToast(`Added "${track.title}" to this mix.`);
  return true;
}

function renderSearchResults(results) {
  const list = $("#search-result-list");
  list.replaceChildren();
  if (!results.length) {
    const empty = document.createElement("p");
    empty.className = "search-empty";
    empty.textContent = "No matching songs found.";
    list.append(empty);
    return;
  }
  results.forEach((track) => {
    const row = document.createElement("div");
    row.className = "search-result";
    const copy = document.createElement("span");
    copy.className = "saved-mix-copy";
    const title = document.createElement("strong");
    title.textContent = track.title;
    const artist = document.createElement("small");
    artist.textContent = `${track.artist} · ${formatTime(track.duration)}`;
    copy.append(title, artist);
    const actions = document.createElement("span");
    actions.className = "search-result-actions";
    const add = document.createElement("button");
    add.type = "button";
    add.className = "text-button";
    const markInMix = () => {
      add.textContent = "In mix";
      add.disabled = true;
    };
    add.textContent = "Add to mix";
    if (sameSongIn(state.playlist, track)) markInMix();
    add.addEventListener("click", () => {
      if (addTrackToMix(track)) markInMix();
    });
    const seed = document.createElement("button");
    seed.type = "button";
    seed.className = "text-button";
    const setPickLabel = () => {
      seed.textContent = sameSongIn(state.seedTracks, track) ? "Remove from picks" : "Add to my picks";
    };
    setPickLabel();
    seed.addEventListener("click", () => {
      const existing = sameSongIn(state.seedTracks, track);
      if (existing) removePick(existing);
      else rememberSeed(track);
      setPickLabel();
    });
    actions.append(add, seed);
    row.append(copy, actions);
    list.append(row);
  });
}

let searchTimeout;
async function searchSongs(query) {
  const list = $("#search-result-list");
  list.replaceChildren();
  const term = query.trim();
  if (!term) return;
  if (state.spotifyUser) {
    // Spotify lowered the development-mode search limit to 10 results in 2026.
    const params = new URLSearchParams({ q: term, type: "track", limit: "10" });
    if (state.spotifyUser.country) params.set("market", state.spotifyUser.country);
    try {
      const result = await spotifyRequest(`/search?${params.toString()}`);
      renderSearchResults(result.tracks.items.filter((item) => !item.is_local).map((item, index) => fromSpotifyTrack(
        item,
        index,
        state.heard.includes(item.id) ? "familiar" : "discovery"
      )));
    } catch (error) {
      const message = document.createElement("p");
      message.className = "search-empty";
      message.textContent = `Spotify search failed: ${error.message}`;
      list.replaceChildren(message);
      console.error("Spotify song search failed.", error);
    }
    return;
  }
  const lowered = term.toLowerCase();
  renderSearchResults(tracks.filter((track) => `${track.title} ${track.artist} ${track.album}`.toLowerCase().includes(lowered))
    .map((track) => ({ ...track, type: track.familiarity ? "familiar" : "discovery" })));
}

function openTrackSearch() {
  $("#track-search-input").value = "";
  $("#search-result-list").replaceChildren();
  $("#track-search-dialog .dialog-status").textContent = "";
  $("#track-search-dialog").showModal();
  $("#track-search-input").focus();
}

function exportPlaylistFile() {
  if (!state.playlist.length) {
    showToast("Add songs to the mix before exporting it.");
    return;
  }
  const fileData = {
    format: "sideb-playlist",
    version: 1,
    playlist: {
      title: $("#playlist-title").textContent,
      createdAt: new Date().toISOString(),
      tracks: state.playlist.map(({ id, title, artist, album, duration, spotifyUri, spotifyUrl, type, color }) => ({
        id, title, artist, album, duration, spotifyUri, spotifyUrl, type, color
      }))
    }
  };
  const blob = new Blob([JSON.stringify(fileData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = fileData.playlist.title.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").trim() || "Side B playlist";
  link.href = url;
  link.download = `${safeName}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Playlist exported as a Side B JSON file.");
}

function exportPlaylistCsv() {
  if (!state.playlist.length) {
    showToast("Add songs to the mix before exporting it.");
    return;
  }
  const escapeCsv = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  const rows = [
    ["Title", "Artist", "Album", "Duration (seconds)", "Spotify URL"],
    ...state.playlist.map((track) => [track.title, track.artist, track.album, track.duration, track.spotifyUrl || ""])
  ];
  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${$("#playlist-title").textContent.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-") || "Side B playlist"}.csv`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Playlist exported as a CSV track list.");
}

async function savePlaylistName() {
  const name = $("#playlist-name-input").value.trim();
  if (!name) {
    showToast("Enter a name for this playlist.");
    $("#playlist-name-input").focus();
    return;
  }
  $("#playlist-title").textContent = name;
  persistEditedSavedMix();
  if (state.spotifyPlaylist && state.spotifyUser) {
    try {
      await spotifyRequest(`/playlists/${encodeURIComponent(state.spotifyPlaylist.id)}`, {
        method: "PUT",
        body: JSON.stringify({ name, public: false })
      });
    } catch (error) {
      showToast(`Renamed in Side B, but Spotify could not update it: ${error.message}`);
      console.error("Spotify playlist rename failed.", error);
      $("#playlist-name-dialog").close();
      return;
    }
  }
  $("#playlist-name-dialog").close();
  renderPlaylist();
  showToast("Playlist renamed.");
}

function normalizeImportedTrack(track, index) {
  if (!track || typeof track.title !== "string" || typeof track.artist !== "string"
    || !Number.isFinite(track.duration) || track.duration <= 0 || track.duration > 3600) return null;
  return {
    id: typeof track.id === "string" && track.id ? track.id : `imported-${index}-${crypto.randomUUID?.() || Date.now()}`,
    title: track.title,
    artist: track.artist,
    album: typeof track.album === "string" ? track.album : "Unknown album",
    duration: Math.round(track.duration),
    spotifyUri: typeof track.spotifyUri === "string" ? track.spotifyUri : undefined,
    spotifyUrl: typeof track.spotifyUrl === "string" ? track.spotifyUrl : undefined,
    color: typeof track.color === "string" ? track.color : getTrackColor(index),
    type: track.type === "familiar" ? "familiar" : "discovery",
    familiarity: track.type === "familiar" ? 60 : 0
  };
}

function loadImportedPlaylist(title, rawTracks) {
  if (!Array.isArray(rawTracks) || !rawTracks.length || rawTracks.length > 500) {
    throw new Error("The file must contain between 1 and 500 playlist tracks.");
  }
  if (!confirmReplaceMix()) {
    showToast("Import cancelled. Your current mix was kept.");
    return false;
  }
  const importedTracks = rawTracks.map(normalizeImportedTrack);
  const invalidCount = importedTracks.filter((track) => !track).length;
  // Keep one version of each song, as in generated mixes.
  const unique = [];
  importedTracks.filter(Boolean).forEach((track) => {
    if (!sameSongIn(unique, track)) unique.push(track);
  });
  const repeatCount = importedTracks.filter(Boolean).length - unique.length;
  state.playlist = unique;
  if (!state.playlist.length) throw new Error("No valid tracks were found in that playlist.");
  state.currentSavedMixId = null;
  state.spotifyPlaylist = null;
  state.activeIndex = -1;
  state.mixEdited = false;
  stopMixPlayback();
  renderPlaylist();
  $("#playlist-title").textContent = title || "Imported playlist";
  setView("mix");
  const notes = [
    invalidCount ? `skipped ${invalidCount} invalid ${invalidCount === 1 ? "entry" : "entries"}` : "",
    repeatCount ? `removed ${repeatCount} ${repeatCount === 1 ? "repeat" : "repeats"}` : ""
  ].filter(Boolean);
  showToast(`Imported ${state.playlist.length} songs${notes.length ? `; ${notes.join(" and ")}` : ""}.`);
}

function showUnmatchedSongs(songs) {
  if (!songs.length) return;
  const list = $("#unmatched-list");
  list.replaceChildren();
  songs.forEach((song) => {
    const item = document.createElement("li");
    item.textContent = song;
    list.append(item);
  });
  $("#unmatched-summary").textContent = `${songs.length} ${songs.length === 1 ? "song was" : "songs were"} left out of the imported playlist.`;
  $("#unmatched-dialog").showModal();
}

// Matches by song, not exact text: "Song - 2011 Remaster" or "Song (feat. X)" by the same main artist
// counts. Tries a precise search first, then a broader one.
async function findSpotifyTrack(track) {
  const wanted = songKey(track);
  const mainArtist = track.artist.split(/[,;&]/)[0].trim();
  const plainTitle = track.title.replace(/\s+-\s+.*$/, "").replace(/[([].*?[)\]]/g, "").trim() || track.title;
  const searches = [
    `track:"${plainTitle.replace(/"/g, "")}" artist:"${mainArtist.replace(/"/g, "")}"`,
    `${plainTitle} ${mainArtist}`
  ];
  for (const q of searches) {
    const params = new URLSearchParams({ q, type: "track", limit: "10" });
    if (state.spotifyUser?.country) params.set("market", state.spotifyUser.country);
    const results = await spotifyRequest(`/search?${params.toString()}`);
    const match = results.tracks.items.find((candidate) => !candidate.is_local
      && songKey({ title: candidate.name, artist: candidate.artists.map((artist) => artist.name).join(", ") }) === wanted);
    if (match) return match;
  }
  return null;
}

// Runs a task over items a few at a time: faster than one by one, gentler on Spotify than all at once.
async function mapWithConcurrency(items, limit, task) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next;
      next += 1;
      results[index] = await task(items[index], index);
    }
  }));
  return results;
}

async function matchPlaylistTracksToSpotify() {
  const unmatched = [];
  const tracks = await mapWithConcurrency(state.playlist, 4, async (track, index) => {
    if (track.spotifyUri?.startsWith("spotify:track:")) return track;
    const match = await findSpotifyTrack(track);
    if (match) return { ...track, ...fromSpotifyTrack(match, index, track.type === "familiar" ? "familiar" : "discovery") };
    unmatched.push(`${track.title} — ${track.artist}`);
    return track;
  });
  state.playlist = tracks;
  renderPlaylist();
  return unmatched;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (character === '"' && quoted && text[index + 1] === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && text[index + 1] === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value.trim())) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }
  if (quoted) throw new Error("The CSV has an unclosed quoted field.");
  row.push(field);
  if (row.some((value) => value.trim())) rows.push(row);
  if (rows.length < 2) throw new Error("The CSV needs a header row and at least one song.");
  const headers = rows[0].map((value) => value.replace(/^\uFEFF/, "").trim().toLowerCase());
  const indexOf = (...names) => headers.findIndex((header) => names.includes(header));
  const titleIndex = indexOf("title", "name", "track name", "song");
  // "Artist Name(s)", "Album Name", "Duration (ms)" and "Track URI" are Exportify's column names.
  const artistIndex = indexOf("artist", "artist name", "artists", "artist name(s)", "artist names");
  const albumIndex = indexOf("album", "album name");
  const durationIndex = indexOf("duration (seconds)", "duration seconds", "duration", "duration (ms)", "duration_ms");
  const uriIndex = indexOf("track uri", "spotify uri", "uri", "spotify url", "track url", "url");
  if (titleIndex < 0 || artistIndex < 0) throw new Error("The CSV must include Title/Track Name and Artist columns.");
  return rows.slice(1).slice(0, 500).map((values, index) => {
    const rawDuration = values[durationIndex]?.trim() || "";
    const durationValue = rawDuration.includes(":")
      ? rawDuration.split(":").reduce((seconds, part) => seconds * 60 + Number(part), 0)
      : Number(rawDuration);
    const durationSeconds = headers[durationIndex]?.includes("ms") || durationValue > 10_000
      ? durationValue / 1000
      : durationValue;
    // A Spotify link in the file identifies the song exactly, so it needs no search.
    const link = values[uriIndex]?.trim() || "";
    const spotifyId = /(?:spotify:track:|open\.spotify\.com\/(?:intl-[a-z-]+\/)?track\/)([A-Za-z0-9]{22})/.exec(link)?.[1];
    return {
      id: spotifyId || `csv-${index}-${crypto.randomUUID?.() || Date.now()}`,
      spotifyUri: spotifyId ? `spotify:track:${spotifyId}` : undefined,
      spotifyUrl: spotifyId ? `https://open.spotify.com/track/${spotifyId}` : undefined,
      title: values[titleIndex]?.trim(),
      artist: values[artistIndex]?.trim().replace(/\s*;\s*/g, ", "),
      album: albumIndex >= 0 ? values[albumIndex]?.trim() : "Unknown album",
      duration: Number.isFinite(durationSeconds) && durationSeconds > 0 ? durationSeconds : 210,
      color: getTrackColor(index),
      type: "discovery",
      familiarity: 0
    };
  }).filter((track) => track.title && track.artist);
}

async function importCsvPlaylist(title, csvText) {
  const parsedTracks = parseCsv(csvText);
  if (!parsedTracks.length) throw new Error("No song rows were found in this CSV.");
  if (!state.spotifyUser) {
    if (loadImportedPlaylist(title, parsedTracks) === false) return;
    showToast("CSV imported. Connect Spotify and search for matched tracks to enable full playback or Spotify saving.");
    return;
  }
  const unmatched = [];
  const results = await mapWithConcurrency(parsedTracks, 4, async (track, index) => {
    if (track.spotifyUri) return { ...track, type: state.heard.includes(track.id) ? "familiar" : "discovery" };
    const match = await findSpotifyTrack(track);
    if (match) return fromSpotifyTrack(match, index, state.heard.includes(match.id) ? "familiar" : "discovery");
    unmatched.push(`${track.title} — ${track.artist}`);
    return null;
  });
  const matched = results.filter(Boolean);
  if (!matched.length) {
    $("#playlist-import-dialog").close();
    showUnmatchedSongs(unmatched);
    throw new Error("No CSV songs matched Spotify tracks. Review the unmatched list and check the title and artist columns.");
  }
  if (loadImportedPlaylist(title, matched) === false) return;
  $("#playlist-import-dialog").close();
  if (unmatched.length) showUnmatchedSongs(unmatched);
}

async function importSpotifyPlaylist(playlist) {
  const tracksFromSpotify = [];
  const unmatched = [];
  let offset = 0;
  let total = Infinity;
  while (offset < total && offset < 500) {
    const result = await spotifyRequest(`/playlists/${encodeURIComponent(playlist.id)}/items?limit=100&offset=${offset}`);
    total = result.total || 0;
    for (const item of result.items || []) {
      const spotifyTrack = item.item || item.track;
      if (spotifyTrack?.type === "track" && Array.isArray(spotifyTrack.artists)
        && !item.is_local && !spotifyTrack.is_local) {
        tracksFromSpotify.push(fromSpotifyTrack(spotifyTrack, tracksFromSpotify.length, "discovery"));
      } else {
        unmatched.push(spotifyTrack?.name
          ? `${spotifyTrack.name} — ${spotifyTrack.artists?.map((artist) => artist.name).join(", ") || "Unavailable or non-track item"}`
          : "Unavailable Spotify track");
      }
    }
    if (!result.next || !result.items?.length) break;
    offset += result.items.length;
  }
  if (!tracksFromSpotify.length) {
    $("#playlist-import-dialog").close();
    showUnmatchedSongs(unmatched);
    throw new Error("This Spotify playlist has no transferable tracks.");
  }
  if (loadImportedPlaylist(playlist.name, tracksFromSpotify) === false) return;
  $("#playlist-import-dialog").close();
  if (total > offset) unmatched.push(`${total - offset} additional playlist tracks were not fetched (import limit: 500).`);
  showUnmatchedSongs(unmatched);
}

async function loadSpotifyPlaylists() {
  const list = $("#spotify-playlist-list");
  list.replaceChildren();
  if (!state.spotifyUser) {
    const message = document.createElement("p");
    message.className = "search-empty";
    message.textContent = "Connect Spotify first to import one of its playlists.";
    list.append(message);
    return;
  }
  try {
    for (let offset = 0; offset < 200; offset += 50) {
      const result = await spotifyRequest(`/me/playlists?limit=50&offset=${offset}`);
      (result.items || []).forEach((playlist) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "saved-mix-card";
        const copy = document.createElement("span");
        copy.className = "saved-mix-copy";
        const name = document.createElement("strong");
        name.textContent = playlist.name;
        const meta = document.createElement("small");
        const trackCount = playlist.items?.total ?? playlist.tracks?.total ?? 0;
        meta.textContent = `${trackCount} ${trackCount === 1 ? "track" : "tracks"}${playlist.owner?.display_name ? ` · ${playlist.owner.display_name}` : ""}`;
        copy.append(name, meta);
        button.append(copy);
        button.addEventListener("click", () => {
          void importSpotifyPlaylist(playlist).catch((error) => {
            showToast(`Couldn't import Spotify playlist: ${error.message}`);
            console.error("Spotify playlist import failed.", error);
          });
        });
        list.append(button);
      });
      if (!result.next || !result.items?.length) break;
    }
  } catch (error) {
    const message = document.createElement("p");
    message.className = "search-empty";
    message.textContent = `Could not load Spotify playlists: ${error.message}`;
    list.replaceChildren(message);
    console.error("Spotify playlists could not be loaded.", error);
  }
}

function updatePlayerHeart() {
  const track = state.playlist[state.activeIndex];
  const liked = Boolean(track && state.liked.includes(track.id));
  const heart = $("#player-heart");
  heart.classList.toggle("liked", liked);
  heart.textContent = liked ? "♥" : "♡";
  heart.setAttribute("aria-label", liked ? "Unlike this track" : "Like this track");
}

function toggleLike(track) {
  const wasLiked = state.liked.includes(track.id);
  const nextLikes = wasLiked ? state.liked.filter((id) => id !== track.id) : [...state.liked, track.id];
  if (!writeStorage(storageKeys.likes, nextLikes)) return;
  state.liked = nextLikes;
  const nextLikedTracks = { ...state.likedTracks };
  if (wasLiked) delete nextLikedTracks[track.id];
  else nextLikedTracks[track.id] = { ...accountTrack(track), spotifyUri: spotifyUriOf(track), color: track.color, likedAt: new Date().toISOString() };
  if (writeStorage(storageKeys.likedTracks, nextLikedTracks)) state.likedTracks = nextLikedTracks;
  reportListening({ type: "like", track: accountTrack({ ...track, spotifyUri: spotifyUriOf(track) }), liked: !wasLiked });
  updateCounts();
  renderPlaylist();
  if (state.currentView !== "mix") renderCollection();
  showToast(state.liked.includes(track.id) ? "Added to your likes." : "Removed from your likes.");
}

function playTrack(index) {
  if (!state.playlist[index]) return;
  state.activeIndex = index;
  state.elapsed = 0;
  state.listenSession = null;
  stopPlayback();
  const track = state.playlist[index];
  $("#player-track").textContent = track.title;
  $("#player-artist").textContent = track.artist;
  $("#player-cover").style.background = track.color;
  $("#duration-time").textContent = formatTime(track.duration);
  $("#current-time").textContent = "0:00";
  $("#progress-fill").style.width = "0%";
  if (state.spotifyUser) {
    renderPlaylist();
    void playMixOnSpotify(index).catch((error) => reportPlaybackError(error));
    return;
  }
  $("#player-play-button").setAttribute("aria-label", "Pause");
  $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/></svg>';
  $("#player-bar").classList.add("is-playing");
  renderPlaylist();
  state.timer = window.setInterval(advancePlayback, 1000);
}

function advancePlayback() {
  if (state.activeIndex < 0) return;
  const track = state.playlist[state.activeIndex];
  state.elapsed += 1;
  $("#current-time").textContent = formatTime(state.elapsed);
  $("#progress-fill").style.width = `${Math.min(state.elapsed / track.duration * 100, 100)}%`;
  recordListening(track, state.elapsed, true);
  if (state.elapsed >= track.duration) {
    playTrack((state.activeIndex + 1) % state.playlist.length);
  }
}

// Spotify track ids are 22 characters; older saved songs may have only the id.
function spotifyUriOf(track) {
  if (track?.spotifyUri) return track.spotifyUri;
  return /^[A-Za-z0-9]{22}$/.test(track?.id || "") ? `spotify:track:${track.id}` : undefined;
}

// The Play buttons in Discoveries, Liked and Held back play just that song in Spotify.
async function playSingleSong(track) {
  if (!state.spotifyUser) {
    showToast("Connect Spotify to play this song.");
    return;
  }
  const uri = spotifyUriOf(track);
  if (!uri) {
    showToast(`"${track.title}" isn't on Spotify.`);
    return;
  }
  void state.webPlayer?.activateElement?.();
  try {
    const deviceId = await findSpotifyPlaybackDevice();
    if (!deviceId) {
      showToast("Open the Spotify app first, then press play again.", { label: "Open Spotify", href: "spotify:" });
      return;
    }
    stopPlayback();
    state.activeIndex = -1;
    renderPlaylist();
    await spotifyRequest(`/me/player/play?device_id=${encodeURIComponent(deviceId)}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [uri] })
    });
    $("#player-track").textContent = track.title;
    $("#player-artist").textContent = track.artist;
    $("#player-cover").style.background = track.color || getTrackColor(0);
    showToast(`Playing "${track.title}" in Spotify.`);
  } catch (error) {
    reportPlaybackError(error);
  }
}

function saveDiscovery(track) {
  if (sameSongIn(state.discoveries, track)) return;
  const discoveredTrack = {
    id: track.id,
    spotifyUri: spotifyUriOf(track),
    spotifyUrl: track.spotifyUrl,
    title: track.title,
    artist: track.artist,
    album: track.album,
    duration: track.duration,
    color: track.color,
    type: track.type,
    heardAt: new Date().toISOString()
  };
  const nextDiscoveries = [discoveredTrack, ...state.discoveries];
  if (!writeStorage(storageKeys.discoveries, nextDiscoveries)) return;
  state.discoveries = nextDiscoveries;
  updateCounts();
  showToast(`Saved "${track.title}" to your discoveries at 60%.`);
}

function stopPlayback() {
  if (state.timer) window.clearInterval(state.timer);
  if (state.remoteTimer) window.clearInterval(state.remoteTimer);
  state.timer = null;
  state.remoteTimer = null;
  state.remotePlayback = false;
  state.outsideMix = false;
  state.lastRemoteTrackId = null;
  $("#player-bar").classList.remove("is-playing");
  $("#player-play-button").setAttribute("aria-label", "Play");
  $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
}

// For when the mix is replaced: without this, Spotify keeps playing the old mix while Side B shows the new one.
function stopMixPlayback() {
  if (state.remotePlayback) {
    void spotifyRequest("/me/player/pause", { method: "PUT" }).catch((error) => {
      console.error("Couldn't pause Spotify after replacing the mix.", error);
    });
  }
  stopPlayback();
}

function hasSpotifyScope(scope) {
  return (readSpotifySession()?.scope || "").split(" ").includes(scope);
}

let spotifySdkPromise = null;
function loadSpotifySdk() {
  if (window.Spotify?.Player) return Promise.resolve(window.Spotify);
  if (spotifySdkPromise) return spotifySdkPromise;
  spotifySdkPromise = new Promise((resolve, reject) => {
    window.onSpotifyWebPlaybackSDKReady = () => resolve(window.Spotify);
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    script.onerror = () => {
      spotifySdkPromise = null;
      reject(new Error("Couldn't load Spotify's web player."));
    };
    document.head.append(script);
  });
  return spotifySdkPromise;
}

// Desktop browsers can register this tab as its own Spotify Connect device (Premium only).
// Mobile browsers aren't supported by the SDK, so phones hand off to the Spotify app instead.
async function initSpotifyWebPlayer() {
  if (isMobileBrowser || state.webPlayer || !state.spotifyUser) return;
  if (!hasSpotifyScope("streaming")) {
    console.info("Spotify session lacks the streaming scope; reconnect Spotify to play in this browser.");
    return;
  }
  const Spotify = await loadSpotifySdk();
  const player = new Spotify.Player({
    name: "Side B (browser)",
    volume: 0.8,
    getOAuthToken: (callback) => {
      void getSpotifyAccessToken().then(callback).catch((error) => {
        console.error("Spotify web player could not get a token.", error);
      });
    }
  });
  const disableWebPlayer = (message) => (error) => {
    state.webPlayerDeviceId = null;
    console.error(message, error);
  };
  player.addListener("ready", ({ device_id: deviceId }) => {
    state.webPlayerDeviceId = deviceId;
  });
  player.addListener("not_ready", () => {
    state.webPlayerDeviceId = null;
  });
  player.addListener("initialization_error", disableWebPlayer("Spotify web player isn't supported in this browser."));
  player.addListener("authentication_error", disableWebPlayer("Spotify web player authentication failed."));
  player.addListener("account_error", (error) => {
    disableWebPlayer("Spotify web player requires Premium.")(error);
    showToast("Playing in the browser needs Spotify Premium. Side B will control your Spotify app instead.");
  });
  player.addListener("playback_error", (error) => console.error("Spotify web player playback error.", error));
  state.webPlayer = player;
  if (!await player.connect()) {
    state.webPlayer = null;
    throw new Error("Spotify's web player couldn't connect.");
  }
}

function disconnectSpotifyWebPlayer() {
  state.webPlayer?.disconnect();
  state.webPlayer = null;
  state.webPlayerDeviceId = null;
  clearPendingSpotifyPlay();
}

async function findSpotifyPlaybackDevice() {
  const result = await spotifyRequest("/me/player/devices");
  const devices = (result.devices || []).filter((candidate) => !candidate.is_restricted);
  const device = devices.find((candidate) => candidate.is_active)
    || devices.find((candidate) => candidate.id === state.webPlayerDeviceId)
    || devices[0];
  // A freshly connected web player can take a moment to show up in the device list.
  return device?.id || state.webPlayerDeviceId || null;
}

let pendingPlayTimer = null;
function clearPendingSpotifyPlay() {
  state.pendingSpotifyPlay = null;
  if (pendingPlayTimer) window.clearInterval(pendingPlayTimer);
  pendingPlayTimer = null;
}

function promptOpenSpotifyApp(index, playlistUri) {
  clearPendingSpotifyPlay();
  state.pendingSpotifyPlay = { index, playlistUri, expiresAt: Date.now() + 120_000 };
  pendingPlayTimer = window.setInterval(() => void retryPendingSpotifyPlay(), 2000);
  const appUri = playlistUri || "spotify:";
  // Phones open the Spotify app; once it's running, Side B starts the mix there. Browsers only allow
  // opening an app right after a tap, so the "Open Spotify" button stays as a backup.
  if (isMobileBrowser) {
    try {
      window.location.href = appUri;
    } catch (error) {
      console.error("Couldn't open the Spotify app automatically.", error);
    }
  }
  const message = isMobileBrowser
    ? "Opening Spotify… Your mix starts as soon as Spotify is ready. If Spotify didn't open, tap Open Spotify."
    : "No Spotify device is online. Open the Spotify app and Side B will start your mix there.";
  showToast(message, { label: "Open Spotify", href: appUri });
}

let pendingRetryBusy = false;
async function retryPendingSpotifyPlay() {
  const pending = state.pendingSpotifyPlay;
  if (!pending || pendingRetryBusy) return;
  if (Date.now() > pending.expiresAt) {
    clearPendingSpotifyPlay();
    return;
  }
  pendingRetryBusy = true;
  try {
    if (!await findSpotifyPlaybackDevice()) return;
    clearPendingSpotifyPlay();
    await startSpotifyPlayback(pending.index, pending.playlistUri);
    showToast("Your mix is playing in Spotify.");
  } catch (error) {
    clearPendingSpotifyPlay();
    reportPlaybackError(error);
  } finally {
    pendingRetryBusy = false;
  }
}

function startSpotifyWebPlayer() {
  void initSpotifyWebPlayer().catch((error) => {
    console.error("Spotify web player could not start.", error);
  });
}

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState !== "visible") return;
  void retryPendingSpotifyPlay();
  void syncAccountListening();
  if (Date.now() - lastCatchUpAt > 60_000) void catchUpPlayHistory();
  if (state.remotePlayback) {
    void pollSpotifyPlayback().catch((error) => console.error("Spotify progress refresh failed.", error));
  } else {
    void resumeSpotifyFollowing().catch((error) => console.error("Couldn't check what Spotify is playing.", error));
  }
});

// The mix Spotify is playing, kept so a refresh (or a phone reopening the page) shows it again instead of a new mix.
function rememberNowPlaying() {
  writeStorage(storageKeys.nowPlaying, {
    tracks: state.playlist,
    title: $("#playlist-title").textContent,
    kicker: $("#mix-kicker").textContent,
    savedMixId: state.currentSavedMixId,
    spotifyPlaylist: state.spotifyPlaylist,
    savedAt: Date.now()
  });
}

// If Spotify is still playing a song from the mix on screen, or from the mix that was playing before the page
// reloaded, follow it again and keep counting that song's listening. allowRestore lets it bring back the earlier mix.
async function resumeSpotifyFollowing({ allowRestore = false } = {}) {
  if (!state.spotifyUser || state.remotePlayback) return false;
  const playback = await spotifyRequest("/me/player");
  if (!playback?.is_playing || !playback.item) return false;
  let index = state.playlist.findIndex((track) => track.spotifyUri === playback.item.uri);
  if (index < 0 && allowRestore) {
    const stored = readStorage(storageKeys.nowPlaying, null);
    const storedIndex = stored?.tracks?.findIndex((track) => track.spotifyUri === playback.item.uri) ?? -1;
    if (storedIndex < 0 || Date.now() - stored.savedAt > 24 * 60 * 60 * 1000) return false;
    state.playlist = stored.tracks;
    state.spotifyPlaylist = stored.spotifyPlaylist || null;
    state.currentSavedMixId = stored.savedMixId || null;
    $("#playlist-title").textContent = stored.title || "Your mix";
    if (stored.kicker) $("#mix-kicker").textContent = stored.kicker;
    index = storedIndex;
  }
  if (index < 0) return false;
  const track = state.playlist[index];
  const session = readStorage(storageKeys.listenSession, null);
  // The saved session carries on: recordListening only adds progress up to the time that really passed.
  if (session?.trackId === track.id) state.listenSession = session;
  state.activeIndex = index;
  state.remotePlayback = true;
  state.lastRemoteTrackId = track.id;
  state.lastSpotifyPlayback = { isPlaying: true, deviceId: playback.device?.id || null, at: Date.now() };
  showPlayingState(true);
  updateSpotifyUi();
  renderPlaylist();
  await pollSpotifyPlayback().catch((error) => console.error("Spotify progress refresh failed.", error));
  startFollowingSpotify();
  return true;
}

async function startSpotifyPlayback(index, playlistUri = null, step = 1) {
  if (!state.spotifyUser) throw new Error("Connect Spotify before starting full-track playback.");
  // Must run synchronously inside the click so browsers allow the web player to make sound.
  void state.webPlayer?.activateElement?.();
  index = playableIndexFrom(index, step);
  if (index < 0) throw new Error("None of the songs in this mix could be found on Spotify.");
  const track = state.playlist[index];
  const contextUri = playlistUri;
  const recent = state.lastSpotifyPlayback;
  const knownDeviceId = recent?.deviceId && Date.now() - recent.at < 30_000 ? recent.deviceId : null;
  const deviceId = knownDeviceId || await findSpotifyPlaybackDevice();
  if (!deviceId) {
    promptOpenSpotifyApp(index, contextUri);
    return;
  }
  clearPendingSpotifyPlay();
  if (state.remoteTimer) window.clearInterval(state.remoteTimer);
  state.remoteTimer = null;
  const body = JSON.stringify(contextUri
    ? { context_uri: contextUri, offset: { uri: track.spotifyUri } }
    : { uris: playableUris(), offset: { uri: track.spotifyUri } });
  try {
    await spotifyRequest(`/me/player/play?device_id=${encodeURIComponent(deviceId)}`, { method: "PUT", body });
  } catch (error) {
    // The remembered device may have gone to sleep since the last check; look the devices up and try once more.
    if (!knownDeviceId || error.status !== 404) throw error;
    state.lastSpotifyPlayback = null;
    await startSpotifyPlayback(index, playlistUri, step);
    return;
  }
  state.lastSpotifyPlayback = { isPlaying: true, deviceId, at: Date.now() };
  state.outsideMix = false;
  state.activeIndex = index;
  state.elapsed = 0;
  // Side B started this song from 0:00, so count from now even if the page is backgrounded before Spotify confirms it.
  state.listenSession = { trackId: track.id, listened: 0, lastPosition: 0, lastCheckedAt: Date.now() };
  saveListenSession(state.listenSession);
  state.remotePlayback = true;
  rememberNowPlaying();
  state.lastRemoteTrackId = track.id;
  expectSpotifyState({ uri: track.spotifyUri, isPlaying: true });
  showPlayingState(true);
  updateSpotifyUi();
  renderPlaylist();
  // Playback has started either way; a failed first check shouldn't keep Side B from following it.
  try {
    await pollSpotifyPlayback();
  } catch (error) {
    console.error("The first Spotify playback check failed; Side B keeps checking.", error);
  }
  startFollowingSpotify();
}

// About 15 seconds of failed checks in a row; a short signal drop on the road shouldn't end tracking.
const maxFollowFailures = 5;
let followBusy = false;

function startFollowingSpotify() {
  if (state.remoteTimer) window.clearInterval(state.remoteTimer);
  state.followFailures = 0;
  state.remoteTimer = window.setInterval(() => void followSpotifyTick(), 3000);
}

async function followSpotifyTick() {
  if (followBusy || Date.now() < (state.spotifyQuietUntil || 0)) return;
  followBusy = true;
  try {
    await pollSpotifyPlayback();
    state.followFailures = 0;
  } catch (error) {
    console.error("Spotify playback check failed.", error);
    // A "slow down" from Spotify, or a session that just ended, isn't a connection failure.
    if (!state.spotifyUser || Date.now() < (state.spotifyQuietUntil || 0)) return;
    state.followFailures += 1;
    if (state.followFailures >= maxFollowFailures) {
      stopPlayback();
      showToast(`Lost touch with Spotify, so Side B stopped following playback. Press play to pick it up again. (${error.message})`);
    }
  } finally {
    followBusy = false;
  }
}

// Two checks in a row (about 6 seconds) before deciding, so a brief gap between songs isn't mistaken for this.
function noteSpotifyAway(message) {
  state.spotifyAwayChecks = (state.spotifyAwayChecks || 0) + 1;
  if (state.spotifyAwayChecks < 2 || !state.remotePlayback) return;
  state.spotifyAwayChecks = 0;
  stopPlayback();
  updateSpotifyUi();
  showToast(`${message} Side B stopped following it; press play to start the mix again.`);
}

function showPlayingState(isPlaying) {
  $("#player-bar").classList.toggle("is-playing", isPlaying);
  $("#player-play-button").setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  $("#player-play-button").innerHTML = isPlaying
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
}

// Spotify keeps reporting the previous song or play state for a moment after a command. Until it
// reports what was asked for (or a few seconds pass), ignore those reports so they can't undo the change.
function expectSpotifyState({ uri, isPlaying }) {
  state.expectedSpotify = { uri, isPlaying, until: Date.now() + 6000 };
}

function isStaleSpotifyReport(playback) {
  const expected = state.expectedSpotify;
  if (!expected) return false;
  const matches = (!expected.uri || playback.item?.uri === expected.uri)
    && (expected.isPlaying === undefined || Boolean(playback.is_playing) === expected.isPlaying);
  if (matches || Date.now() > expected.until) {
    state.expectedSpotify = null;
    return false;
  }
  return true;
}

// Spotify moved on to the next song because of the car, headphones or the Spotify app, not Side B's Next button
// (that one judges the song itself before Side B sees the change). Judge it the same way, but only when Side B was
// watching closely: after a long gap, such as the screen being off, the Spotify history catch-up decides instead.
// A mix song only counts as skipped when Spotify moved to the next mix song, not when you picked another one.
function judgeOutsideSkip(previous, movedToNext = true) {
  const session = state.listenSession;
  if (!session || session.trackId !== previous.id || session.counted) return;
  const secondsSinceLastCheck = (Date.now() - session.lastCheckedAt) / 1000;
  const playedToEnd = session.lastPosition + secondsSinceLastCheck >= previous.duration - 3;
  if (secondsSinceLastCheck > 10 || playedToEnd || !movedToNext) return;
  holdSkippedTrack(previous, session.lastPosition);
}

// Spotify is playing a song that isn't in the mix: past the end of the mix, or from Spotify's own queue. Show it
// and keep watching, so Side B picks the mix back up when Spotify returns to it. These songs are counted like mix
// songs: heard past 60%, held back when skipped before it.
function showOutsideSong(playback) {
  const item = playback.item;
  if (!state.outsideMix) {
    showToast(`Spotify is playing "${item.name}", which isn't in this mix. Side B will pick the mix back up when Spotify returns to it.`);
  }
  // Podcasts and local files can't be held back.
  const track = item.type === "track" && !item.is_local && item.duration_ms ? fromSpotifyTrack(item, 0, "discovery") : null;
  const previous = state.outsideMix ? state.outsideTrack : null;
  if (previous && previous.id !== track?.id) judgeOutsideSkip(previous);
  state.outsideMix = true;
  state.outsideTrack = track;
  const duration = (item.duration_ms || 0) / 1000;
  state.elapsed = Math.floor((playback.progress_ms || 0) / 1000);
  // Starts a new listening session, so time on this song isn't counted for the mix song from before.
  if (track) recordListening(track, state.elapsed, Boolean(playback.is_playing));
  else state.listenSession = null;
  $("#player-track").textContent = item.name;
  $("#player-artist").textContent = (item.artists || []).map((artist) => artist.name).join(", ") || "Not in this mix";
  $("#duration-time").textContent = formatTime(duration);
  $("#current-time").textContent = formatTime(state.elapsed);
  $("#progress-fill").style.width = duration ? `${Math.min(state.elapsed / duration * 100, 100)}%` : "0%";
  showPlayingState(Boolean(playback.is_playing));
}

async function pollSpotifyPlayback() {
  const playback = await spotifyRequest("/me/player");
  if (!playback?.item) {
    if (!state.expectedSpotify || Date.now() > state.expectedSpotify.until) noteSpotifyAway("Spotify stopped playing.");
    return;
  }
  if (isStaleSpotifyReport(playback)) return;
  state.lastSpotifyPlayback = { isPlaying: Boolean(playback.is_playing), deviceId: playback.device?.id || null, at: Date.now() };
  const track = state.playlist.find((candidate) => candidate.spotifyUri === playback.item.uri);
  state.spotifyAwayChecks = 0;
  if (!track) {
    showOutsideSong(playback);
    return;
  }
  const previousIndex = state.activeIndex;
  const wasOutside = state.outsideMix;
  state.outsideMix = false;
  const wasCounted = Boolean(state.listenSession?.counted);
  state.activeIndex = state.playlist.indexOf(track);
  const previous = state.playlist[previousIndex];
  if (wasOutside && state.outsideTrack) judgeOutsideSkip(state.outsideTrack);
  else if (previous && previous !== track) judgeOutsideSkip(previous, state.activeIndex === playableIndexFrom(previousIndex + 1));
  state.lastRemoteTrackId = track.id;
  state.elapsed = Math.floor((playback.progress_ms || 0) / 1000);
  $("#player-track").textContent = track.title;
  $("#player-artist").textContent = track.artist;
  $("#player-cover").style.background = track.color;
  $("#duration-time").textContent = formatTime(track.duration);
  $("#current-time").textContent = formatTime(state.elapsed);
  $("#progress-fill").style.width = `${Math.min(state.elapsed / track.duration * 100, 100)}%`;
  showPlayingState(Boolean(playback.is_playing));
  recordListening(track, state.elapsed, Boolean(playback.is_playing));
  // Redraw the list only when the song changes or gets counted as heard, not on every check.
  if (previousIndex !== state.activeIndex || wasCounted !== Boolean(state.listenSession?.counted)) {
    updateSpotifyUi();
    renderPlaylist();
  }
}

function togglePlayback() {
  if (state.activeIndex < 0) {
    playTrack(0);
    return;
  }
  const activeTrack = state.playlist[state.activeIndex];
  if (activeTrack?.spotifyUri) {
    void state.webPlayer?.activateElement?.();
    void toggleSpotifyPlayback().catch((error) => reportPlaybackError(error, "Spotify playback control failed"));
    return;
  }
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
    $("#player-bar").classList.remove("is-playing");
    $("#player-play-button").setAttribute("aria-label", "Play");
    $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
  } else {
    $("#player-bar").classList.add("is-playing");
    $("#player-play-button").setAttribute("aria-label", "Pause");
    $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/></svg>';
    state.timer = window.setInterval(advancePlayback, 1000);
  }
}

// Decides from Spotify's real state (the last check, or a fresh one), not the button, since playback may have been paused elsewhere.
async function toggleSpotifyPlayback() {
  const recent = state.lastSpotifyPlayback;
  // While Side B is following Spotify it checks every 3 seconds, so that answer is fresh enough to act on
  // right away; the button flips at once and only one request is sent.
  if (state.remotePlayback && recent && Date.now() - recent.at < 8000) {
    const play = !recent.isPlaying;
    showPlayingState(play);
    expectSpotifyState({ isPlaying: play });
    try {
      await spotifyRequest(`/me/player/${play ? "play" : "pause"}`, { method: "PUT" });
      state.lastSpotifyPlayback = { ...recent, isPlaying: play, at: Date.now() };
    } catch (error) {
      showPlayingState(!play);
      state.expectedSpotify = null;
      throw error;
    }
    return;
  }
  const playback = await spotifyRequest("/me/player");
  if (!state.remotePlayback) {
    // If Spotify is still on a song from this mix (tracking stopped, or the page reloaded), follow it again
    // instead of restarting the song.
    const inMix = playback?.item ? state.playlist.findIndex((track) => track.spotifyUri === playback.item.uri) : -1;
    if (inMix < 0) {
      await playMixOnSpotify(state.activeIndex);
      return;
    }
    if (!playback.is_playing) await spotifyRequest("/me/player/play", { method: "PUT" });
    state.lastSpotifyPlayback = { isPlaying: true, deviceId: playback.device?.id || null, at: Date.now() };
    state.activeIndex = inMix;
    state.remotePlayback = true;
    expectSpotifyState({ uri: playback.item.uri, isPlaying: true });
    showPlayingState(true);
    updateSpotifyUi();
    renderPlaylist();
    startFollowingSpotify();
    return;
  }
  if (!playback?.item) {
    await playMixOnSpotify(state.activeIndex);
    return;
  }
  const play = !playback.is_playing;
  await spotifyRequest(`/me/player/${play ? "play" : "pause"}`, { method: "PUT" });
  expectSpotifyState({ isPlaying: play });
  showPlayingState(play);
}

// Skips run one after another, so a quick double press skips two songs instead of the same one twice.
let spotifySkips = Promise.resolve();

function nextTrack() {
  if (state.playlist.length === 0) return;
  if (state.remotePlayback && state.playlist[state.activeIndex]?.spotifyUri) {
    // Activate while still inside the click; skipSpotifyTrack awaits before starting playback.
    void state.webPlayer?.activateElement?.();
    spotifySkips = spotifySkips.then(skipSpotifyTrack).catch((error) => {
      showToast(`Couldn't skip in Spotify: ${error.message}`);
      console.error("Spotify track skip failed.", error);
    });
    return;
  }
  if (state.timer && state.activeIndex >= 0) {
    holdSkippedTrack(state.playlist[state.activeIndex], state.elapsed);
  }
  playTrack((state.activeIndex + 1) % state.playlist.length);
}

// Progress may be stale after the page was in the background, so refresh it before judging the skip.
async function skipSpotifyTrack() {
  try {
    await pollSpotifyPlayback();
  } catch (error) {
    console.error("Couldn't refresh Spotify progress before skipping.", error);
  }
  const track = state.outsideMix ? state.outsideTrack : state.playlist[state.activeIndex];
  if (track) holdSkippedTrack(track, state.elapsed);
  await startSpotifyPlayback((state.activeIndex + 1) % state.playlist.length);
}

function previousTrack() {
  if (state.elapsed > 3) {
    if (state.remotePlayback) {
      void spotifyRequest("/me/player/seek?position_ms=0", { method: "PUT" }).catch((error) => {
        showToast(`Couldn't restart this Spotify track: ${error.message}`);
        console.error("Spotify seek failed.", error);
      });
    }
    state.elapsed = 0;
    $("#progress-fill").style.width = "0%";
    $("#current-time").textContent = "0:00";
  } else if (state.playlist.length) {
    if (state.remotePlayback && state.activeIndex >= 0) {
      void state.webPlayer?.activateElement?.();
      // From a song outside the mix, Previous goes back to the last mix song that played, moving on from this one.
      const back = state.outsideMix ? 0 : 1;
      if (state.outsideMix && state.outsideTrack) holdSkippedTrack(state.outsideTrack, state.elapsed);
      spotifySkips = spotifySkips
        .then(() => startSpotifyPlayback((state.activeIndex - back + state.playlist.length) % state.playlist.length, null, -1))
        .catch((error) => {
          showToast(`Couldn't play the previous Spotify track: ${error.message}`);
          console.error("Spotify previous-track control failed.", error);
        });
      return;
    }
    playTrack((state.activeIndex - 1 + state.playlist.length) % state.playlist.length);
  }
}

function saveButtonLabel() {
  if (state.spotifyUser) return state.spotifyPlaylist?.id ? "Update Spotify copy" : "Save to Spotify";
  return state.currentSavedMixId ? "Update saved mix" : "Save mix";
}

function saveMixLocally({ announce = true } = {}) {
  if (!state.playlist.length) return false;
  const existingIndex = state.saved.findIndex((mix) => mix.id === state.currentSavedMixId);
  const existing = existingIndex >= 0 ? state.saved[existingIndex] : null;
  const snapshot = {
    id: existing?.id || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
    title: $("#playlist-title").textContent,
    period: state.period,
    durationMinutes: state.durationMinutes,
    lengthMode: state.lengthMode,
    trackCountTarget: state.trackCountTarget,
    createdAt: existing?.createdAt || new Date().toISOString(),
    tracks: state.playlist,
    spotifyPlaylist: state.spotifyPlaylist || existing?.spotifyPlaylist
  };
  const nextSaved = [...state.saved];
  if (existingIndex >= 0) nextSaved[existingIndex] = snapshot;
  else nextSaved.unshift(snapshot);
  if (!writeSavedMixes(nextSaved)) return false;
  state.currentSavedMixId = snapshot.id;
  renderPlaylist();
  if (announce) showToast(existing ? "Saved mix updated in Side B." : "Mix saved in Side B.");
  return true;
}

// Save to Spotify is the only thing that creates or changes a Spotify playlist.
async function saveMix() {
  if (!state.playlist.length) return;
  if (!state.spotifyUser) {
    saveMixLocally();
    return;
  }
  const button = $("#save-button");
  const updating = Boolean(state.spotifyPlaylist?.id);
  button.disabled = true;
  button.querySelector("span").textContent = "Matching Spotify tracks…";
  try {
    const unmatched = await matchPlaylistTracksToSpotify();
    const uris = playableUris();
    if (!uris.length) {
      showUnmatchedSongs(unmatched);
      throw new Error("None of these songs could be found on Spotify.");
    }
    button.querySelector("span").textContent = "Saving to Spotify…";
    const name = $("#playlist-title").textContent;
    if (updating) {
      await spotifyRequest(`/playlists/${encodeURIComponent(state.spotifyPlaylist.id)}`, {
        method: "PUT",
        body: JSON.stringify({ name, public: false })
      });
    } else {
      const playlist = await spotifyRequest("/me/playlists", {
        method: "POST",
        body: JSON.stringify({
          name,
          description: `A Side B mix for ${periodLabels[state.period].toLowerCase()}, with familiar favorites and new discoveries.`,
          public: false,
          collaborative: false
        })
      });
      state.spotifyPlaylist = { id: playlist.id, url: playlist.external_urls?.spotify, uri: playlist.uri };
    }
    await replacePlaylistItems(state.spotifyPlaylist.id, uris);
    // The Spotify copy belongs to this saved mix, so saving never adds a second entry to Saved mixes.
    const savedLocally = saveMixLocally({ announce: false });
    const done = updating ? "Spotify copy updated" : "Saved to Spotify as its own playlist";
    if (unmatched.length) {
      showToast(`${done}. ${unmatched.length} ${unmatched.length === 1 ? "song wasn't" : "songs weren't"} found on Spotify and ${unmatched.length === 1 ? "was" : "were"} left out.`);
      showUnmatchedSongs(unmatched);
    } else {
      showToast(savedLocally ? `${done}, and kept in Saved mixes.` : `${done}, but Side B couldn't keep its own copy.`);
    }
  } catch (error) {
    showToast(`Couldn't save to Spotify: ${error.message}`);
    console.error("Saving the mix to Spotify failed.", error);
  } finally {
    button.disabled = false;
    renderPlaylist();
  }
}

function updateCounts() {
  $("#liked-count").textContent = state.liked.length;
  $("#discovery-count").textContent = state.discoveries.length;
  $("#held-count").textContent = activeHeldEntries().length;
}

function selectPeriod(period) {
  state.period = period;
  document.querySelectorAll("[data-period]").forEach((button) => {
    const selected = button.dataset.period === period;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $("#period-hint").textContent = state.spotifyUser
    ? period === "month" ? "Spotify top tracks · about 4 weeks" : period === "day" ? "Your plays from the last 24 hours" : "Your plays from the last 7 days"
    : period === "day" ? "Today's listening snapshot" : "Your recent favorites";
}

function setView(view) {
  state.currentView = view;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  $("#mix-view").classList.toggle("hidden", view !== "mix");
  $("#collection-view").classList.toggle("hidden", view === "mix");
  $("#page-label").textContent = view === "mix" ? "YOUR MIX" : view === "discoveries" ? "DISCOVERED" : view === "held" ? "HELD BACK"
    : view === "liked" ? "LIKED" : "SAVED MIXES";
  $("#collection-title").textContent = view === "discoveries" ? "Your discoveries." : view === "held" ? "Held back songs."
    : view === "liked" ? "Songs you liked." : "Your saved mixes.";
  $("#collection-description").textContent = view === "discoveries"
    ? "Songs you listened to at least 60% of the way through."
    : view === "held" ? "Songs temporarily held after a skip, or blocked until you allow them again."
      : view === "liked" ? "Songs you hearted. Liked songs come up more often in your mixes."
        : "Mixes you've kept for another drive.";
  renderCollection();
}

function renderCollection() {
  collectionList.replaceChildren();
  const isDiscovery = state.currentView === "discoveries";
  const isHeld = state.currentView === "held";
  const collectionEmpty = $("#collection-empty");
  if (state.currentView === "liked") {
    const likedTracks = [...state.liked].reverse().map((id) => state.likedTracks[id]).filter(Boolean);
    $("#empty-state-title").textContent = "No liked songs yet.";
    $("#empty-state-copy").textContent = "Tap the heart on any song. Liked songs come up more often in your mixes.";
    $("#collection-count").textContent = `${likedTracks.length} ${likedTracks.length === 1 ? "song" : "songs"} liked`;
    likedTracks.forEach((track, index) => collectionList.append(createTrackRow(track, index, true, "liked")));
    collectionEmpty.classList.toggle("hidden", likedTracks.length > 0);
    $("#clear-collection").classList.add("hidden");
    $("#back-to-mix").classList.remove("hidden");
    return;
  }
  if (isHeld) {
    const heldEntries = activeHeldEntries();
    $("#empty-state-title").textContent = "Nothing is held back.";
    $("#empty-state-copy").textContent = "Songs skipped before 60% will be saved here, where you can return them to rotation or block them.";
    $("#collection-count").textContent = `${heldEntries.length} ${heldEntries.length === 1 ? "song" : "songs"} held or blocked`;
    $("#clear-collection").textContent = "Clear hold list";
    heldEntries.forEach((entry, index) => {
      collectionList.append(createTrackRow(entry.track, index, true, "held"));
    });
    collectionEmpty.classList.toggle("hidden", heldEntries.length > 0);
    $("#clear-collection").classList.toggle("hidden", heldEntries.length === 0);
    $("#back-to-mix").classList.remove("hidden");
    return;
  }
  if (isDiscovery) {
    $("#empty-state-title").textContent = "Every favorite starts somewhere.";
    $("#empty-state-copy").textContent = "Play a track from your mix. When you reach 60%, we'll save it here so you can come back to it.";
    $("#back-to-mix").textContent = "Back to your mix";
    $("#collection-count").textContent = `${state.discoveries.length} ${state.discoveries.length === 1 ? "track" : "tracks"} saved`;
    $("#clear-collection").textContent = "Clear history";
    state.discoveries.forEach((track, index) => {
      collectionList.append(createTrackRow(track, index, true, "discoveries"));
    });
    collectionEmpty.classList.toggle("hidden", state.discoveries.length > 0);
    $("#clear-collection").classList.toggle("hidden", state.discoveries.length === 0);
    $("#back-to-mix").classList.remove("hidden");
    return;
  }

  $("#collection-count").textContent = `${state.saved.length} ${state.saved.length === 1 ? "mix" : "mixes"} saved`;
  $("#empty-state-title").textContent = "No saved mixes yet.";
  $("#empty-state-copy").textContent = "Save a mix to keep it here for your next drive.";
  $("#back-to-mix").textContent = "Back to your mix";
  $("#clear-collection").textContent = "Clear saved mixes";
  state.saved.forEach((mix) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "saved-mix-card";
    const cover = document.createElement("span");
    cover.className = "saved-mix-art";
    cover.textContent = "side b";
    const copy = document.createElement("span");
    copy.className = "saved-mix-copy";
    const title = document.createElement("strong");
    title.textContent = mix.title;
    const meta = document.createElement("small");
    const actualMinutes = Math.round(mix.tracks.reduce((sum, track) => sum + track.duration, 0) / 60);
    const targetLabel = mix.lengthMode === "tracks"
      ? `${mix.trackCountTarget || mix.tracks.length} songs target`
      : `${mix.durationMinutes || actualMinutes} min target`;
    meta.textContent = `${mix.tracks.length} tracks · ${actualMinutes} min · ${targetLabel} · ${periodLabels[mix.period]} · ${new Date(mix.createdAt).toLocaleDateString()}`;
    copy.append(title, meta);
    card.append(cover, copy);
    card.addEventListener("click", () => {
      if (!confirmReplaceMix()) return;
      selectPeriod(mix.period);
      state.lengthMode = mix.lengthMode || "duration";
      $("#playlist-length-mode").value = state.lengthMode;
      state.durationMinutes = mix.durationMinutes || Math.round(mix.tracks.reduce((sum, track) => sum + track.duration, 0) / 60);
      state.durationMinutes = Math.min(120, Math.max(15, Math.round(state.durationMinutes / 15) * 15));
      state.trackCountTarget = Math.min(40, Math.max(5, mix.trackCountTarget || mix.tracks.length));
      updateDurationControl();
      state.playlist = mix.tracks;
      state.spotifyPlaylist = mix.spotifyPlaylist || null;
      state.currentSavedMixId = mix.id;
      state.activeIndex = -1;
      stopMixPlayback();
      renderPlaylist();
      $("#playlist-title").textContent = mix.title;
      $("#mix-kicker").textContent = `MADE FOR ${mix.period === "day" ? "TODAY" : `YOUR ${mix.period.toUpperCase()}`}`;
      setView("mix");
      showToast("Saved mix loaded.");
    });
    collectionList.append(card);
  });
  collectionEmpty.classList.toggle("hidden", state.saved.length > 0);
  $("#clear-collection").classList.toggle("hidden", state.saved.length === 0);
  $("#back-to-mix").classList.add("hidden");
}

let toastTimeout;
function showToast(message, action = null) {
  // An open modal dialog covers the toast, so repeat the message inside the dialog.
  const dialogStatus = document.querySelector("dialog[open] .dialog-status");
  if (dialogStatus) dialogStatus.textContent = message;
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.toggle("has-action", Boolean(action));
  if (action) {
    const link = document.createElement("a");
    link.className = "toast-action";
    link.href = action.href;
    if (/^https?:/.test(action.href)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
    link.textContent = action.label;
    toast.append(" ", link);
  }
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), action ? 12_000 : 2800);
}

function renderPlatformConnections(config) {
  const list = $("#platform-list");
  list.replaceChildren();
  Object.entries(SideBMusicPlatforms.providers).forEach(([id, provider]) => {
    const providerConfig = config[id];
    const session = SideBMusicPlatforms.readSession(id);
    const connected = id === "appleMusic"
      ? Boolean(session?.musicUserToken)
      : Boolean(session?.access_token);
    const configured = id === "appleMusic"
      ? Boolean(providerConfig?.developerToken)
      : Boolean(providerConfig?.configured);
    const card = document.createElement("div");
    card.className = "platform-card";
    const copy = document.createElement("div");
    copy.className = "platform-copy";
    const title = document.createElement("strong");
    title.textContent = provider.name;
    const status = document.createElement("small");
    status.textContent = connected ? "Connected in this browser tab"
      : configured ? "Ready to connect" : "App setup required";
    copy.append(title, status);
    const action = document.createElement("button");
    action.type = "button";
    action.className = "secondary-button platform-action";
    action.textContent = connected ? "Disconnect" : "Connect";
    action.disabled = !connected && !configured;
    action.addEventListener("click", () => {
      if (connected) {
        SideBMusicPlatforms.clearSession(id);
        renderPlatformConnections(config);
        showToast(`${provider.name} disconnected from this browser tab.`);
        return;
      }
      action.disabled = true;
      action.textContent = "Connecting…";
      void SideBMusicPlatforms.beginConnection(id).then((profile) => {
        if (profile) {
          renderPlatformConnections(config);
          showToast(`Connected to ${provider.name}.`);
        }
      }).catch((error) => {
        action.disabled = false;
        action.textContent = "Connect";
        showToast(`Couldn't connect ${provider.name}: ${error.message}`);
        console.error(`${provider.name} connection failed.`, error);
      });
    });
    card.append(copy, action);
    if (!configured) {
      const setup = document.createElement("p");
      setup.className = "platform-setup";
      setup.textContent = provider.setup;
      const docs = document.createElement("a");
      docs.href = provider.docs;
      docs.target = "_blank";
      docs.rel = "noreferrer";
      docs.textContent = `Developer setup ↗`;
      card.append(setup, docs);
    }
    list.append(card);
  });
}

document.querySelectorAll("[data-period]").forEach((button) => {
  button.addEventListener("click", () => {
    selectPeriod(button.dataset.period);
  });
});

$("#mix-ratio").addEventListener("input", (event) => {
  state.ratio = Number(event.target.value);
  $("#ratio-value").innerHTML = `${state.ratio}% <span>familiar</span>`;
  updateRatioControl();
});
$("#playlist-length").addEventListener("input", (event) => {
  if (state.lengthMode === "duration") {
    state.durationMinutes = Number(event.target.value);
  } else {
    state.trackCountTarget = Number(event.target.value);
  }
  updateDurationControl();
});
$("#playlist-length-mode").addEventListener("change", (event) => {
  state.lengthMode = event.target.value;
  updateDurationControl();
});
$("#seed-mode").addEventListener("change", (event) => {
  state.seedMode = event.target.value;
  writeStorage(storageKeys.pickMode, state.seedMode);
});
$("#seed-mode").value = state.seedMode;
$("#picks-button").addEventListener("click", () => {
  renderPicks();
  $("#picks-dialog .dialog-status").textContent = "";
  $("#picks-dialog").showModal();
});
$("#picks-clear").addEventListener("click", () => {
  if (!window.confirm(`Remove all ${state.seedTracks.length} songs from your picks?`)) return;
  if (savePicks([])) showToast("Your picks were cleared.");
});
$("#picks-add").addEventListener("click", () => {
  $("#picks-dialog").close();
  openTrackSearch();
});
updatePicksButton();
$("#generate-button").addEventListener("click", buildMix);
$("#shuffle-button").addEventListener("click", () => {
  // The song that's playing keeps playing; everything after it gets a new order.
  const current = state.playlist[state.activeIndex];
  state.playlist = current
    ? [current, ...shuffle(state.playlist.filter((track) => track !== current))]
    : shuffle(state.playlist);
  if (current) state.activeIndex = 0;
  renderPlaylist();
  persistEditedSavedMix();
  queueSpotifySync();
  showToast(current ? "Mix shuffled. The current song keeps playing." : "Mix shuffled.");
});
$("#save-button").addEventListener("click", saveMix);
$("#save-local-button").addEventListener("click", () => saveMixLocally());
$("#play-all-button").addEventListener("click", () => playTrack(0));
$("#add-songs-button").addEventListener("click", openTrackSearch);
$("#export-playlist-button").addEventListener("click", exportPlaylistFile);
$("#export-csv-button").addEventListener("click", exportPlaylistCsv);
$("#import-playlist-button").addEventListener("click", () => {
  $("#spotify-playlist-list").replaceChildren();
  $("#playlist-import-dialog .dialog-status").textContent = "";
  $("#playlist-import-dialog").showModal();
});
$("#spotify-playlist-import").addEventListener("click", () => { void loadSpotifyPlaylists(); });
$("#track-search-input").addEventListener("input", (event) => {
  window.clearTimeout(searchTimeout);
  const query = event.target.value;
  searchTimeout = window.setTimeout(() => { void searchSongs(query); }, 250);
});
$("#rename-playlist").addEventListener("click", () => {
  $("#playlist-name-input").value = $("#playlist-title").textContent;
  $("#playlist-name-dialog").showModal();
  $("#playlist-name-input").focus();
  $("#playlist-name-input").select();
});
$("#playlist-name-save").addEventListener("click", () => { void savePlaylistName(); });
$("#playlist-name-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    void savePlaylistName();
  }
});
document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => $(`#${button.dataset.closeDialog}`).close());
});
document.querySelectorAll("dialog.info-dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
$("#playlist-file-input").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  if (file.size > 2_000_000) {
    showToast("Playlist file is too large (maximum 2 MB).");
    event.target.value = "";
    return;
  }
  try {
    if (file.name.toLowerCase().endsWith(".csv")) {
      await importCsvPlaylist(file.name.replace(/\.csv$/i, ""), await file.text());
    } else {
      const data = JSON.parse(await file.text());
      if (data.format !== "sideb-playlist" || data.version !== 1 || !data.playlist) {
        throw new Error("This is not a supported Side B playlist file.");
      }
      if (loadImportedPlaylist(data.playlist.title, data.playlist.tracks) === false) return;
    }
    $("#playlist-import-dialog").close();
  } catch (error) {
    showToast(`Couldn't import playlist: ${error.message}`);
    console.error("Playlist file import failed.", error);
  } finally {
    event.target.value = "";
  }
});
$("#player-play-button").addEventListener("click", togglePlayback);
$("#next-button").addEventListener("click", nextTrack);
$("#previous-button").addEventListener("click", previousTrack);
$("#player-heart").addEventListener("click", () => {
  if (state.outsideMix) {
    showToast("This song isn't in your mix, so it can't be liked here. Like it in Spotify.");
    return;
  }
  if (state.activeIndex >= 0) toggleLike(state.playlist[state.activeIndex]);
});
$("#connect-button").addEventListener("click", () => {
  if (state.spotifyUser) {
    openSpotifyDialog();
  } else if (readSpotifySession()?.access_token) {
    state.spotifyConnecting = true;
    updateSpotifyUi();
    void reconnectSpotify().catch((error) => {
      state.spotifyError = error.message;
      state.spotifyConnecting = false;
      updateSpotifyUi();
      showToast(`Spotify connection failed: ${error.message}`);
      console.error("Spotify connection retry failed.", error);
    });
  } else {
    state.spotifyConnecting = true;
    updateSpotifyUi();
    void SideBMusicPlatforms.loadConfig().then(() => {
      if (!spotifyClientId()) {
        state.spotifyConnecting = false;
        updateSpotifyUi();
        openSpotifyDialog();
        return;
      }
      return authorizeSpotify();
    }).catch((error) => {
      state.spotifyConnecting = false;
      state.spotifyError = error.message;
      updateSpotifyUi();
      showToast(`Couldn't start Spotify sign-in: ${error.message}`);
      console.error("Spotify sign-in could not start.", error);
    });
  }
});
$("#platforms-button").addEventListener("click", () => {
  $("#platforms-dialog").showModal();
  void SideBMusicPlatforms.loadConfig().then(renderPlatformConnections).catch((error) => {
    const list = $("#platform-list");
    const message = document.createElement("p");
    message.className = "search-empty";
    message.textContent = `Music platform setup could not be loaded: ${error.message}`;
    list.replaceChildren(message);
    console.error("Music platform setup could not be loaded.", error);
  });
});
$("#profile-button").addEventListener("click", () => {
  void SideBMusicPlatforms.loadConfig().then(openSpotifyDialog).catch((error) => {
    showToast(`Couldn't load Spotify app settings: ${error.message}`);
    console.error("Spotify app settings could not be loaded.", error);
  });
});
$("#dialog-close").addEventListener("click", () => $("#info-dialog").close());
function disconnectSpotify({ serverLogout = true } = {}) {
  // Ending the server session signs out this device only; background recording continues until data is deleted.
  if (serverLogout && readSpotifySession()?.server_session) {
    void accountRequest("/api/logout", { method: "POST" }).catch((error) => console.error("Server sign-out failed.", error));
  }
  stopPlayback();
  sessionStorage.removeItem(spotifyTokenKey);
  disconnectSpotifyWebPlayer();
  state.spotifyUser = null;
  state.spotifyPlaylist = null;
  state.spotifyTopTracks = [];
  state.spotifyTopArtists = [];
  updateSpotifyUi();
  renderPlaylist();
}

$("#delete-account-button").addEventListener("click", async () => {
  if (!window.confirm("Delete your listening history, discoveries, and held songs from Side B and sign out? Background recording stops. This can't be undone.")) return;
  try {
    await accountRequest("/api/account", { method: "DELETE" });
  } catch (error) {
    showToast(`Couldn't delete your Side B data: ${error.message}`);
    console.error("Account deletion failed.", error);
    return;
  }
  const userId = state.spotifyUser?.id;
  [storageKeys.discoveries, storageKeys.held, storageKeys.heard, accountPendingKey, `${accountImportKey}-${userId}`, `${accountImportKey}-liked-${userId}`]
    .forEach((key) => localStorage.removeItem(key));
  state.discoveries = [];
  state.held = {};
  state.heard = [];
  disconnectSpotify({ serverLogout: false });
  updateCounts();
  $("#info-dialog").close();
  showToast("Your Side B data was deleted and Spotify was disconnected.");
});

$("#dialog-done").addEventListener("click", () => {
  if (state.spotifyUser) {
    const serverAccount = hasServerAccount();
    disconnectSpotify();
    showToast(serverAccount ? "Spotify disconnected on this device." : "Spotify disconnected from this browser tab.");
  } else {
    const clientId = $("#client-id-input").value.trim();
    if (clientId) {
      try {
        localStorage.setItem(storageKeys.clientId, clientId);
        showToast("Spotify Client ID saved in this browser.");
      } catch (error) {
        showToast("Couldn't save the Client ID in this browser.");
        console.error("Could not save the Spotify Client ID.", error);
      }
    }
  }
  $("#dialog-description").textContent = "Create a Spotify developer app, then paste its Client ID here. Sign-in uses Spotify's PKCE flow; this app never asks for your Spotify password or a client secret.";
  $("#dialog-done").textContent = "Save Client ID";
  $("#dialog-connect").textContent = "Save & connect";
  $("#info-dialog").close();
});
$("#dialog-connect").addEventListener("click", () => {
  const clientId = $("#client-id-input").value.trim();
  if (!clientId && !spotifyClientId()) {
    showToast("Paste your Spotify Client ID first.");
    $("#client-id-input").focus();
    return;
  }
  if (clientId) {
    try {
      localStorage.setItem(storageKeys.clientId, clientId);
    } catch (error) {
      showToast("Couldn't save the Client ID in this browser.");
      console.error("Could not save the Spotify Client ID.", error);
      return;
    }
  }
  $("#info-dialog").close();
  void authorizeSpotify().catch((error) => {
    showToast(`Couldn't start Spotify sign-in: ${error.message}`);
    console.error("Spotify sign-in could not start.", error);
  });
});
$("#copy-redirect").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(redirectUri());
    showToast("Redirect URI copied.");
  } catch (error) {
    showToast("Couldn't copy automatically. Select and copy the Redirect URI.");
    console.error("Could not copy the Spotify redirect URI.", error);
  }
});
$("#info-dialog").addEventListener("click", (event) => {
  if (event.target === $("#info-dialog")) $("#info-dialog").close();
});
document.querySelectorAll(".nav-item").forEach((item) => item.addEventListener("click", () => setView(item.dataset.view)));
$("#back-to-mix").addEventListener("click", () => setView("mix"));
$("#clear-collection").addEventListener("click", () => {
  const what = state.currentView === "discoveries" ? `all ${state.discoveries.length} discoveries`
    : state.currentView === "held" ? "the whole Held back list" : `all ${state.saved.length} saved mixes`;
  if (!window.confirm(`Clear ${what}? This can't be undone.`)) return;
  const storageKey = state.currentView === "discoveries" ? storageKeys.discoveries
    : state.currentView === "held" ? storageKeys.held : storageKeys.saved;
  if (!writeStorage(storageKey, state.currentView === "held" ? {} : [])) return;
  if (state.currentView === "discoveries") {
    state.discoveries = [];
    reportListening({ type: "clear", list: "discoveries" });
  } else if (state.currentView === "held") {
    state.held = {};
    reportListening({ type: "clear", list: "held" });
  } else {
    state.saved = [];
    markSavedMixesChanged();
  }
  updateCounts();
  renderCollection();
  showToast("Collection cleared.");
});
function renderQueue() {
  const list = $("#queue-list");
  list.replaceChildren();
  const start = state.activeIndex >= 0 ? state.activeIndex + 1 : 0;
  const upcoming = state.playlist.map((track, index) => ({ track, index })).slice(start);
  const current = state.playlist[state.activeIndex];
  $("#queue-summary").textContent = current
    ? `Now playing "${current.title}". ${upcoming.length ? `${upcoming.length} more ${upcoming.length === 1 ? "song" : "songs"} after it.` : "It's the last song in this mix."}`
    : `${upcoming.length} ${upcoming.length === 1 ? "song" : "songs"} in this mix.`;
  upcoming.forEach(({ track, index }) => {
    const row = document.createElement("div");
    row.className = "search-result";
    const copy = document.createElement("span");
    copy.className = "saved-mix-copy";
    const title = document.createElement("strong");
    title.textContent = track.title;
    const artist = document.createElement("small");
    artist.textContent = `${track.artist} \u00b7 ${formatTime(track.duration)}`;
    copy.append(title, artist);
    const play = document.createElement("button");
    play.type = "button";
    play.className = "text-button";
    play.textContent = "Play now";
    play.addEventListener("click", () => {
      $("#queue-dialog").close();
      playTrack(index);
    });
    row.append(copy, play);
    list.append(row);
  });
}
$("#queue-button").addEventListener("click", () => {
  renderQueue();
  $("#queue-dialog").showModal();
});

// Click the progress bar to jump to that point in the song.
$("#progress-track").addEventListener("click", (event) => {
  const track = state.playlist[state.activeIndex];
  if (!track || state.outsideMix) return;
  const bounds = event.currentTarget.getBoundingClientRect();
  const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
  const seconds = Math.floor(ratio * track.duration);
  if (state.remotePlayback) {
    void spotifyRequest(`/me/player/seek?position_ms=${seconds * 1000}`, { method: "PUT" })
      .catch((error) => reportPlaybackError(error, "Couldn't jump in this song"));
  }
  state.elapsed = seconds;
  $("#current-time").textContent = formatTime(seconds);
  $("#progress-fill").style.width = `${ratio * 100}%`;
});

let volumeTimer = null;
$("#volume").addEventListener("input", (event) => {
  const percent = Number(event.target.value);
  window.clearTimeout(volumeTimer);
  volumeTimer = window.setTimeout(() => {
    if (!state.spotifyUser) return;
    void spotifyRequest(`/me/player/volume?volume_percent=${percent}`, { method: "PUT" })
      .catch((error) => reportPlaybackError(error, "Couldn't change the volume (some Spotify devices don't allow it)"));
  }, 300);
});

composeMix(
  tracks.filter((track) => track.familiarity > 0 && track.periods.includes(state.period)),
  tracks.filter((track) => track.familiarity === 0)
);
renderPlaylist();
updateCounts();
updateSpotifyUi();
updateDurationControl();
updateRatioControl();
$("#redirect-uri").textContent = redirectUri();

async function initializeSpotify() {
  try {
    const connectedProvider = await SideBMusicPlatforms.handleRedirect();
    if (connectedProvider) {
      const config = await SideBMusicPlatforms.loadConfig();
      renderPlatformConnections(config);
      showToast(`Connected to ${SideBMusicPlatforms.providers[connectedProvider].name}.`);
    }
  } catch (error) {
    showToast(`Music platform sign-in failed: ${error.message}`);
    console.error("Music platform sign-in could not be completed.", error);
  }
  try {
    if (new URLSearchParams(window.location.search).has("code") || readSpotifySession()?.access_token) {
      await SideBMusicPlatforms.loadConfig();
    }
    await handleSpotifyCallback();
    if (!readSpotifySession()?.access_token) await restoreServerSession();
    if (!readSpotifySession()?.access_token) {
      updateSpotifyUi();
      return;
    }
    state.spotifyConnecting = true;
    updateSpotifyUi();
    state.spotifyUser = await spotifyRequest("/me");
    state.spotifyConnecting = false;
    state.spotifyError = null;
    updateSpotifyUi();
    showToast(`Connected to Spotify as ${state.spotifyUser.display_name || state.spotifyUser.id}.`);
    startSpotifyWebPlayer();
    void syncAccountListening();
    selectPeriod(state.period);
    await cleanUpPicks().catch((error) => console.error("Couldn't match your picks on Spotify.", error));
    await catchUpPlayHistory();
    const resumed = await resumeSpotifyFollowing({ allowRestore: true }).catch((error) => {
      console.error("Couldn't check what Spotify is playing.", error);
      return false;
    });
    if (resumed) showToast("Spotify is still playing your mix, so Side B picked it back up.");
    else await buildMix();
  } catch (error) {
    state.spotifyConnecting = false;
    state.spotifyError = error.message;
    updateSpotifyUi();
    showToast(`Spotify connection failed: ${error.message}`);
    console.error("Spotify connection initialization failed.", error);
  }
}

async function reconnectSpotify() {
  const button = $("#connect-button");
  const label = button.querySelector("span:nth-child(2)");
  button.disabled = true;
  label.textContent = "Checking Spotify…";
  try {
    state.spotifyUser = await spotifyRequest("/me");
    state.spotifyError = null;
    updateSpotifyUi();
    startSpotifyWebPlayer();
    void syncAccountListening();
    await cleanUpPicks().catch((error) => console.error("Couldn't match your picks on Spotify.", error));
    await catchUpPlayHistory();
    await buildMix();
  } finally {
    state.spotifyConnecting = false;
    button.disabled = false;
    updateSpotifyUi();
  }
}

if ((new URLSearchParams(window.location.search).has("code") && !SideBMusicPlatforms.hasPendingRedirect())
  || readSpotifySession()?.access_token) {
  state.spotifyConnecting = true;
  updateSpotifyUi();
}
void initializeSpotify();

if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
  navigator.serviceWorker.register("./service-worker.js").catch((error) => {
    console.error("Could not register the Side B offline app shell.", error);
  });
}
