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
const storageKeys = { discoveries: "sideb-discoveries-v1", saved: "sideb-saved-v1", likes: "sideb-likes-v1", clientId: "sideb-spotify-client-id-v1" };
const spotifyTokenKey = "sideb-spotify-session-v1";
const spotifyScopes = [
  "user-read-private",
  "user-top-read",
  "user-read-recently-played",
  "playlist-modify-private"
];
const state = {
  period: "month",
  ratio: 65,
  durationMinutes: 45,
  playlist: [],
  saved: readStorage(storageKeys.saved, []),
  discoveries: readStorage(storageKeys.discoveries, []),
  liked: readStorage(storageKeys.likes, []),
  activeIndex: -1,
  elapsed: 0,
  timer: null,
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
  return localStorage.getItem(storageKeys.clientId) || "";
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
  $("#save-button").querySelector("span").textContent = connected ? "Save to Spotify" : "Save mix";
  $("#data-source-label").textContent = connected ? "SPOTIFY TRACKS · PLAYBACK IN SPOTIFY" : "SAMPLE TRACKS · PLAYBACK SIMULATED";
  $("#profile-button").querySelector(".profile-copy strong").textContent = state.spotifyUser?.display_name || "Music explorer";
  $("#profile-button").querySelector(".profile-copy small").textContent = connected ? "Spotify account" : "Connect Spotify";
  $("#profile-button .avatar").textContent = (state.spotifyUser?.display_name || "D").trim().charAt(0).toUpperCase();
  $("#playback-status-label").textContent = connected ? "OPEN IN SPOTIFY" : "DEMO PLAYBACK";
  $("#page-label").dataset.connected = String(connected);
}

