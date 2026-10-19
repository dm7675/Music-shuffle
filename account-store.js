const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const { DatabaseSync } = require("node:sqlite");
const rules = require("./listening-rules.js");

const sessionLifetimeMs = 180 * 24 * 60 * 60 * 1000;

function parseEncryptionKey(value) {
  const trimmed = String(value || "").trim();
  const key = /^[0-9a-f]{64}$/i.test(trimmed) ? Buffer.from(trimmed, "hex") : Buffer.from(trimmed, "base64");
  if (key.length !== 32) throw new Error("TOKEN_ENCRYPTION_KEY must be 32 bytes, written as 64 hex characters or base64.");
  return key;
}

// Session cookies are long random values, so a fast hash is enough: a database leak can't be turned back into a cookie.
function hashSessionToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function boundedString(value, maxLength) {
  return typeof value === "string" && value.length > 0 && value.length <= maxLength ? value : null;
}

// Tracks arrive from browsers and from Spotify; keep only the fields Side B uses, within sane sizes.
function sanitizeTrack(track) {
  const id = boundedString(track?.id, 120);
  const title = boundedString(track?.title, 300);
  const artist = boundedString(track?.artist, 300);
  const duration = Number(track?.duration);
  if (!id || !title || !artist || !Number.isFinite(duration) || duration <= 0 || duration > 7200) return null;
  const spotifyUri = boundedString(track.spotifyUri, 200);
  const spotifyUrl = boundedString(track.spotifyUrl, 300);
  const image = boundedString(track.image, 300);
  return {
    id,
    title,
    artist,
    album: boundedString(track.album, 300) || "Unknown album",
    duration: Math.round(duration),
    spotifyUri: spotifyUri?.startsWith("spotify:track:") ? spotifyUri : undefined,
    spotifyUrl: spotifyUrl?.startsWith("https://open.spotify.com/") ? spotifyUrl : undefined,
    image: /^https:\/\/i\.scdn\.co\/image\/[A-Za-z0-9]+$/.test(image || "") ? image : undefined,
    type: track.type === "familiar" ? "familiar" : "discovery"
  };
}

function isoOrNull(milliseconds) {
  return milliseconds ? new Date(milliseconds).toISOString() : null;
}

