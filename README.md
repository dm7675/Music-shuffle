# Side B

Side B makes a shuffled playlist from Spotify listening data, then saves it to Spotify so it can be played in the Spotify app, including through Android Auto.

## Start Side B

1. Install Node.js if it is not already installed.
2. In this folder, run `node server.js`.
3. Open <http://127.0.0.1:4173/> in your browser. Spotify sign-in does not work from a `file://` URL.

The local development version is only reachable from this computer. To use Side B on your Android phone, it needs to be deployed to an HTTPS web host, and that hosted URL must be added to the Spotify app's Redirect URIs. This project includes a web-app manifest, icon, and service worker; after it is deployed, open the hosted address in Chrome and choose **Install app** or **Add to Home screen**. The current website is not a Play Store Android app or a standalone Android Auto app; saved Spotify playlists can be played in Spotify through Android Auto. The service worker caches only the app shell and never caches Spotify API requests.

## Host on Render

This app needs a Node.js web service: static-only hosting such as GitHub Pages cannot run the Spotify API proxy.

1. In Render, create a **Web Service** and connect this GitHub repository.
2. Set the build command to `npm install` and the start command to `npm start`.
3. Render supplies the assigned service hostname at runtime; Side B uses it as its allowed HTTPS origin and binds to Render's network interface. If you use a custom domain, add an environment variable named `PUBLIC_ORIGIN` with exactly that HTTPS origin (for example, `https://music.example.com`, with no trailing path) and redeploy.
4. In Spotify Developer Dashboard, add `https://your-service.onrender.com/` as a Redirect URI, replacing it with your exact Render address.
5. `SPOTIFY_CLIENT_ID` is optional; the server has a default public Client ID for Side B. Set the variable in Render's environment settings only if you need to override that default. A Client ID is an OAuth app identifier, not a secret; the app returns it to browsers for Spotify sign-in.
6. On Android, open the address in Chrome, sign in to Spotify, then use Chrome's **Install app** or **Add to Home screen** option. Save a mix to Spotify and play that Spotify playlist through Android Auto.

For a custom domain, `PUBLIC_ORIGIN` must be the exact public HTTPS origin; do not set it to `*` or expose the local development server. The Spotify development-mode Premium and allowlist limits still apply.

## Connect a Spotify account

1. Sign in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an app with Web API access.
2. In the app's settings, add this exact Redirect URI: `http://127.0.0.1:4173/`
3. For a shared deployment, the server supplies Side B's default Client ID. To override it, set `SPOTIFY_CLIENT_ID` in the server environment. For local development, the server reads values from the ignored `.env` file if present, and the Spotify Client ID can also be entered in Side B when no server value is available.
4. In Side B, select **Connect Spotify** and approve the requested permissions.

Side B uses Spotify Authorization Code with PKCE. It does not use or store a Spotify client secret. A per-browser Client ID is stored in local browser storage when used; for a shared deployment, the app can instead use `SPOTIFY_CLIENT_ID` from the server environment. Local `.env` values are not committed to source control. Access and refresh tokens are kept in session storage for the current tab; signing out or closing the tab ends the local session. The same-origin server proxy forwards requests to Spotify and configured providers; it rejects other hostnames and cross-origin requests. Keep the local development server bound to localhost and do not expose it to a public network.

Spotify's current development-mode rules require the app owner to have Premium and limit a development app to five allowlisted Spotify users. See [Spotify's quota-mode requirements](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).

## Spotify features