function openSpotifyDialog() {
  $("#client-id-input").value = spotifyClientId();
  $("#redirect-uri").textContent = redirectUri();
  $("#dialog-description").textContent = state.spotifyUser
    ? `Connected as ${state.spotifyUser.display_name || state.spotifyUser.id}. Update your Client ID or disconnect this browser tab.`
    : "Create a Spotify developer app, then paste its Client ID here. Sign-in uses Spotify's PKCE flow; this app never asks for your Spotify password or a client secret.";
  $("#dialog-done").textContent = state.spotifyUser ? "Disconnect" : "Save Client ID";
  $("#dialog-connect").textContent = state.spotifyUser ? "Reconnect" : "Save & connect";
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
  const pools = {
    familiar: shuffle(favorites),
    discovery: shuffle(discoveries.filter((track) => !favorites.some((favorite) => favorite.id === track.id)))
  };
  const chosen = [];
  let totalSeconds = 0;
  let familiarCount = 0;
  const targetSeconds = state.durationMinutes * 60;

  while (totalSeconds < targetSeconds && (pools.familiar.length || pools.discovery.length)) {
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
  stopPlayback();
  renderPlaylist();
  $("#mix-date").textContent = "Just now";
  $("#mix-kicker").textContent = `MADE FOR ${state.period === "day" ? "TODAY" : `YOUR ${state.period.toUpperCase()}`}`;
  $("#playlist-title").textContent = ["The Long Way Home", "Soft Focus FM", "Somewhere New", "Windows Down Radio"][Math.floor(Math.random() * 4)];
}

function updateDurationControl() {
  const range = $("#playlist-length");
  $("#duration-value").textContent = `${state.durationMinutes} min`;
  const percentage = ((state.durationMinutes - Number(range.min)) / (Number(range.max) - Number(range.min))) * 100;
  range.style.background = `linear-gradient(to right, var(--lime) 0 ${percentage}%, #3a3e35 ${percentage}% 100%)`;
}

async function buildMix() {
  const button = $("#generate-button");
  if (!state.spotifyUser) {
    const favorites = tracks.filter((track) => track.familiarity > 0 && track.periods.includes(state.period));
    const discoveries = tracks.filter((track) => track.familiarity === 0);
    composeMix(favorites, discoveries);
    const actualMinutes = state.playlist.reduce((sum, track) => sum + track.duration, 0) / 60;
    showToast(actualMinutes < state.durationMinutes
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
    showToast(actualMinutes < state.durationMinutes
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
  $("#mix-runtime").textContent = `${Math.round(totalSeconds / 60)} min · ${state.durationMinutes} min target`;
  $("#save-button").classList.toggle("saved", Boolean(state.spotifyPlaylist));
  $("#save-button").querySelector("span").textContent = state.spotifyPlaylist
    ? "Saved to Spotify"
    : state.spotifyUser ? "Save to Spotify" : "Save mix";
}

function createTrackRow(track, index, collection) {
  const row = document.createElement("div");
  row.className = "track-row";
  if (!collection && index === state.activeIndex) row.classList.add("playing");
  const rank = document.createElement("span");
  rank.className = "track-index";
  rank.textContent = String(index + 1).padStart(2, "0");
  const play = document.createElement("button");
  play.type = "button";
  play.className = "row-play";
  play.setAttribute("aria-label", `Play ${track.title}`);
  play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
  if (track.spotifyUrl) {
    play.addEventListener("click", () => openSpotifyTrack(track));
  } else if (!collection) {
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
  why.className = `track-type ${track.type === "discovery" ? "discovery" : ""}`;
  const dot = document.createElement("span");
  dot.className = "type-dot";
  const chip = document.createElement("span");
  chip.className = "type-chip";
  chip.textContent = track.type === "discovery" ? "New for you" : "In rotation";
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
  row.append(rank, play, main, why, time);
  if (!collection) row.addEventListener("dblclick", () => playTrack(index));
  return row;
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
    showToast("Opening this track in Spotify. Playback progress is not shared with Side B.");
    if (track.spotifyUrl) window.open(track.spotifyUrl, "_blank", "noopener,noreferrer");
    return;
  }
  $("#player-play-button").setAttribute("aria-label", "Pause");
  $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm7 0h4v14h-4z" fill="currentColor"/></svg>';
  $("#player-bar").classList.add("is-playing");
  renderPlaylist();
  state.timer = window.setInterval(advancePlayback, 1000);
}

function openSpotifyTrack(track) {
  if (track.spotifyUrl) window.open(track.spotifyUrl, "_blank", "noopener,noreferrer");
}

function advancePlayback() {
  if (state.activeIndex < 0) return;
  const track = state.playlist[state.activeIndex];
  state.elapsed += 1;
  $("#current-time").textContent = formatTime(state.elapsed);
  $("#progress-fill").style.width = `${Math.min(state.elapsed / track.duration * 100, 100)}%`;
  if (state.elapsed / track.duration >= 0.6) saveDiscovery(track);
  if (state.elapsed >= track.duration) nextTrack();
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
  state.timer = null;
  $("#player-bar").classList.remove("is-playing");
  $("#player-play-button").setAttribute("aria-label", "Play");
  $("#player-play-button").innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 12 7-12 7V5Z" fill="currentColor"/></svg>';
}

function togglePlayback() {
  if (state.activeIndex < 0) {
    playTrack(0);
    return;
  }
  const activeTrack = state.playlist[state.activeIndex];
  if (activeTrack?.spotifyUri) {
    openSpotifyTrack(activeTrack);
    showToast("Playback is handled by Spotify.");
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
  playTrack((state.activeIndex + 1) % state.playlist.length);
}

function previousTrack() {
  if (state.elapsed > 3) {
    state.elapsed = 0;
    $("#progress-fill").style.width = "0%";
    $("#current-time").textContent = "0:00";
  } else if (state.playlist.length) {
    playTrack((state.activeIndex - 1 + state.playlist.length) % state.playlist.length);
  }
}

async function saveMix() {
  if (!state.playlist.length) return;
  if (state.spotifyUser) {
    const button = $("#save-button");
    button.disabled = true;
    button.querySelector("span").textContent = "Saving to Spotify…";
    try {
      const playlist = await spotifyRequest("/me/playlists", {
        method: "POST",
        body: JSON.stringify({
          name: $("#playlist-title").textContent,
          description: `A Side B mix for ${periodLabels[state.period].toLowerCase()}, with familiar favorites and new discoveries.`,
          public: false,
          collaborative: false
        })
      });
      const uris = state.playlist.map((track) => track.spotifyUri).filter(Boolean);
      if (!uris.length) throw new Error("This mix has no Spotify tracks to add.");
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
        createdAt: new Date().toISOString(),
        tracks: state.playlist,
        spotifyPlaylist: state.spotifyPlaylist
      };
      const nextSaved = [snapshot, ...state.saved];
      const savedLocally = writeStorage(storageKeys.saved, nextSaved);
      if (savedLocally) state.saved = nextSaved;
      $("#save-button").classList.add("saved");
      button.querySelector("span").textContent = "Saved to Spotify";
      showToast(savedLocally
        ? "Playlist saved to Spotify and Side B. Find it in Spotify or Android Auto."
        : "Playlist saved to Spotify, but Side B couldn't save its local shortcut.");
    } catch (error) {
      button.querySelector("span").textContent = "Save to Spotify";
      showToast(`Couldn't save the Spotify playlist: ${error.message}`);
      console.error("Spotify playlist creation failed.", error);
    } finally {
      button.disabled = false;
    }
    return;
  }
  const snapshot = {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title: $("#playlist-title").textContent,
    period: state.period,
    durationMinutes: state.durationMinutes,
    createdAt: new Date().toISOString(),
    tracks: state.playlist,
    spotifyPlaylist: state.spotifyPlaylist
  };
  const nextSaved = [snapshot, ...state.saved];
  if (!writeStorage(storageKeys.saved, nextSaved)) return;
  state.saved = nextSaved;
  $("#save-button").classList.add("saved");
  $("#save-button").querySelector("span").textContent = "Saved";
  showToast("Mix saved in this browser.");
}

function updateCounts() {
  $("#discovery-count").textContent = state.discoveries.length;
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
  $("#page-label").textContent = view === "mix" ? "YOUR MIX" : view === "discoveries" ? "DISCOVERED" : "SAVED MIXES";
  $("#collection-title").textContent = view === "discoveries" ? "Your discoveries." : "Your saved mixes.";
  $("#collection-description").textContent = view === "discoveries"
    ? "Songs you listened to at least 60% of the way through."
    : "Mixes you've kept for another drive.";
  renderCollection();
}

function renderCollection() {
  collectionList.replaceChildren();
  const isDiscovery = state.currentView === "discoveries";
  const collectionEmpty = $("#collection-empty");
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
    const mixMinutes = mix.durationMinutes || Math.round(mix.tracks.reduce((sum, track) => sum + track.duration, 0) / 60);
    meta.textContent = `${mix.tracks.length} tracks · ${mixMinutes} min · ${periodLabels[mix.period]} · ${new Date(mix.createdAt).toLocaleDateString()}`;
    copy.append(title, meta);
    card.append(cover, copy);
    card.addEventListener("click", () => {
      selectPeriod(mix.period);
      state.durationMinutes = mix.durationMinutes || Math.round(mix.tracks.reduce((sum, track) => sum + track.duration, 0) / 60);
      $("#playlist-length").value = String(Math.min(120, Math.max(15, Math.round(state.durationMinutes / 15) * 15)));
      state.durationMinutes = Number($("#playlist-length").value);
      updateDurationControl();
      state.playlist = mix.tracks;
      state.spotifyPlaylist = mix.spotifyPlaylist || null;
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

document.querySelectorAll("[data-period]").forEach((button) => {
  button.addEventListener("click", () => {
    selectPeriod(button.dataset.period);
  });
});

$("#mix-ratio").addEventListener("input", (event) => {
  state.ratio = Number(event.target.value);
  $("#ratio-value").innerHTML = `${state.ratio}% <span>familiar</span>`;
  event.target.style.background = `linear-gradient(to right, var(--lime) 0 ${state.ratio}%, #3a3e35 ${state.ratio}% 100%)`;
});
$("#playlist-length").addEventListener("input", (event) => {
  state.durationMinutes = Number(event.target.value);
  updateDurationControl();
});
$("#generate-button").addEventListener("click", buildMix);
$("#shuffle-button").addEventListener("click", () => {
  state.playlist = shuffle(state.playlist);
  renderPlaylist();
  showToast("Mix shuffled.");
});
$("#save-button").addEventListener("click", saveMix);
$("#play-all-button").addEventListener("click", () => {
  if (state.spotifyUser) {
    if (state.spotifyPlaylist?.url) {
      window.open(state.spotifyPlaylist.url, "_blank", "noopener,noreferrer");
    } else {
      showToast("Save this mix to Spotify first, then open the playlist here or in Android Auto.");
    }
    return;
  }
  playTrack(0);
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
  } else if (spotifyClientId()) {
    state.spotifyConnecting = true;
    updateSpotifyUi();
    void authorizeSpotify().catch((error) => {
      state.spotifyConnecting = false;
      state.spotifyError = error.message;
      updateSpotifyUi();
      showToast(`Couldn't start Spotify sign-in: ${error.message}`);
      console.error("Spotify sign-in could not start.", error);
    });
  } else {
    openSpotifyDialog();
  }
});
$("#profile-button").addEventListener("click", openSpotifyDialog);
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
  if (!clientId) {
    showToast("Paste your Spotify Client ID first.");
    $("#client-id-input").focus();
    return;
  }
  try {
    localStorage.setItem(storageKeys.clientId, clientId);
  } catch (error) {
    showToast("Couldn't save the Client ID in this browser.");
    console.error("Could not save the Spotify Client ID.", error);
    return;
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
  const storageKey = state.currentView === "discoveries" ? storageKeys.discoveries : storageKeys.saved;
  if (!writeStorage(storageKey, [])) return;
  if (state.currentView === "discoveries") {
    state.discoveries = [];
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
$("#redirect-uri").textContent = redirectUri();

async function initializeSpotify() {
  try {
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

if (new URLSearchParams(window.location.search).has("code") || readSpotifySession()?.access_token) {
  state.spotifyConnecting = true;
  updateSpotifyUi();
}
void initializeSpotify();

if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
  navigator.serviceWorker.register("./service-worker.js").catch((error) => {
    console.error("Could not register the Side B offline app shell.", error);
  });
}
