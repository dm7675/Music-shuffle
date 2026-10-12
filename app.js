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
  seeds: "sideb-seeds-v1"
};
const spotifyTokenKey = "sideb-spotify-session-v1";
const spotifyScopes = [
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-modify-playback-state",
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
  held: readStorage(storageKeys.held, {}),
  heard: readStorage(storageKeys.heard, []),
  seedTracks: readStorage(storageKeys.seeds, []),
  seedMode: "keep",
  activeIndex: -1,
  elapsed: 0,
  timer: null,
  remoteTimer: null,
  remotePlayback: false,
  lastRemoteTrackId: null,
  currentSavedMixId: null,
  currentView: "mix",
  spotifyUser: null,
  spotifyError: null,
  spotifyConnecting: false,
  spotifyTopTracks: [],
  spotifyTopArtists: [],
  spotifyPlaylist: null
};

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

function isTrackUnavailable(track) {
  const entry = state.held[track.id];
  if (entry?.blocked) return true;
  return Boolean(entry && Date.parse(entry.heldUntil) > Date.now());
}

function markTrackHeard(track) {
  if (!track?.id) return;
  if (!state.heard.includes(track.id)) {
    const nextHeard = [...state.heard, track.id];
    if (!writeStorage(storageKeys.heard, nextHeard)) return;
    state.heard = nextHeard;
  }
  const nextHeld = { ...state.held };
  if (nextHeld[track.id]) {
    delete nextHeld[track.id];
    if (writeStorage(storageKeys.held, nextHeld)) state.held = nextHeld;
  }
  updateCounts();
}

function holdSkippedTrack(track, progressSeconds) {
  if (!track?.id) return;
  const previous = state.held[track.id];
  const skipCount = (previous?.skipCount || 0) + 1;
  const holdDays = Math.min(30, 3 * (2 ** (skipCount - 1)));
  const heldUntil = new Date(Date.now() + holdDays * 24 * 60 * 60 * 1000).toISOString();
  const heard = progressSeconds / track.duration >= 0.6;
  if (heard) markTrackHeard(track);
  const nextHeld = {
    ...state.held,
    [track.id]: {
      track,
      skipCount,
      heldUntil,
      heard,
      earlySkip: progressSeconds / track.duration < 0.3,
      blocked: false,
      lastSkippedAt: new Date().toISOString()
    }
  };
  if (!writeStorage(storageKeys.held, nextHeld)) return;
  state.held = nextHeld;
  updateCounts();
  showToast(heard
    ? `"${track.title}" was marked heard and held back for ${holdDays} days.`
    : nextHeld[track.id].earlySkip
      ? `"${track.title}" was skipped early and held back for ${holdDays} days.`
      : `"${track.title}" was held back for ${holdDays} days after the skip.`);
}

function releaseHeldTrack(trackId, blocked = false) {
  const entry = state.held[trackId];
  if (!entry) return;
  const nextHeld = {
    ...state.held,
    [trackId]: { ...entry, blocked, heldUntil: blocked ? null : new Date().toISOString() }
  };
  if (!writeStorage(storageKeys.held, nextHeld)) return;
  state.held = nextHeld;
  updateCounts();
  renderCollection();
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
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.error_description || payload.error || `Spotify sign-in failed (${response.status}).`);
  const previousSession = readSpotifySession();
  const session = {
    access_token: payload.access_token,
    refresh_token: payload.refresh_token || previousSession?.refresh_token || null,
    expires_at: Date.now() + payload.expires_in * 1000
  };
  if (!writeSpotifySession(session)) throw new Error("Could not store your Spotify session in this browser tab.");
  return session;
}

async function getSpotifyAccessToken() {
  let session = readSpotifySession();
  if (!session?.access_token) throw new Error("Connect your Spotify account to continue.");
  if (session.expires_at > Date.now() + 30_000) return session.access_token;
  if (!session.refresh_token) throw new Error("Your Spotify session expired. Connect Spotify again.");
  session = await exchangeSpotifyToken({
    grant_type: "refresh_token",
    refresh_token: session.refresh_token
  });
  return session.access_token;
}

