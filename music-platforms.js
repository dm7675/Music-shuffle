(() => {
  const sessionPrefix = "sideb-music-platform-";
  const providers = {
    appleMusic: {
      name: "Apple Music",
      setup: "Apple Music API access requires Apple developer credentials. Apple Developer Program membership may be required and has a fee. Configure APPLE_MUSIC_TEAM_ID, APPLE_MUSIC_KEY_ID, and APPLE_MUSIC_PRIVATE_KEY on the server.",
      docs: "https://developer.apple.com/account/resources/identifiers/list"
    },
    tidal: {
      name: "TIDAL",
      setup: "TIDAL must grant your app developer access. Availability and any fees depend on TIDAL. Configure TIDAL_CLIENT_ID and TIDAL_CLIENT_SECRET on the server.",
      docs: "https://developer.tidal.com/"
    },
    deezer: {
      name: "Deezer",
      setup: "Create or obtain a Deezer developer app and accept its API terms; app access may be restricted. Configure DEEZER_APP_ID and DEEZER_APP_SECRET on the server.",
      docs: "https://developers.deezer.com/"
    },
    youtubeMusic: {
      name: "YouTube (not YouTube Music)",
      setup: "YouTube Data API has a free daily quota. Create a Google Cloud project, enable YouTube Data API v3, configure the OAuth consent screen and a Web application OAuth client, then set YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET on the server. Google may require verification before general users can authorize.",
      docs: "https://console.cloud.google.com/apis/credentials"
    }
  };
  let config = null;
  let appleMusicKitConfigured = false;

  function sessionKey(provider) {
    return `${sessionPrefix}${provider}`;
  }

  function readSession(provider) {
    try {
      return JSON.parse(sessionStorage.getItem(sessionKey(provider)) || "null");
    } catch (error) {
      console.error(`Could not read the ${providers[provider].name} session.`, error);
      return null;
    }
  }

  function writeSession(provider, session) {
    try {
      sessionStorage.setItem(sessionKey(provider), JSON.stringify(session));
      return true;
    } catch (error) {
      console.error(`Could not save the ${providers[provider].name} session.`, error);
      throw new Error("Could not save the music account session in this browser tab.");
    }
  }

  function clearSession(provider) {
    sessionStorage.removeItem(sessionKey(provider));
  }

  function createVerifier() {
    const bytes = crypto.getRandomValues(new Uint8Array(48));
    return btoa(String.fromCharCode(...bytes))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  async function createChallenge(verifier) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function redirectUri() {
    return `${window.location.origin}${window.location.pathname}`;
  }

  async function loadConfig() {
    if (config) return config;
    const response = await fetch("/platform-config", {
      cache: "no-store",
      signal: AbortSignal.timeout(10_000)
    });
    if (!response.ok) throw new Error(`Could not load music platform settings (${response.status}).`);
    config = await response.json();
    return config;
  }

  async function connectAppleMusic() {
    if (!config?.appleMusic?.developerToken) throw new Error(providers.appleMusic.setup);
    if (!window.MusicKit) {
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://js-cdn.music.apple.com/musickit/v3/musickit.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Could not load Apple Music authorization."));
        document.head.append(script);
      });
    }
    if (!appleMusicKitConfigured) {
      await window.MusicKit.configure({
        developerToken: config.appleMusic.developerToken,
        app: { name: "Side B", build: "1.0.0" }
      });
      appleMusicKitConfigured = true;
    }
    const music = window.MusicKit.getInstance();
    const musicUserToken = await music.authorize();
    writeSession("appleMusic", { musicUserToken });
    return { id: "apple-music-user", name: "Apple Music subscriber" };
  }

  function startRedirect(provider, authorizationUrl, verifier, oauthState) {
    sessionStorage.setItem(`${sessionKey(provider)}-verifier`, verifier || "");
    sessionStorage.setItem(`${sessionKey(provider)}-state`, oauthState);
    sessionStorage.setItem(`${sessionPrefix}pending`, provider);
    window.location.assign(authorizationUrl);
  }

  async function connectTidal() {
    const clientId = config?.tidal?.clientId;
    if (!config?.tidal?.configured || !clientId) throw new Error(providers.tidal.setup);
    const verifier = createVerifier();
    const challenge = await createChallenge(verifier);
    const oauthState = createVerifier();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri(),
      response_type: "code",
      scope: "user.read playlists.read playlists.write collection.read",
      state: oauthState,
      code_challenge_method: "S256",
      code_challenge: challenge
    });
    startRedirect("tidal", `https://login.tidal.com/authorize?${params}`, verifier, oauthState);
  }

  function connectDeezer() {
    const appId = config?.deezer?.appId;
    if (!config?.deezer?.configured || !appId) throw new Error(providers.deezer.setup);
    const oauthState = createVerifier();
    const params = new URLSearchParams({
      app_id: appId,
      redirect_uri: redirectUri(),
      perms: "basic_access,email,manage_library",
      state: oauthState
    });
    startRedirect("deezer", `https://connect.deezer.com/oauth/auth.php?${params}`, "", oauthState);
  }

  async function connectYoutubeMusic() {
    const clientId = config?.youtubeMusic?.clientId;
    if (!config?.youtubeMusic?.configured || !clientId) throw new Error(providers.youtubeMusic.setup);
    const verifier = createVerifier();
    const challenge = await createChallenge(verifier);
    const oauthState = createVerifier();
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri(),
      response_type: "code",
      scope: "https://www.googleapis.com/auth/youtube.force-ssl",
      access_type: "offline",
      prompt: "consent",
      state: oauthState,
      code_challenge_method: "S256",
      code_challenge: challenge
    });
    startRedirect("youtubeMusic", `https://accounts.google.com/o/oauth2/v2/auth?${params}`, verifier, oauthState);
  }

  async function exchangeToken(provider, body) {
    const response = await fetch(`/provider-token/${provider}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(body),
      signal: AbortSignal.timeout(15_000)
    });
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(result?.error_description || result?.error || `Sign-in failed (${response.status}).`);
    }
    const session = {
      access_token: result.access_token,
      refresh_token: result.refresh_token || null,
      expires_at: Date.now() + (Number(result.expires_in) || 3600) * 1000
    };
    writeSession(provider, session);
    return session;
  }

  async function handleRedirect() {
    const query = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const provider = sessionStorage.getItem(`${sessionPrefix}pending`);
    if (!provider || !["tidal", "deezer", "youtubeMusic"].includes(provider)) return null;
    const oauthState = query.get("state") || hash.get("state");
    const expectedState = sessionStorage.getItem(`${sessionKey(provider)}-state`);
    if (!expectedState || oauthState !== expectedState) {
      sessionStorage.removeItem(`${sessionKey(provider)}-state`);
      sessionStorage.removeItem(`${sessionKey(provider)}-verifier`);
      sessionStorage.removeItem(`${sessionPrefix}pending`);
      if (query.has("code") || query.has("error") || hash.has("access_token") || hash.has("error")) {
        window.history.replaceState({}, document.title, redirectUri());
        throw new Error(`${providers[provider].name} sign-in could not be verified. Please connect again.`);
      }
      return null;
    }

    const error = query.get("error") || hash.get("error");
    const code = query.get("code");
    const accessToken = hash.get("access_token");
    if (!code && !(provider === "deezer" && accessToken) && !error) return null;

    const verifier = sessionStorage.getItem(`${sessionKey(provider)}-verifier`) || "";
    sessionStorage.removeItem(`${sessionKey(provider)}-state`);
    sessionStorage.removeItem(`${sessionKey(provider)}-verifier`);
    sessionStorage.removeItem(`${sessionPrefix}pending`);
    window.history.replaceState({}, document.title, redirectUri());
    if (error) throw new Error(`${providers[provider].name} sign-in was not completed: ${error}.`);
    if (provider === "deezer") {
      writeSession(provider, {
        access_token: accessToken,
        expires_at: hash.get("expires") ? Date.now() + Number(hash.get("expires")) * 1000 : null
      });
    } else {
      await exchangeToken(provider === "youtubeMusic" ? "youtube" : "tidal", {
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri(),
        code_verifier: verifier
      });
    }
    return provider;
  }

  async function getAccessToken(provider) {
    const session = readSession(provider);
    if (provider === "appleMusic") {
      if (!session?.musicUserToken) throw new Error("Connect your Apple Music account first.");
      return session.musicUserToken;
    }
    if (!session?.access_token) throw new Error(`Connect your ${providers[provider].name} account first.`);
    if (!session.expires_at || session.expires_at > Date.now() + 30_000) return session.access_token;
    if (!session.refresh_token || !["tidal", "youtubeMusic"].includes(provider)) {
      clearSession(provider);
      throw new Error(`Your ${providers[provider].name} session expired. Connect again.`);
    }
    const refreshed = await exchangeToken(provider === "youtubeMusic" ? "youtube" : "tidal", {
      grant_type: "refresh_token",
      refresh_token: session.refresh_token
    });
    return refreshed.access_token;
  }

  async function request(provider, endpoint, options = {}) {
    const token = await getAccessToken(provider);
    const routeProvider = {
      appleMusic: "apple",
      youtubeMusic: "youtube"
    }[provider] || provider;
    const headers = { ...(options.headers || {}) };
    headers.Authorization = `Bearer ${token}`;
    if (provider === "appleMusic") {
      headers.Authorization = `Bearer ${config.appleMusic.developerToken}`;
      headers["Music-User-Token"] = token;
    }
    const response = await fetch(`/provider-api/${routeProvider}${endpoint}`, {
      ...options,
      headers,
      signal: AbortSignal.timeout(15_000)
    });
    const result = response.status === 204 ? null : await response.json().catch(() => null);
    if (!response.ok) {
      if (response.status === 401) clearSession(provider);
      throw new Error(result?.errors?.[0]?.detail || result?.error?.message || result?.error?.errors?.[0]?.message
        || `Music provider request failed (${response.status}).`);
    }
    return result;
  }

  async function getProfile(provider) {
    const endpoints = {
      appleMusic: "/v1/me/storefront",
      tidal: "/v2/me",
      deezer: "/user/me",
      youtubeMusic: "/youtube/v3/channels?part=snippet&mine=true"
    };
    return request(provider, endpoints[provider]);
  }

  async function beginConnection(provider) {
    await loadConfig();
    if (provider === "appleMusic") return connectAppleMusic();
    if (provider === "tidal") return connectTidal();
    if (provider === "deezer") return connectDeezer();
    if (provider === "youtubeMusic") return connectYoutubeMusic();
    throw new Error("Unknown music platform.");
  }

  window.SideBMusicPlatforms = {
    providers,
    loadConfig,
    readSession,
    clearSession,
    hasPendingRedirect: () => Boolean(sessionStorage.getItem(`${sessionPrefix}pending`)),
    clientId: (provider) => config?.[provider]?.clientId || "",
    handleRedirect,
    beginConnection,
    getProfile,
    request
  };
})();
