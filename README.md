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
5. Open the Render HTTPS address, select **Connect Spotify**, and enter your Spotify app's Client ID. Client IDs are stored per browser, so connect separately on your phone.
6. On Android, open the address in Chrome, sign in to Spotify, then use Chrome's **Install app** or **Add to Home screen** option. Save a mix to Spotify and play that Spotify playlist through Android Auto.

For a custom domain, `PUBLIC_ORIGIN` must be the exact public HTTPS origin; do not set it to `*` or expose the local development server. The Spotify development-mode Premium and allowlist limits still apply.

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
- **Play from Side B:** starts the current track list on an active Spotify playback device without requiring the mix to be saved first. Spotify must have an available playback device; Spotify Premium may be required. The phone routes audio to paired Bluetooth devices. Spotify-reported playback progress drives the 60% heard marker and skip handling. Sample tracks still use simulated playback.
- **Save/export:** save a mix in Side B's browser-local **Saved mixes** collection with **Save in Side B**. When Spotify is connected, **Export to Spotify** creates a private Spotify playlist; editing a linked Spotify playlist and selecting **Update Spotify** updates it. Spotify permissions, Premium requirements, active devices, and API availability apply.
- **Playlist editing:** rename a mix, add tracks from Spotify search (or the sample catalog), remove tracks, and keep manually added songs as seeds for future mixes. Seeds can either be included in the generated playlist or used to prioritize similar artists; included seeds count toward the chosen playlist length.
- **Skip handling:** tracks skipped before 60% are saved under **Held back**. Skips under 30% are marked early; 30–59% skips get the same hold. Skipped tracks at or above 60% are marked heard and also held temporarily. The cooldown increases with repeated skips, up to 30 days. You can return a song to rotation or block/unblock it manually.
- **Playlist import/export:** import playlists from your Spotify account, Side B JSON backups, or CSV track lists. With Spotify connected, choose **Export to Spotify** to create a playlist directly in Spotify; Side B matches imported songs by title and artist, reports unmatched tracks, and exports the tracks it can match. Updating a Spotify playlist also matches eligible tracks before updating it. JSON and CSV file exports are available separately. Spotify imports omit local/unavailable tracks and report the count. Spotify is the only music-platform connection currently implemented; Apple Music and other platform account transfers and continuous sync are not available.
- **Playlist length:** choose a target by time (15 minutes to 2 hours) or song count (5 to 40). The mix uses unique tracks and gets as close to the target as the available tracks allow; the actual track count and estimated runtime are shown.
- **Track labels:** each track is labeled "In rotation" or "New for you." The Familiar/New slider's filled track follows its thumb, with "New" and "Familiar" labels beneath the matching ends.
Spotify playback progress is polled while playback is started from Side B. Playback that is started and controlled outside Side B is not tracked as reliably. Spotify's API policies, account eligibility, permissions, active device, and development-mode access rules can change and may limit these features.

## Local demo

Without a Spotify connection, the app uses sample tracks and simulated playback. Saved sample mixes, likes, and discoveries are stored in the browser. The app has no build step or third-party JavaScript dependencies; Google Fonts are optional.