async function spotifyRequest(endpoint, options = {}) {
  const token = await getSpotifyAccessToken();
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
  const payload = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const reason = payload?.error?.message || payload?.error_description || `Spotify API request failed (${response.status}).`;
    if (response.status === 401) sessionStorage.removeItem(spotifyTokenKey);
    throw new Error(`${reason} (${endpoint})`);
  }
  return payload;
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
      : state.spotifyError ? "Retry Spotify" : "Connect Spotify";
  $("#save-button").querySelector("span").textContent = state.currentSavedMixId
    ? state.spotifyPlaylist && connected ? "Update Spotify" : "Update saved mix"
    : connected ? "Export to Spotify" : "Save mix";
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
    ? `Connected as ${state.spotifyUser.display_name || state.spotifyUser.id}. Reconnect to approve playback and playlist permissions, or disconnect this browser tab.`
    : serverConfigured
      ? "Connect your Spotify account. Side B uses its registered Spotify app; your Spotify password and account remain with Spotify."
      : "Create a Spotify developer app, then paste its Client ID here. Sign-in uses Spotify's PKCE flow; this app never asks for your Spotify password or a client secret.";
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
    const minTimestamp = Date.now() - (state.period === "day" ? 24 : 24 * 7) * 60 * 60 * 1000;
    const playedTracks = result.items
      .filter((item) => Date.parse(item.played_at) >= minTimestamp)
      .map((item) => item.track);
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
  const queries = genres.length
    ? genres.map((genre) => `genre:"${genre}"`)
    : artistResult.items.slice(0, 4).map((artist) => `artist:"${artist.name}"`);
  for (const seed of state.seedTracks) {
    const seedArtist = seed.artist.split(",")[0].trim();
    if (seedArtist && !queries.some((query) => query.toLowerCase().includes(seedArtist.toLowerCase()))) {
      queries.unshift(`artist:"${seedArtist}"`);
    }
  }
  const searchResults = await Promise.all(queries.map(async (query) => {
    const params = new URLSearchParams({ q: query, type: "track", limit: "10" });
    if (state.spotifyUser.country) params.set("market", state.spotifyUser.country);
    const response = await spotifyRequest(`/search?${params.toString()}`);
    return response.tracks.items;
  }));
  const uniqueDiscoveries = new Map();
  searchResults.flat().forEach((track) => {
    if (!familiarIds.has(track.id) && !track.is_local) uniqueDiscoveries.set(track.id, track);
  });
  const newTracks = [...uniqueDiscoveries.values()].map((track, index) => fromSpotifyTrack(track, index + 1, "discovery"));
  return { familiarTracks, newTracks };
}

