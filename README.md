# Side B

Side B makes a shuffled playlist from Spotify listening data, then saves it to Spotify so it can be played in the Spotify app, including through Android Auto.

## Start Side B

1. Install Node.js if it is not already installed.
2. In this folder, run `node server.js`.
3. Open <http://127.0.0.1:4173/> in your browser. Spotify sign-in does not work from a `file://` URL.

The local development version is only reachable from this computer. To use Side B on your Android phone, it needs to be deployed to an HTTPS web host, and that hosted URL must be added to the Spotify app's Redirect URIs. This project includes a web-app manifest, icon, and service worker; after it is deployed, open the hosted address in Chrome and choose **Install app** or **Add to Home screen**. The current website is not a Play Store Android app or a standalone Android Auto app; saved Spotify playlists can be played in Spotify through Android Auto. The service worker caches only the app shell and never caches Spotify API requests.

## Connect a Spotify account

1. Sign in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an app with Web API access.
2. In the app's settings, add this exact Redirect URI: `http://127.0.0.1:4173/`
3. Copy the app's Client ID (not a client secret).
4. In Side B, select **Connect Spotify**, paste the Client ID, then select **Save & connect** and approve the requested permissions.

Side B uses Spotify Authorization Code with PKCE. It does not use or store a client secret. The Client ID is stored in local browser storage. Access and refresh tokens are kept in session storage for the current tab; signing out or closing the tab ends the local session. A small localhost-only proxy forwards requests to Spotify to support browser environments that cannot call the Spotify API directly. The server rejects other hostnames and cross-origin requests. Keep it bound to localhost and do not expose the development server to a public network.

Spotify's current development-mode rules require the app owner to have Premium and limit a development app to five allowlisted Spotify users. See [Spotify's quota-mode requirements](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).

## Spotify features

- **Month:** Spotify's short-term top tracks, which represent approximately the last four weeks.
- **Day/week:** recent plays filtered to that period. Spotify only exposes a limited recent-play history (up to 50 items); if there are too few matching plays, Side B fills from short-term top tracks.
- **New tracks:** a taste-based discovery pool from Spotify search results for genres represented by the account's top artists. This is a simple genre-matching approach, not Spotify's recommendation engine.
- **Save to Spotify:** creates a private playlist in the connected Spotify account. Select **Play mix** afterwards to open that playlist in Spotify; it will also be available to Spotify on Android Auto.
- **Playlist length:** choose a target between 15 minutes and 2 hours. The mix uses unique tracks and gets as close to the target as the available Spotify tracks allow; the actual estimated runtime is shown beside the target.
- Selecting an individual Spotify track opens its Spotify page. Audio plays in Spotify, not in this web app.

Spotify does not provide companion apps reliable playback-progress events for tracks played in Spotify. The 60% Discovery tracker therefore only works for the prototype's simulated sample tracks; it cannot record the actual progress of Spotify playback. Exact daily/weekly play counts and Spotify's personalized recommendations are also not available from this web app. API availability and development-mode permissions are controlled by Spotify and may change.

## Local demo

Without a Spotify connection, the app uses sample tracks and simulated playback. Saved sample mixes, likes, and discoveries are stored in the browser. The app has no build step or third-party JavaScript dependencies; Google Fonts are optional.