function createAccountStore({ databasePath, encryptionKey }) {
  const key = parseEncryptionKey(encryptionKey);
  if (databasePath !== ":memory:") fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new DatabaseSync(databasePath);
  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      display_name TEXT,
      client_id TEXT NOT NULL,
      refresh_token_enc TEXT,
      scope TEXT,
      needs_reconnect INTEGER NOT NULL DEFAULT 0,
      baseline_done INTEGER NOT NULL DEFAULT 0,
      last_played_at INTEGER,
      last_sync_at INTEGER,
      sync_error TEXT,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at INTEGER NOT NULL,
      expires_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS plays (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      played_at INTEGER NOT NULL,
      track_id TEXT NOT NULL,
      duration_ms INTEGER NOT NULL,
      track_json TEXT NOT NULL,
      outcome TEXT,
      PRIMARY KEY (user_id, played_at)
    );
    CREATE TABLE IF NOT EXISTS app_events (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      track_id TEXT NOT NULL,
      at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS app_events_lookup ON app_events (user_id, track_id, at);
    CREATE TABLE IF NOT EXISTS track_state (
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      track_id TEXT NOT NULL,
      track_json TEXT,
      heard_at INTEGER,
      discovered_at INTEGER,
      skip_count INTEGER NOT NULL DEFAULT 0,
      held_until INTEGER,
      early_skip INTEGER NOT NULL DEFAULT 0,
      blocked INTEGER NOT NULL DEFAULT 0,
      last_skipped_at INTEGER,
      PRIMARY KEY (user_id, track_id)
    );
  `);
  // Added after the first release: links different Spotify releases of the same song.
  if (!db.prepare("PRAGMA table_info(track_state)").all().some((column) => column.name === "song_key")) {
    db.exec("ALTER TABLE track_state ADD COLUMN song_key TEXT");
    const setKey = db.prepare("UPDATE track_state SET song_key = ? WHERE user_id = ? AND track_id = ?");
    db.prepare("SELECT user_id, track_id, track_json FROM track_state WHERE track_json IS NOT NULL").all()
      .forEach((row) => setKey.run(rules.songKey(JSON.parse(row.track_json)) || null, row.user_id, row.track_id));
  }
  db.exec("CREATE INDEX IF NOT EXISTS track_state_song ON track_state (user_id, song_key)");
  // Also added later: likes, and the Saved mixes list, so both are the same on every device.
  if (!db.prepare("PRAGMA table_info(track_state)").all().some((column) => column.name === "liked_at")) {
    db.exec("ALTER TABLE track_state ADD COLUMN liked_at INTEGER");
  }
  // Also added later: early skips since the song was last heard, so repeated early skips can block it.
  if (!db.prepare("PRAGMA table_info(track_state)").all().some((column) => column.name === "early_skip_count")) {
    db.exec("ALTER TABLE track_state ADD COLUMN early_skip_count INTEGER NOT NULL DEFAULT 0");
  }
  db.exec(`CREATE TABLE IF NOT EXISTS saved_mixes (
    user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    mixes_json TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`);

  const statements = {
    getUser: db.prepare("SELECT * FROM users WHERE id = ?"),
    upsertUser: db.prepare(`
      INSERT INTO users (id, display_name, client_id, refresh_token_enc, scope, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT (id) DO UPDATE SET display_name = excluded.display_name, client_id = excluded.client_id,
        refresh_token_enc = excluded.refresh_token_enc, scope = excluded.scope, needs_reconnect = 0, sync_error = NULL`),
    updateRefreshToken: db.prepare("UPDATE users SET refresh_token_enc = ? WHERE id = ?"),
    needsReconnect: db.prepare("UPDATE users SET refresh_token_enc = NULL, needs_reconnect = 1, sync_error = ? WHERE id = ?"),
    syncableUsers: db.prepare("SELECT * FROM users WHERE refresh_token_enc IS NOT NULL AND needs_reconnect = 0"),
    recordSync: db.prepare(`UPDATE users SET last_sync_at = ?, sync_error = ?, baseline_done = MAX(baseline_done, ?),
      last_played_at = MAX(COALESCE(last_played_at, 0), ?) WHERE id = ?`),
    deleteUser: db.prepare("DELETE FROM users WHERE id = ?"),
    createSession: db.prepare("INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)"),
    findSession: db.prepare("SELECT user_id FROM sessions WHERE token_hash = ? AND expires_at > ?"),
    deleteSession: db.prepare("DELETE FROM sessions WHERE token_hash = ?"),
    pruneSessions: db.prepare("DELETE FROM sessions WHERE expires_at <= ?"),
    insertPlay: db.prepare(`INSERT OR IGNORE INTO plays (user_id, played_at, track_id, duration_ms, track_json, outcome)
      VALUES (?, ?, ?, ?, ?, ?)`),
    recentPlays: db.prepare("SELECT * FROM plays WHERE user_id = ? AND played_at >= ? ORDER BY played_at"),
    setPlayOutcome: db.prepare("UPDATE plays SET outcome = ? WHERE user_id = ? AND played_at = ?"),
    prunePlays: db.prepare("DELETE FROM plays WHERE user_id = ? AND played_at < ?"),
    recordAppEvent: db.prepare("INSERT INTO app_events (user_id, track_id, at) VALUES (?, ?, ?)"),
    appEventNear: db.prepare("SELECT 1 FROM app_events WHERE user_id = ? AND track_id = ? AND at BETWEEN ? AND ? LIMIT 1"),
    pruneAppEvents: db.prepare("DELETE FROM app_events WHERE user_id = ? AND at < ?"),
    getTrack: db.prepare("SELECT * FROM track_state WHERE user_id = ? AND track_id = ?"),
    otherReleaseHeard: db.prepare(`SELECT 1 FROM track_state WHERE user_id = ? AND song_key = ? AND track_id != ?
      AND heard_at IS NOT NULL LIMIT 1`),
    otherReleaseDiscovered: db.prepare(`SELECT 1 FROM track_state WHERE user_id = ? AND song_key = ? AND track_id != ?
      AND discovered_at IS NOT NULL LIMIT 1`),
    userTracks: db.prepare("SELECT * FROM track_state WHERE user_id = ?"),
    upsertTrack: db.prepare(`
      INSERT INTO track_state (user_id, track_id, track_json, heard_at, discovered_at, skip_count, held_until,
        early_skip, blocked, last_skipped_at, song_key, early_skip_count)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT (user_id, track_id) DO UPDATE SET track_json = COALESCE(excluded.track_json, track_json),
        song_key = COALESCE(excluded.song_key, song_key),
        heard_at = excluded.heard_at, discovered_at = excluded.discovered_at, skip_count = excluded.skip_count,
        held_until = excluded.held_until, early_skip = excluded.early_skip, blocked = excluded.blocked,
        last_skipped_at = excluded.last_skipped_at, early_skip_count = excluded.early_skip_count`),
    clearDiscoveries: db.prepare("UPDATE track_state SET discovered_at = NULL WHERE user_id = ?"),
    setLiked: db.prepare("UPDATE track_state SET liked_at = ? WHERE user_id = ? AND track_id = ?"),
    getSavedMixes: db.prepare("SELECT mixes_json, updated_at FROM saved_mixes WHERE user_id = ?"),
    putSavedMixes: db.prepare(`INSERT INTO saved_mixes (user_id, mixes_json, updated_at) VALUES (?, ?, ?)
      ON CONFLICT (user_id) DO UPDATE SET mixes_json = excluded.mixes_json, updated_at = excluded.updated_at`),
    removeDiscovery: db.prepare("UPDATE track_state SET discovered_at = NULL WHERE user_id = ? AND track_id = ?"),
    clearHolds: db.prepare(`UPDATE track_state SET skip_count = 0, held_until = NULL, early_skip = 0, blocked = 0,
      last_skipped_at = NULL, early_skip_count = 0 WHERE user_id = ?`)
  };

  function transaction(work) {
    db.exec("BEGIN");
    try {
      const result = work();
      db.exec("COMMIT");
      return result;
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }

  // AES-256-GCM, with the user id as associated data so a token can't be moved onto another user's row.
  function encryptToken(token, userId) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
    cipher.setAAD(Buffer.from(userId, "utf8"));
    const ciphertext = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
    return ["v1", iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), ciphertext.toString("base64url")].join(".");
  }

  function decryptToken(value, userId) {
    const [version, iv, tag, ciphertext] = String(value).split(".");
    if (version !== "v1" || !iv || !tag || !ciphertext) throw new Error("Stored Spotify token has an unknown format.");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "base64url"));
    decipher.setAAD(Buffer.from(userId, "utf8"));
    decipher.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([decipher.update(Buffer.from(ciphertext, "base64url")), decipher.final()]).toString("utf8");
  }

  function writeTrack(userId, trackId, row) {
    const songKey = row.track_json ? rules.songKey(JSON.parse(row.track_json)) || null : null;
    statements.upsertTrack.run(userId, trackId, row.track_json ?? null, row.heard_at ?? null, row.discovered_at ?? null,
      row.skip_count ?? 0, row.held_until ?? null, row.early_skip ?? 0, row.blocked ?? 0, row.last_skipped_at ?? null, songKey,
      row.early_skip_count ?? 0);
  }

  // discoverIfNew is for listening seen in Spotify history: a song becomes a discovery only if it wasn't already known.
  function markHeard(userId, track, { discovery = false, discoverIfNew = false, at = Date.now() } = {}) {
    const existing = statements.getTrack.get(userId, track.id);
    const songKey = rules.songKey(track);
    // Hearing the album release of a song you know from its single isn't a discovery.
    const wasKnown = Boolean(existing?.heard_at)
      || Boolean(songKey && statements.otherReleaseHeard.get(userId, songKey, track.id));
    // Only the first listen makes a discovery, so a song removed from Discoveries doesn't come back.
    discovery = (discovery || discoverIfNew) && !wasKnown;
    if (discovery && songKey && statements.otherReleaseDiscovered.get(userId, songKey, track.id)) discovery = false;
    const released = existing && !existing.blocked;
    writeTrack(userId, track.id, {
      ...existing,
      track_json: JSON.stringify(track),
      heard_at: existing?.heard_at || at,
      discovered_at: existing?.discovered_at || (discovery ? at : null),
      // Hearing a song past 60% returns it to rotation, unless it was blocked by hand.
      ...(released ? { skip_count: 0, held_until: null, early_skip: 0, last_skipped_at: null, early_skip_count: 0 } : {})
    });
    return { wasKnown, discovered: !existing?.discovered_at && discovery };
  }

  function markKnown(userId, track, at = Date.now()) {
    const existing = statements.getTrack.get(userId, track.id);
    if (existing?.heard_at) return;
    writeTrack(userId, track.id, { ...existing, track_json: track.title ? JSON.stringify(track) : existing?.track_json, heard_at: at });
  }

  function applySkip(userId, track, progressRatio, at = Date.now()) {
    const existing = statements.getTrack.get(userId, track.id);
    if (existing?.blocked) return null;
    const hold = rules.nextHold({ skipCount: existing?.skip_count || 0, earlySkipCount: existing?.early_skip_count || 0 },
      progressRatio, at);
    writeTrack(userId, track.id, {
      ...existing,
      track_json: JSON.stringify(track),
      skip_count: hold.skipCount,
      early_skip_count: hold.earlySkipCount,
      held_until: hold.heldUntil ? Date.parse(hold.heldUntil) : null,
      early_skip: hold.earlySkip ? 1 : 0,
      blocked: hold.blocked ? 1 : 0,
      last_skipped_at: at
    });
    return hold;
  }

  function releaseHold(userId, trackId, blocked, at = Date.now()) {
    const existing = statements.getTrack.get(userId, trackId);
    if (!existing) return;
    writeTrack(userId, trackId, {
      ...existing,
      blocked: blocked ? 1 : 0,
      held_until: blocked ? null : at,
      // Allowing a blocked song again gives it a fresh start: its next skip is treated like a first skip.
      ...(existing.blocked && !blocked ? { early_skip_count: 0, skip_count: 0 } : {})
    });
  }

  function setLiked(userId, track, liked, at = Date.now()) {
    const existing = statements.getTrack.get(userId, track.id);
    if (!existing) writeTrack(userId, track.id, { track_json: JSON.stringify(track) });
    statements.setLiked.run(liked ? at : null, userId, track.id);
  }

  function listeningState(userId) {
    const rows = statements.userTracks.all(userId);
    const user = statements.getUser.get(userId);
    const held = {};
    rows.filter((row) => row.track_json && (row.blocked || row.skip_count > 0)).forEach((row) => {
      held[row.track_id] = {
        track: JSON.parse(row.track_json),
        skipCount: row.skip_count,
        earlySkipCount: row.early_skip_count || 0,
        heldUntil: isoOrNull(row.held_until),
        earlySkip: Boolean(row.early_skip),
        blocked: Boolean(row.blocked),
        lastSkippedAt: isoOrNull(row.last_skipped_at)
      };
    });
    return {
      heard: rows.filter((row) => row.heard_at).map((row) => row.track_id),
      liked: rows.filter((row) => row.liked_at && row.track_json)
        .sort((first, second) => second.liked_at - first.liked_at)
        .map((row) => ({ ...JSON.parse(row.track_json), likedAt: isoOrNull(row.liked_at) })),
      discoveries: rows.filter((row) => row.discovered_at && row.track_json)
        .sort((first, second) => second.discovered_at - first.discovered_at)
        .map((row) => ({ ...JSON.parse(row.track_json), type: "discovery", heardAt: isoOrNull(row.discovered_at) })),
      held,
      lastSyncAt: isoOrNull(user?.last_sync_at),
      syncError: user?.sync_error || null
    };
  }

  // Folds a browser's existing local history into the account the first time it connects.
  function importLocal(userId, { heard = [], discoveries = [], held = {}, liked = [] } = {}) {
    transaction(() => {
      if (Array.isArray(liked)) {
        liked.slice(0, 2000).forEach((entry) => {
          const track = sanitizeTrack(entry);
          if (track && !statements.getTrack.get(userId, track.id)?.liked_at) setLiked(userId, track, true);
        });
      }
      if (Array.isArray(heard)) {
        heard.slice(0, 5000).forEach((trackId) => {
          if (boundedString(trackId, 120)) markKnown(userId, { id: trackId });
        });
      }
      if (Array.isArray(discoveries)) {
        discoveries.slice(0, 2000).forEach((entry) => {
          const track = sanitizeTrack(entry);
          if (!track) return;
          const at = Date.parse(entry.heardAt) || Date.now();
          const existing = statements.getTrack.get(userId, track.id);
          writeTrack(userId, track.id, {
            ...existing,
            track_json: JSON.stringify(track),
            heard_at: existing?.heard_at || at,
            discovered_at: existing?.discovered_at || at
          });
        });
      }
      if (held && typeof held === "object" && !Array.isArray(held)) {
        Object.values(held).slice(0, 2000).forEach((entry) => {
          const track = sanitizeTrack(entry?.track);
          if (!track) return;
          const existing = statements.getTrack.get(userId, track.id);
          if (existing && (existing.blocked || existing.skip_count > 0)) return;
          const skipCount = Math.min(20, Math.max(1, Math.floor(Number(entry.skipCount) || 1)));
          writeTrack(userId, track.id, {
            ...existing,
            track_json: JSON.stringify(track),
            skip_count: skipCount,
            early_skip_count: Math.min(20, Math.max(0, Math.floor(Number(entry.earlySkipCount) || 0))),
            held_until: entry.blocked ? null : Date.parse(entry.heldUntil) || null,
            early_skip: entry.earlySkip ? 1 : 0,
            blocked: entry.blocked ? 1 : 0,
            last_skipped_at: Date.parse(entry.lastSkippedAt) || null
          });
        });
      }
    });
  }

  return {
    transaction,
    getUser: (userId) => statements.getUser.get(userId),
    upsertUser({ id, displayName, clientId, refreshToken, scope }) {
      statements.upsertUser.run(id, displayName || null, clientId, encryptToken(refreshToken, id), scope || "", Date.now());
    },
    refreshTokenFor: (user) => (user.refresh_token_enc ? decryptToken(user.refresh_token_enc, user.id) : null),
    updateRefreshToken: (userId, refreshToken) => statements.updateRefreshToken.run(encryptToken(refreshToken, userId), userId),
    markNeedsReconnect: (userId, message) => statements.needsReconnect.run(message, userId),
    syncableUsers: () => statements.syncableUsers.all(),
    recordSync(userId, { error = null, baselineDone = false, lastPlayedAt = 0 } = {}) {
      statements.recordSync.run(Date.now(), error, baselineDone ? 1 : 0, lastPlayedAt, userId);
    },
    deleteUser: (userId) => statements.deleteUser.run(userId),
    createSession(userId) {
      const token = crypto.randomBytes(32).toString("base64url");
      const now = Date.now();
      statements.pruneSessions.run(now);
      statements.createSession.run(hashSessionToken(token), userId, now, now + sessionLifetimeMs);
      return { token, maxAgeSeconds: Math.floor(sessionLifetimeMs / 1000) };
    },
    findSessionUser(token) {
      if (!token) return null;
      const session = statements.findSession.get(hashSessionToken(token), Date.now());
      return session ? statements.getUser.get(session.user_id) : null;
    },
    deleteSession: (token) => token && statements.deleteSession.run(hashSessionToken(token)),
    insertPlay(userId, play, outcome = null) {
      return statements.insertPlay.run(userId, play.playedAt, play.track.id, play.track.duration * 1000,
        JSON.stringify(play.track), outcome).changes > 0;
    },
    recentPlays: (userId, since) => statements.recentPlays.all(userId, since)
      .map((row) => ({ playedAt: row.played_at, outcome: row.outcome, track: JSON.parse(row.track_json) })),
    setPlayOutcome: (userId, playedAt, outcome) => statements.setPlayOutcome.run(outcome, userId, playedAt),
    prune(userId, before) {
      statements.prunePlays.run(userId, before);
      statements.pruneAppEvents.run(userId, before);
    },
    recordAppEvent: (userId, trackId, at = Date.now()) => statements.recordAppEvent.run(userId, trackId, at),
    hasAppEventNear: (userId, trackId, from, to) => Boolean(statements.appEventNear.get(userId, trackId, from, to)),
    markHeard,
    markKnown,
    applySkip,
    releaseHold,
    removeDiscovery: (userId, trackId) => statements.removeDiscovery.run(userId, trackId),
    setLiked,
    savedMixes(userId) {
      const row = statements.getSavedMixes.get(userId);
      return row ? { mixes: JSON.parse(row.mixes_json), updatedAt: row.updated_at } : { mixes: null, updatedAt: 0 };
    },
    putSavedMixes: (userId, mixes, updatedAt) => statements.putSavedMixes.run(userId, JSON.stringify(mixes), updatedAt),
    clearList(userId, list) {
      if (list === "discoveries") statements.clearDiscoveries.run(userId);
      if (list === "held") statements.clearHolds.run(userId);
    },
    listeningState,
    importLocal,
    close: () => db.close()
  };
}

module.exports = { createAccountStore, sanitizeTrack, parseEncryptionKey };