function composeMix(favorites, discoveries) {
  const seedIds = new Set(state.seedTracks.map((track) => track.id));
  const eligible = (track) => !isTrackUnavailable(track);
  const availableSeeds = state.seedTracks.filter(eligible);
  const pools = {
    familiar: shuffle(favorites.filter((track) => eligible(track) && !seedIds.has(track.id))),
    discovery: shuffle(discoveries.filter((track) => eligible(track)
      && !seedIds.has(track.id) && !favorites.some((favorite) => favorite.id === track.id)))
  };
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
  const chosen = [];
  let totalSeconds = 0;
  let familiarCount = 0;
  const targetSeconds = state.durationMinutes * 60;
  if (state.seedMode === "keep") {
    availableSeeds.forEach((track) => {
      const type = track.type || (track.familiarity > 0 ? "familiar" : "discovery");
      chosen.push({ ...track, type });
      if (type === "familiar") familiarCount += 1;
      totalSeconds += track.duration;
    });
  }

  while ((state.lengthMode === "duration" ? totalSeconds < targetSeconds : chosen.length < state.trackCountTarget)
    && (pools.familiar.length || pools.discovery.length)) {
    const currentFamiliarShare = chosen.length ? familiarCount / chosen.length : 0;
    const preferredPool = currentFamiliarShare < state.ratio / 100 ? "familiar" : "discovery";
    const fallbackPool = preferredPool === "familiar" ? "discovery" : "familiar";
    const selectedPool = pools[preferredPool].length ? preferredPool : fallbackPool;
    const track = pools[selectedPool].shift();
    if (!track) break;
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
  stopPlayback();
  renderPlaylist();
  $("#mix-date").textContent = "Just now";
  $("#mix-kicker").textContent = `MADE FOR ${state.period === "day" ? "TODAY" : `YOUR ${state.period.toUpperCase()}`}`;
  $("#playlist-title").textContent = ["The Long Way Home", "Soft Focus FM", "Somewhere New", "Windows Down Radio"][Math.floor(Math.random() * 4)];
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

async function buildMix() {
  const button = $("#generate-button");
  if (!state.spotifyUser) {
    const favorites = tracks.filter((track) => track.familiarity > 0 && track.periods.includes(state.period));
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
    composeMix(data.familiarTracks, data.newTracks);
    if (!state.playlist.length) throw new Error("Spotify didn't return enough tracks for this listening window. Try a longer window.");
    const actualMinutes = state.playlist.reduce((sum, track) => sum + track.duration, 0) / 60;
    showToast(state.lengthMode === "tracks"
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
  $("#save-button").querySelector("span").textContent = state.currentSavedMixId
    ? state.spotifyPlaylist ? "Update Spotify" : "Update saved mix"
    : state.spotifyUser ? "Export to Spotify" : "Save mix";
  $("#save-local-button").classList.toggle("hidden", !state.spotifyUser);
  $("#save-local-button").textContent = state.currentSavedMixId ? "Update in Side B" : "Save in Side B";
  const openSpotifyLink = $("#open-spotify-playlist");
  openSpotifyLink.classList.toggle("hidden", !state.spotifyPlaylist?.id);
  if (state.spotifyPlaylist?.id) {
    openSpotifyLink.href = `https://open.spotify.com/playlist/${encodeURIComponent(state.spotifyPlaylist.id)}`;
  } else {
    openSpotifyLink.removeAttribute("href");
  }
  $("#play-all-button").querySelector("span").textContent = state.spotifyPlaylist
    ? "Play on Spotify"
    : "Play mix";
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
  if (!collection) {
    play.addEventListener("click", () => playTrack(index));
  }

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
      ? "Blocked until you allow it"
      : `${entry.heard ? "Heard · cooldown" : entry.earlySkip ? "Early skip" : "Skipped"} · eligible ${new Date(entry.heldUntil).toLocaleDateString()}`;
    why.append(whyText);
  }
  row.append(rank, play, main, why, time);
  if (!collection) row.addEventListener("dblclick", () => playTrack(index));
  return row;
}

function removeTrackFromMix(index) {
  const [removed] = state.playlist.splice(index, 1);
  if (!removed) return;
  if (state.activeIndex === index) {
    stopPlayback();
    state.activeIndex = -1;
  } else if (state.activeIndex > index) {
    state.activeIndex -= 1;
  }
  renderPlaylist();
  persistEditedSavedMix();
  showToast(`Removed "${removed.title}" from this mix.`);
}

function persistEditedSavedMix() {
  if (!state.currentSavedMixId) return;
  const index = state.saved.findIndex((mix) => mix.id === state.currentSavedMixId);
  if (index < 0) return;
  const nextSaved = [...state.saved];
  nextSaved[index] = { ...nextSaved[index], tracks: state.playlist, title: $("#playlist-title").textContent };
  if (writeStorage(storageKeys.saved, nextSaved)) state.saved = nextSaved;
}

function rememberSeed(track) {
  if (state.held[track.id]?.blocked) {
    showToast(`"${track.title}" is blocked. Allow it from Held back before using it as a seed.`);
    return;
  }
  if (state.seedTracks.some((seed) => seed.id === track.id)) {
    showToast(`"${track.title}" is already a seed song.`);
    return;
  }
  const nextSeeds = [...state.seedTracks, track];
  if (!writeStorage(storageKeys.seeds, nextSeeds)) return;
  state.seedTracks = nextSeeds;
  showToast(`"${track.title}" will guide your next mix.`);
}

function addTrackToMix(track) {
  if (state.held[track.id]?.blocked) {
    showToast(`"${track.title}" is blocked. Allow it from Held back before adding it.`);
    return;
  }
  if (state.playlist.some((existing) => existing.id === track.id)) {
    showToast(`"${track.title}" is already in this mix.`);
    return;
  }
  state.playlist = [...state.playlist, track];
  renderPlaylist();
  persistEditedSavedMix();
  showToast(`Added "${track.title}" to this mix.`);
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
    add.textContent = "Add to mix";
    add.addEventListener("click", () => addTrackToMix(track));
    const seed = document.createElement("button");
    seed.type = "button";
    seed.className = "text-button";
    const alreadySeeded = state.seedTracks.some((candidate) => candidate.id === track.id);
    seed.textContent = alreadySeeded ? "Remove seed" : "Use as seed";
    seed.addEventListener("click", () => {
      if (alreadySeeded) {
        const nextSeeds = state.seedTracks.filter((candidate) => candidate.id !== track.id);
        if (writeStorage(storageKeys.seeds, nextSeeds)) {
          state.seedTracks = nextSeeds;
          showToast(`"${track.title}" removed from your seed songs.`);
          void searchSongs($("#track-search-input").value);
        }
      } else {
        rememberSeed(track);
        void searchSongs($("#track-search-input").value);
      }
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
    const params = new URLSearchParams({ q: term, type: "track", limit: "15" });
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
  const importedTracks = rawTracks.map(normalizeImportedTrack);
  const invalidCount = importedTracks.filter((track) => !track).length;
  state.playlist = importedTracks.filter(Boolean);
  if (!state.playlist.length) throw new Error("No valid tracks were found in that playlist.");
  state.currentSavedMixId = null;
  state.spotifyPlaylist = null;
  state.activeIndex = -1;
  stopPlayback();
  renderPlaylist();
  $("#playlist-title").textContent = title || "Imported playlist";
  setView("mix");
  showToast(invalidCount
    ? `Imported ${state.playlist.length} songs; skipped ${invalidCount} invalid entries.`
    : `Imported ${state.playlist.length} songs.`);
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

async function findSpotifyTrack(track) {
  const query = new URLSearchParams({
    q: `track:"${track.title.replace(/"/g, "")}" artist:"${track.artist.replace(/"/g, "")}"`,
    type: "track",
    limit: "5"
  });
  const results = await spotifyRequest(`/search?${query.toString()}`);
  const artists = track.artist.split(/[,;&]/).map((artist) => artist.trim().toLowerCase()).filter(Boolean);
  return results.tracks.items.find((candidate) =>
    candidate.name.trim().toLowerCase() === track.title.trim().toLowerCase()
    && candidate.artists.some((artist) => artists.includes(artist.name.toLowerCase()))) || null;
}

async function matchPlaylistTracksToSpotify() {
  const unmatched = [];
  const tracks = [];
  for (const [index, track] of state.playlist.entries()) {
    if (track.spotifyUri?.startsWith("spotify:track:")) {
      tracks.push(track);
      continue;
    }
    const match = await findSpotifyTrack(track);
    if (match) {
      tracks.push({
        ...track,
        ...fromSpotifyTrack(match, index, track.type === "familiar" ? "familiar" : "discovery")
      });
    } else {
      tracks.push(track);
      unmatched.push(`${track.title} — ${track.artist}`);
    }
  }
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
  const artistIndex = indexOf("artist", "artist name", "artists");
  const albumIndex = indexOf("album", "album name");
  const durationIndex = indexOf("duration (seconds)", "duration seconds", "duration", "duration (ms)", "duration_ms");
  if (titleIndex < 0 || artistIndex < 0) throw new Error("The CSV must include Title/Track Name and Artist columns.");
  return rows.slice(1).slice(0, 500).map((values, index) => {
    const rawDuration = values[durationIndex]?.trim() || "";
    const durationValue = rawDuration.includes(":")
      ? rawDuration.split(":").reduce((seconds, part) => seconds * 60 + Number(part), 0)
      : Number(rawDuration);
    const durationSeconds = headers[durationIndex]?.includes("ms") || durationValue > 10_000
      ? durationValue / 1000
      : durationValue;
    return {
      id: `csv-${index}-${crypto.randomUUID?.() || Date.now()}`,
      title: values[titleIndex]?.trim(),
      artist: values[artistIndex]?.trim(),
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
    loadImportedPlaylist(title, parsedTracks);
    showToast("CSV imported. Connect Spotify and search for matched tracks to enable full playback or Spotify saving.");
    return;
  }
  const matched = [];
  const unmatched = [];
  for (const track of parsedTracks) {
    const match = await findSpotifyTrack(track);
    if (match) {
      matched.push(fromSpotifyTrack(match, matched.length, state.heard.includes(match.id) ? "familiar" : "discovery"));
    } else {
      unmatched.push(`${track.title} — ${track.artist}`);
    }
  }
  if (!matched.length) {
    $("#playlist-import-dialog").close();
    showUnmatchedSongs(unmatched);
    throw new Error("No CSV songs matched Spotify tracks. Review the unmatched list and check the title and artist columns.");
  }
  loadImportedPlaylist(title, matched);
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
  loadImportedPlaylist(playlist.name, tracksFromSpotify);
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

function toggleLike(track) {
  const wasLiked = state.liked.includes(track.id);
  const nextLikes = wasLiked ? state.liked.filter((id) => id !== track.id) : [...state.liked, track.id];
  if (!writeStorage(storageKeys.likes, nextLikes)) return;
  state.liked = nextLikes;
  renderPlaylist();
  if (state.currentView !== "mix") renderCollection();
  showToast(state.liked.includes(track.id) ? "Added to your likes." : "Removed from your likes.");
}

function playTrack(index) {
  if (!state.playlist[index]) return;
  state.activeIndex = index;
  state.elapsed = 0;
  stopPlayback();
  const track = state.playlist[index];
  $("#player-track").textContent = track.title;
  $("#player-artist").textContent = track.artist;
  $("#player-cover").style.background = track.color;
  $("#duration-time").textContent = formatTime(track.duration);
  $("#current-time").textContent = "0:00";
  $("#progress-fill").style.width = "0%";
  if (track.spotifyUri) {
    renderPlaylist();
    void startSpotifyPlayback(index).catch((error) => {
      showToast(`Couldn't start Spotify playback: ${error.message}`);
      console.error("Spotify playback could not start.", error);
    });
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
  if (state.elapsed / track.duration >= 0.6) {
    markTrackHeard(track);
    if (track.type === "discovery") saveDiscovery(track);
  }
  if (state.elapsed >= track.duration) {
    playTrack((state.activeIndex + 1) % state.playlist.length);
  }
}

function saveDiscovery(track) {
  if (state.discoveries.some((savedTrack) => savedTrack.id === track.id)) return;
  const discoveredTrack = {
    id: track.id,
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
  state.lastRemoteTrackId = null;
  $("#player-bar").classList.remove("is-playing");
  $("#player-play-button").setAttribute("aria-label", "Play");
  $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
}

async function getSpotifyPlaybackDevice() {
  const result = await spotifyRequest("/me/player/devices");
  const devices = result.devices || [];
  const device = devices.find((candidate) => candidate.is_active && !candidate.is_restricted)
    || devices.find((candidate) => !candidate.is_restricted);
  if (device) return device.id;
  if (devices.length) {
    throw new Error("Spotify has no controllable playback device available. Open Spotify on your phone or computer and make sure it is online.");
  }
  throw new Error("Spotify reports no playback devices. Open the Spotify app on your phone or computer, start a song once, leave Spotify open, then try again. Side B controls Spotify; it does not stream audio itself.");
}

async function startSpotifyPlayback(index, playlistUri = null) {
  if (!state.spotifyUser) throw new Error("Connect Spotify before starting full-track playback.");
  const uris = state.playlist.map((track) => track.spotifyUri);
  if (!playlistUri && (!uris.length || uris.some((uri) => !uri))) {
    throw new Error("Every song in this mix needs a Spotify match for full-track playback.");
  }
  const deviceId = await getSpotifyPlaybackDevice();
  if (state.remoteTimer) window.clearInterval(state.remoteTimer);
  state.remoteTimer = null;
  await spotifyRequest(`/me/player/play?device_id=${encodeURIComponent(deviceId)}`, {
    method: "PUT",
    body: JSON.stringify(playlistUri
      ? { context_uri: playlistUri }
      : { uris, offset: { position: index } })
  });
  state.activeIndex = index;
  state.elapsed = 0;
  state.remotePlayback = true;
  state.lastRemoteTrackId = state.playlist[index].id;
  $("#player-bar").classList.add("is-playing");
  $("#player-play-button").setAttribute("aria-label", "Pause");
  $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/></svg>';
  updateSpotifyUi();
  renderPlaylist();
  await pollSpotifyPlayback();
  state.remoteTimer = window.setInterval(() => {
    void pollSpotifyPlayback().catch((error) => {
      if (state.remoteTimer) window.clearInterval(state.remoteTimer);
      state.remoteTimer = null;
      state.remotePlayback = false;
      stopPlayback();
      showToast(`Spotify playback tracking stopped: ${error.message}`);
      console.error("Spotify playback status polling failed.", error);
    });
  }, 3000);
}

async function pollSpotifyPlayback() {
  const playback = await spotifyRequest("/me/player");
  if (!playback?.item) return;
  const track = state.playlist.find((candidate) => candidate.spotifyUri === playback.item.uri);
  if (!track) return;
  state.activeIndex = state.playlist.indexOf(track);
  state.lastRemoteTrackId = track.id;
  state.elapsed = Math.floor((playback.progress_ms || 0) / 1000);
  $("#player-track").textContent = track.title;
  $("#player-artist").textContent = track.artist;
  $("#player-cover").style.background = track.color;
  $("#duration-time").textContent = formatTime(track.duration);
  $("#current-time").textContent = formatTime(state.elapsed);
  $("#progress-fill").style.width = `${Math.min(state.elapsed / track.duration * 100, 100)}%`;
  $("#player-bar").classList.toggle("is-playing", Boolean(playback.is_playing));
  $("#player-play-button").setAttribute("aria-label", playback.is_playing ? "Pause" : "Play");
  $("#player-play-button").innerHTML = playback.is_playing
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
  if (state.elapsed / track.duration >= 0.6) {
    markTrackHeard(track);
    if (track.type === "discovery") saveDiscovery(track);
  }
  updateSpotifyUi();
  renderPlaylist();
}

function togglePlayback() {
  if (state.activeIndex < 0) {
    playTrack(0);
    return;
  }
  const activeTrack = state.playlist[state.activeIndex];
  if (activeTrack?.spotifyUri) {
    const action = state.remotePlayback
      ? $("#player-play-button").getAttribute("aria-label") === "Pause" ? "pause" : "play"
      : null;
    const control = action
      ? spotifyRequest(`/me/player/${action}`, { method: "PUT" })
      : startSpotifyPlayback(state.activeIndex);
    void control.then(() => state.remotePlayback ? pollSpotifyPlayback() : undefined).catch((error) => {
      showToast(`Spotify playback control failed: ${error.message}`);
      console.error("Spotify playback control failed.", error);
    });
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

function nextTrack() {
  if (state.playlist.length === 0) return;
  if (state.remotePlayback && state.playlist[state.activeIndex]?.spotifyUri) {
    holdSkippedTrack(state.playlist[state.activeIndex], state.elapsed);
    const nextIndex = (state.activeIndex + 1) % state.playlist.length;
    void startSpotifyPlayback(nextIndex).catch((error) => {
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
      const previousIndex = (state.activeIndex - 1 + state.playlist.length) % state.playlist.length;
      void startSpotifyPlayback(previousIndex).catch((error) => {
        showToast(`Couldn't play the previous Spotify track: ${error.message}`);
        console.error("Spotify previous-track control failed.", error);
      });
      return;
    }
    playTrack((state.activeIndex - 1 + state.playlist.length) % state.playlist.length);
  }
}

function saveMixLocally() {
  if (!state.playlist.length) return;
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
  if (!writeStorage(storageKeys.saved, nextSaved)) return;
  state.saved = nextSaved;
  state.currentSavedMixId = snapshot.id;
  renderPlaylist();
  showToast(existing ? "Saved mix updated in Side B." : "Mix saved in Side B.");
}

async function saveMix() {
  if (!state.playlist.length) return;
  if (state.currentSavedMixId && state.spotifyPlaylist && state.spotifyUser) {
    const button = $("#save-button");
    button.disabled = true;
    button.querySelector("span").textContent = "Matching Spotify tracks…";
    try {
      const unmatched = await matchPlaylistTracksToSpotify();
      const uris = state.playlist.map((track) => track.spotifyUri).filter(Boolean);
      if (!uris.length) {
        showUnmatchedSongs(unmatched);
        throw new Error("No playlist tracks could be matched to Spotify, so the Spotify playlist was not changed.");
      }
      button.querySelector("span").textContent = "Updating Spotify…";
      await spotifyRequest(`/playlists/${encodeURIComponent(state.spotifyPlaylist.id)}`, {
        method: "PUT",
        body: JSON.stringify({ name: $("#playlist-title").textContent, public: false })
      });
      await spotifyRequest(`/playlists/${encodeURIComponent(state.spotifyPlaylist.id)}/items`, {
        method: "PUT",
        body: JSON.stringify({ uris })
      });
      const index = state.saved.findIndex((mix) => mix.id === state.currentSavedMixId);
      if (index >= 0) {
        const nextSaved = [...state.saved];
        nextSaved[index] = { ...nextSaved[index], title: $("#playlist-title").textContent, tracks: state.playlist };
        if (!writeStorage(storageKeys.saved, nextSaved)) throw new Error("Spotify was updated, but Side B could not update its saved copy.");
        state.saved = nextSaved;
      }
      if (unmatched.length) {
        showToast(`Spotify playlist updated. ${unmatched.length} unmatched ${unmatched.length === 1 ? "song was" : "songs were"} left out.`);
        showUnmatchedSongs(unmatched);
      } else {
        showToast("Saved playlist updated in Spotify and Side B.");
      }
    } catch (error) {
      showToast(`Couldn't update the Spotify playlist: ${error.message}`);
      console.error("Spotify playlist update failed.", error);
    } finally {
      button.disabled = false;
      renderPlaylist();
    }
    return;
  }
  if (state.currentSavedMixId && !state.spotifyUser) {
    const index = state.saved.findIndex((mix) => mix.id === state.currentSavedMixId);
    if (index >= 0) {
      const nextSaved = [...state.saved];
      nextSaved[index] = { ...nextSaved[index], title: $("#playlist-title").textContent, tracks: state.playlist };
      if (!writeStorage(storageKeys.saved, nextSaved)) return;
      state.saved = nextSaved;
      showToast("Saved playlist updated.");
      renderPlaylist();
      return;
    }
  }
  if (state.spotifyUser) {
    const button = $("#save-button");
    button.disabled = true;
    button.querySelector("span").textContent = "Matching Spotify tracks…";
    try {
      const unmatched = await matchPlaylistTracksToSpotify();
      const uris = state.playlist.map((track) => track.spotifyUri).filter(Boolean);
      if (!uris.length) {
        showUnmatchedSongs(unmatched);
        throw new Error("No playlist tracks could be matched to Spotify, so no Spotify playlist was created.");
      }
      button.querySelector("span").textContent = "Exporting to Spotify…";
      const playlist = await spotifyRequest("/me/playlists", {
        method: "POST",
        body: JSON.stringify({
          name: $("#playlist-title").textContent,
          description: `A Side B mix for ${periodLabels[state.period].toLowerCase()}, with familiar favorites and new discoveries.`,
          public: false,
          collaborative: false
        })
      });
      await spotifyRequest(`/playlists/${encodeURIComponent(playlist.id)}/items`, {
        method: "POST",
        body: JSON.stringify({ uris })
      });
      state.spotifyPlaylist = {
        id: playlist.id,
        url: playlist.external_urls.spotify,
        uri: playlist.uri
      };
      const snapshot = {
        id: playlist.id,
        title: $("#playlist-title").textContent,
        period: state.period,
        durationMinutes: state.durationMinutes,
        lengthMode: state.lengthMode,
        trackCountTarget: state.trackCountTarget,
        createdAt: new Date().toISOString(),
        tracks: state.playlist,
        spotifyPlaylist: state.spotifyPlaylist
      };
      const nextSaved = [snapshot, ...state.saved];
      const savedLocally = writeStorage(storageKeys.saved, nextSaved);
      if (savedLocally) {
        state.saved = nextSaved;
        state.currentSavedMixId = snapshot.id;
      }
      renderPlaylist();
      $("#save-button").classList.add("saved");
      button.querySelector("span").textContent = "Exported to Spotify";
      if (unmatched.length) {
        showToast(`Spotify playlist created. ${unmatched.length} unmatched ${unmatched.length === 1 ? "song was" : "songs were"} left out.`);
        showUnmatchedSongs(unmatched);
      } else {
        showToast(savedLocally
          ? "Playlist exported to Spotify and saved in Side B. Find it in Spotify or Android Auto."
          : "Playlist exported to Spotify, but Side B couldn't save its local shortcut.");
      }
    } catch (error) {
      button.querySelector("span").textContent = "Export to Spotify";
      showToast(`Couldn't save the Spotify playlist: ${error.message}`);
      console.error("Spotify playlist creation failed.", error);
    } finally {
      button.disabled = false;
    }
    return;
  }
  saveMixLocally();
}

function updateCounts() {
  $("#discovery-count").textContent = state.discoveries.length;
  $("#held-count").textContent = Object.keys(state.held).length;
}

function selectPeriod(period) {
  state.period = period;
  document.querySelectorAll("[data-period]").forEach((button) => {
    const selected = button.dataset.period === period;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  $("#period-hint").textContent = state.spotifyUser
    ? period === "month" ? "Spotify top tracks · about 4 weeks" : "Recent plays · limited to the latest 50"
    : period === "day" ? "Today's listening snapshot" : "Your recent favorites";
}

function setView(view) {
  state.currentView = view;
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  $("#mix-view").classList.toggle("hidden", view !== "mix");
  $("#collection-view").classList.toggle("hidden", view === "mix");
  $("#page-label").textContent = view === "mix" ? "YOUR MIX" : view === "discoveries" ? "DISCOVERED" : view === "held" ? "HELD BACK" : "SAVED MIXES";
  $("#collection-title").textContent = view === "discoveries" ? "Your discoveries." : view === "held" ? "Held back songs." : "Your saved mixes.";
  $("#collection-description").textContent = view === "discoveries"
    ? "Songs you listened to at least 60% of the way through."
    : view === "held" ? "Songs temporarily held after a skip, or blocked until you allow them again."
      : "Mixes you've kept for another drive.";
  renderCollection();
}

function renderCollection() {
  collectionList.replaceChildren();
  const isDiscovery = state.currentView === "discoveries";
  const isHeld = state.currentView === "held";
  const collectionEmpty = $("#collection-empty");
  if (isHeld) {
    $("#empty-state-title").textContent = "Nothing is held back.";
    $("#empty-state-copy").textContent = "Songs skipped before 60% will be saved here, where you can return them to rotation or block them.";
    $("#collection-count").textContent = `${Object.keys(state.held).length} songs held or blocked`;
    $("#clear-collection").textContent = "Clear hold list";
    Object.values(state.held).forEach((entry, index) => {
      collectionList.append(createTrackRow(entry.track, index, true, "held"));
    });
    collectionEmpty.classList.toggle("hidden", Object.keys(state.held).length > 0);
    $("#clear-collection").classList.toggle("hidden", Object.keys(state.held).length === 0);
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
      collectionList.append(createTrackRow(track, index, true));
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
      stopPlayback();
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
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove("visible"), 2800);
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
});
$("#generate-button").addEventListener("click", buildMix);
$("#shuffle-button").addEventListener("click", () => {
  state.playlist = shuffle(state.playlist);
  renderPlaylist();
  showToast("Mix shuffled.");
});
$("#save-button").addEventListener("click", saveMix);
$("#save-local-button").addEventListener("click", saveMixLocally);
$("#play-all-button").addEventListener("click", () => {
  if (state.spotifyPlaylist?.uri) {
    void startSpotifyPlayback(0, state.spotifyPlaylist.uri).catch((error) => {
      showToast(`Couldn't play the saved Spotify playlist: ${error.message}`);
      console.error("Saved Spotify playlist playback could not start.", error);
    });
  } else {
    playTrack(0);
  }
});
$("#add-songs-button").addEventListener("click", openTrackSearch);
$("#export-playlist-button").addEventListener("click", exportPlaylistFile);
$("#export-csv-button").addEventListener("click", exportPlaylistCsv);
$("#import-playlist-button").addEventListener("click", () => {
  $("#spotify-playlist-list").replaceChildren();
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
      loadImportedPlaylist(data.playlist.title, data.playlist.tracks);
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
$("#dialog-done").addEventListener("click", () => {
  if (state.spotifyUser) {
    sessionStorage.removeItem(spotifyTokenKey);
    state.spotifyUser = null;
    state.spotifyPlaylist = null;
    state.spotifyTopTracks = [];
    state.spotifyTopArtists = [];
    updateSpotifyUi();
    showToast("Spotify disconnected from this browser tab.");
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
  const storageKey = state.currentView === "discoveries" ? storageKeys.discoveries
    : state.currentView === "held" ? storageKeys.held : storageKeys.saved;
  if (!writeStorage(storageKey, [])) return;
  if (state.currentView === "discoveries") {
    state.discoveries = [];
  } else if (state.currentView === "held") {
    state.held = {};
  } else {
    state.saved = [];
  }
  updateCounts();
  renderCollection();
  showToast("Collection cleared.");
});
$("#queue-button").addEventListener("click", () => showToast(`${state.playlist.length} tracks in this mix.`));

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
    if (!readSpotifySession()?.access_token) return;
    state.spotifyConnecting = true;
    updateSpotifyUi();
    state.spotifyUser = await spotifyRequest("/me");
    state.spotifyConnecting = false;
    state.spotifyError = null;
    updateSpotifyUi();
    showToast(`Connected to Spotify as ${state.spotifyUser.display_name || state.spotifyUser.id}.`);
    selectPeriod(state.period);
    await buildMix();
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