- **Month:** Spotify's short-term top tracks, which represent approximately the last four weeks.
- **Day/week:** recent plays filtered to that period. Spotify only exposes a limited recent-play history (up to 50 items); if there are too few matching plays, Side B fills from short-term top tracks.
- **New tracks:** a taste-based discovery pool from Spotify search results for genres represented by the account's top artists. This is a simple genre-matching approach, not Spotify's recommendation engine.
- **Play from Side B:** the playlist action changes to **Play on Spotify** after a mix is exported and linked to Spotify; pressing it starts the playlist on an available Spotify Connect device. **Open Spotify** opens the linked playlist in Spotify. Previous/next controls and per-track play buttons remain available on phones. Unsaved mixes can also be started from Side B. When Spotify reports no device, open Spotify on your phone or computer and start playback there before retrying. Side B controls Spotify and does not stream audio itself. The phone routes Spotify audio to paired Bluetooth devices. Spotify-reported playback progress drives the 60% heard marker and skip handling. Sample tracks still use simulated playback.
- **Save/export:** save a mix in Side B's browser-local **Saved mixes** collection with **Save in Side B**. When Spotify is connected, **Export to Spotify** creates a private Spotify playlist; editing a linked Spotify playlist and selecting **Update Spotify** updates it. Spotify permissions, Premium requirements, active devices, and API availability apply.
- **Playlist editing:** rename a mix, add tracks from Spotify search (or the sample catalog), remove tracks, and keep manually added songs as seeds for future mixes. Seeds can either be included in the generated playlist or used to prioritize similar artists; included seeds count toward the chosen playlist length.
- **Skip handling:** tracks skipped before 60% are saved under **Held back**. Skips under 30% are marked early; 30–59% skips get the same hold. A track you move on from after hearing at least 60% counts as heard (and as a discovery if it was new) and is not held back. Expired holds no longer appear in the list, but they are remembered so repeated skips keep lengthening the cooldown. The cooldown increases with repeated skips, up to 30 days. You can return a song to rotation or block/unblock it manually.
- **Playlist import/export:** import playlists from your Spotify account, Side B JSON backups, or CSV track lists. With Spotify connected, choose **Export to Spotify** to create a playlist directly in Spotify; Side B matches imported songs by title and artist, reports unmatched tracks, and exports the tracks it can match. Updating a Spotify playlist also matches eligible tracks before updating it. JSON and CSV file exports are available separately. Spotify imports omit local/unavailable tracks and report the count. Spotify remains the only fully integrated platform for mix generation, playlist import/export, and playback; the other providers currently support account authorization only.
- **Playlist length:** choose a target by time (15 minutes to 2 hours) or song count (5 to 40). The mix uses unique tracks and gets as close to the target as the available tracks allow; the actual track count and estimated runtime are shown.
- **Track labels:** each track is labeled "In rotation" or "New for you." The Familiar/New slider's filled track follows its thumb, with "New" and "Familiar" labels beneath the matching ends.
Spotify playback progress is polled while playback is started from Side B. Playback that is started and controlled outside Side B is not tracked as reliably. Spotify's API policies, account eligibility, permissions, active device, and development-mode access rules can change and may limit these features.

## Connect other music accounts

The **More platforms** panel is currently hidden in the app because none of these providers is configured; remove the `hidden` class from `#platforms-button` in `index.html` to show it again. It can authorize accounts only after the Side B operator configures app credentials. Friends sign in with their own music accounts; they do not need developer credentials. The only provider in this list with a clearly documented no-cost API quota is YouTube Data API. That quota does not remove the requirement to create a Google Cloud project and OAuth app, and Google may require app verification before general users can authorize:

- **YouTube Data API (free quota):** create a Google Cloud project, enable YouTube Data API v3, configure the OAuth consent screen and an OAuth client of type **Web application**, and register Side B's redirect URL. Set `YOUTUBE_CLIENT_ID` and `YOUTUBE_CLIENT_SECRET` on the server. Google documents a default 10,000-unit daily quota, with `search.list` limited to 100 calls per day. This is YouTube account/API access, not a YouTube Music API.
- **Apple Music:** Apple developer credentials are required. Access to the needed Apple developer resources may require paid Apple Developer Program membership. Set `APPLE_MUSIC_TEAM_ID`, `APPLE_MUSIC_KEY_ID`, and `APPLE_MUSIC_PRIVATE_KEY` (the PEM key may use `\n` for line breaks).
- **TIDAL:** requires TIDAL-issued app credentials and developer access. Whether you can register an app and any applicable fees are controlled by TIDAL. Set `TIDAL_CLIENT_ID` and `TIDAL_CLIENT_SECRET`.
- **Deezer:** requires a developer app and acceptance of Deezer's API terms; app access may be restricted. Confirm current availability and terms with Deezer. Set `DEEZER_APP_ID` and `DEEZER_APP_SECRET`.
- `SPOTIFY_CLIENT_ID` for a shared Spotify app; this is optional when users provide their own Client ID.

Never put provider secrets or the Apple private key in browser storage, source control, or chat. Configure them in the hosting provider's private environment settings. Register Side B's exact redirect URI with each provider app; for local development it is `http://127.0.0.1:4173/`. The current sign-in tokens are held only in the browser tab's session storage.

YouTube Music has no official YouTube Music API. Side B's YouTube OAuth groundwork uses Google's official YouTube Data API, which can authorize YouTube playlist and video operations but does not expose YouTube Music listening history or playback control. Spotify remains the only provider currently used to build a listening-based mix, import/export service playlists, and control playback. Other account connections are authorization groundwork and do not yet feed the mix or playlist actions.

## Local demo

Without a Spotify connection, the app uses sample tracks and simulated playback. Saved sample mixes, likes, and discoveries are stored in the browser. The app has no build step or third-party JavaScript dependencies; Google Fonts are optional.
