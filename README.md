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
6. Set `TOKEN_ENCRYPTION_KEY` to a random 32-byte key so Side B can keep sign-ins and record listening in the background. Generate one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Keep it only in Render's environment settings; if it is lost or changed, everyone has to connect Spotify again.
7. Give the database a place that survives deploys: attach a Render persistent disk (for example at `/var/data`) and set `DATABASE_PATH=/var/data/sideb.db`, or the data is wiped on every deploy. Background recording also needs an always-on instance; Render's free plan sleeps when idle and then records nothing. See [Background listening](#background-listening).
8. On Android, open the address in Chrome, sign in to Spotify, then use Chrome's **Install app** or **Add to Home screen** option. Press **Play on Spotify** to hear the mix through Spotify, including on Android Auto, or **Save to Spotify** to keep it as a playlist you can find in Spotify later.

For a custom domain, `PUBLIC_ORIGIN` must be the exact public HTTPS origin; do not set it to `*` or expose the local development server. The Spotify development-mode Premium and allowlist limits still apply.

## Connect a Spotify account

1. Sign in to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard) and create an app with Web API access.
2. In the app's settings, add this exact Redirect URI: `http://127.0.0.1:4173/`
3. For a shared deployment, the server supplies Side B's default Client ID. To override it, set `SPOTIFY_CLIENT_ID` in the server environment. For local development, the server reads values from the ignored `.env` file if present, and the Spotify Client ID can also be entered in Side B when no server value is available.
4. In Side B, select **Connect Spotify** and approve the requested permissions.

Side B uses Spotify Authorization Code with PKCE. It does not use or store a Spotify client secret. A per-browser Client ID is stored in local browser storage when used; for a shared deployment, the app can instead use `SPOTIFY_CLIENT_ID` from the server environment. Local `.env` values are not committed to source control. When the server has `TOKEN_ENCRYPTION_KEY`, the Spotify refresh token is kept encrypted on the server and the browser holds only short-lived access tokens in session storage, plus an HttpOnly session cookie that keeps you signed in on that device. Without the key, both tokens stay in the tab's session storage and closing the tab ends the session. The same-origin server proxy forwards requests to Spotify and configured providers; it rejects other hostnames and cross-origin requests. Keep the local development server bound to localhost and do not expose it to a public network.

Spotify's current development-mode rules require the app owner to have Premium and limit a development app to five allowlisted Spotify users. See [Spotify's quota-mode requirements](https://developer.spotify.com/documentation/web-api/concepts/quota-modes).

## Spotify features

- **Month:** Spotify's short-term top tracks, which represent approximately the last four weeks.
- **Day/week:** your plays from the last 24 hours or 7 days. Spotify only returns your last 50 plays, so Side B keeps a 30-day play log (on the server when it records your listening, otherwise in this browser) and uses it for these windows. If there are too few plays, Side B fills from short-term top tracks.
- **New tracks:** songs you haven't heard. Spotify no longer gives apps “similar artists” and often returns no genres, so Side B searches the artists your favorites collaborate with (who aren't favorites themselves), plus genres when Spotify provides them. A song you've heard, a favorite, or another release of either is never offered as new; at most two songs per artist are used; and searches vary between mixes. Mixes keep the Familiar/New balance you chose: if there aren't enough new songs, the mix is shorter rather than filled with familiar ones, and Side B says so.
- **Play on Spotify:** plays the mix's songs on Spotify without creating or changing any playlist; only **Save to Spotify** does that. Songs Spotify can't find are searched for first and skipped if still missing. On a computer with Premium the mix plays in the Side B tab; otherwise it plays on your open Spotify app. On a phone with Spotify closed, Side B opens the Spotify app and starts the mix as soon as Spotify is ready. Spotify only lets apps start playback for Premium accounts; without Premium, use **Save to Spotify** and play the playlist in Spotify. Side B controls Spotify and does not stream audio itself; the phone routes Spotify audio to Bluetooth. Spotify-reported playback progress drives the 60% heard marker and skip handling. Sample tracks still use simulated playback.
- **Save:** **Save in Side B** keeps a mix in Side B's **Saved mixes**. **Save to Spotify** creates a Spotify playlist named after the mix; afterwards the button reads **Update Spotify copy** and updates that same playlist. This is the only button that creates or changes Spotify playlists. A mix has one entry in Saved mixes whether or not it also has a Spotify copy. Large mixes are sent to Spotify 100 songs at a time. Spotify currently makes playlists created by apps public even when Side B asks for private; to hide one, open it in the Spotify app and choose **Make private**. Updating the copy keeps that setting.
- **Playlist editing:** rename a mix, add songs from Spotify search (or the sample catalog), remove songs, and shuffle. A mix never contains two releases of the same song. **My picks:** choose “Add to my picks” in Add songs, then pick how each mix uses them: add them to the mix, make a mix of only your picks (shuffled), use them only to guide which new songs are found, or leave them out this time. **See all** lists your picks so you can remove them. Sample-catalog songs picked before connecting Spotify are replaced with the real Spotify song when one exists, or removed.
- **Skip handling:** tracks skipped before 60% are saved under **Held back**. Skips under 30% are marked early; 30–59% skips get the same hold. A track you move on from after hearing at least 60% counts as heard (and as a discovery if it was new) and is not held back. Expired holds no longer appear in the list, but they are remembered so repeated skips keep lengthening the cooldown. The cooldown increases with repeated skips, up to 30 days. You can return a song to rotation or block/unblock it manually.
- **Playlist import/export:** import playlists from your Spotify account, Side B JSON backups, or CSV track lists, including Exportify exports (“Track Name”, “Artist Name(s)”, “Track URI”). Songs with a Spotify link are used as is; the rest are matched by song rather than exact text, so remasters and “feat.” versions match, several at a time. Repeats are removed and unmatched songs are listed. JSON and CSV file exports are available. Spotify imports omit local/unavailable tracks and report the count. Spotify remains the only fully integrated platform; the other providers currently support account authorization only.
- **Playlist length:** choose a target by time (15 minutes to 2 hours) or song count (5 to 40). The mix uses unique tracks and gets as close to the target as the available tracks allow; the actual track count and estimated runtime are shown.
- **Track labels:** each track is labeled "In rotation" or "New for you." The Familiar/New slider's filled track follows its thumb, with "New" and "Familiar" labels beneath the matching ends.
- **Likes:** the heart on any song adds it to **Liked**. Liked songs come up more often in your mixes. Likes are saved to your Side B account, so they're the same on every device. (Side B doesn't change Spotify's own Liked Songs.)
- **Player:** the queue button lists the songs coming up, with **Play now** to jump to one. Click the progress bar to jump within a song, and use the volume slider to change Spotify's volume (some Spotify devices don't allow this). The Play buttons in Discoveries, Liked and Held back play that song.
- **Saved mixes on every device:** with your Side B account, Saved mixes are kept on the server too; the most recently changed copy wins.
- **Protecting your data:** Side B asks before clearing Discoveries, Held back or Saved mixes, and before a new mix replaces songs you added or removed by hand and haven't saved. Updates load on the next visit (the offline copy is only used without a connection).
Spotify playback progress is polled while playback is started from Side B. Listening outside Side B, including in the Spotify app and Android Auto, is recorded by the server from Spotify's play history; see [Background listening](#background-listening). Spotify's API policies, account eligibility, permissions, active device, and development-mode access rules can change and may limit these features.

## Connect other music accounts

The **More platforms** panel is currently hidden in the app because none of these providers is configured; remove the `hidden` class from `#platforms-button` in `index.html` to show it again. It can authorize accounts only after the Side B operator configures app credentials. Friends sign in with their own music accounts; they do not need developer credentials. The only provider in this list with a clearly documented no-cost API quota is YouTube Data API. That quota does not remove the requirement to create a Google Cloud project and OAuth app, and Google may require app verification before general users can authorize:

- **YouTube Data API (free quota):** create a Google Cloud project, enable YouTube Data API v3, configure the OAuth consent screen and an OAuth client of type **Web application**, and register Side B's redirect URL. Set `YOUTUBE_CLIENT_ID` and `YOUTUBE_CLIENT_SECRET` on the server. Google documents a default 10,000-unit daily quota, with `search.list` limited to 100 calls per day. This is YouTube account/API access, not a YouTube Music API.
- **Apple Music:** Apple developer credentials are required. Access to the needed Apple developer resources may require paid Apple Developer Program membership. Set `APPLE_MUSIC_TEAM_ID`, `APPLE_MUSIC_KEY_ID`, and `APPLE_MUSIC_PRIVATE_KEY` (the PEM key may use `\n` for line breaks).
- **TIDAL:** requires TIDAL-issued app credentials and developer access. Whether you can register an app and any applicable fees are controlled by TIDAL. Set `TIDAL_CLIENT_ID` and `TIDAL_CLIENT_SECRET`.
- **Deezer:** requires a developer app and acceptance of Deezer's API terms; app access may be restricted. Confirm current availability and terms with Deezer. Set `DEEZER_APP_ID` and `DEEZER_APP_SECRET`.
- `SPOTIFY_CLIENT_ID` for a shared Spotify app; this is optional when users provide their own Client ID.

Never put provider secrets or the Apple private key in browser storage, source control, or chat. Configure them in the hosting provider's private environment settings. Register Side B's exact redirect URI with each provider app; for local development it is `http://127.0.0.1:4173/`. Sign-in tokens for these providers are held only in the browser tab's session storage.

YouTube Music has no official YouTube Music API. Side B's YouTube OAuth groundwork uses Google's official YouTube Data API, which can authorize YouTube playlist and video operations but does not expose YouTube Music listening history or playback control. Spotify remains the only provider currently used to build a listening-based mix, import/export service playlists, and control playback. Other account connections are authorization groundwork and do not yet feed the mix or playlist actions.

## Background listening

Without `TOKEN_ENCRYPTION_KEY`, Side B catches up the same way in the browser each time it is opened, using the same rules (it can only see the plays Spotify still lists, so open it at least every few hours of listening).

With `TOKEN_ENCRYPTION_KEY` set, the server checks each connected user's Spotify play history every 20 minutes (`SYNC_INTERVAL_MINUTES`, minimum 5), even when Side B is closed, and again whenever Side B is opened.

- A song is **heard** when the next play started at least 60% of its length later. A new song you hear becomes a **discovery**; a song you skip earlier is **held back** with the usual cooldown. On the first sync, your top tracks and recent plays are recorded as already known, so old favorites don't show up as discoveries.
- This is an estimate from timestamps. Spotify lists only plays of 30 seconds or more, so very early skips are not seen. A gap longer than the song plus 15 minutes (a pause or the end of a session) is left undecided rather than guessed. Spotify keeps the last 50 plays, which is plenty at a 20-minute interval.
- Spotify doesn't document whether a play's `played_at` time marks its start or its end; Side B works it out from the history itself.
- Plays already counted by Side B's own player aren't counted twice. Discoveries, holds, and blocks are stored with the account, so they match on every device; each browser's existing local history is added the first time it connects.
- Play history is kept for 30 days, then deleted.

### How users are protected

- Side B never sees Spotify passwords; people sign in on Spotify's own page.
- The server must send the refresh token back to Spotify, so it is **encrypted, not hashed**: AES-256-GCM with `TOKEN_ENCRYPTION_KEY`, which lives only in the server environment. Each token is bound to its user, so an encrypted token copied onto another account can't be decrypted. A copy of the database alone reveals no tokens.
- The session cookie is random, HttpOnly, SameSite=Lax, and Secure on HTTPS (with the `__Host-` prefix). The database stores only its SHA-256 **hash**, so a database leak can't be used to sign in. Sessions last 180 days.
- Account requests from other websites are rejected. The server serves only the app's own files, never `.env`, the database, or server code.
- **Disconnect** signs out that device; background recording continues. **Delete my Side B data** in the Spotify dialog erases the user's token, history, discoveries, and holds and stops recording. Revoking Side B in Spotify's account settings also stops it.
- When Spotify rejects a refresh token, the server erases it and asks the user to reconnect.

Listening history itself (song titles and times) is stored unencrypted so it can be queried; protect the database file and its backups accordingly.

For local development the server generates a key into the ignored `.env` file on first run, and stores the database at `data/sideb.db` (also ignored). Node.js 22.13 or later is required for the built-in SQLite module.

## Local demo

Without a Spotify connection, the app uses sample tracks and simulated playback. Saved sample mixes, likes, and discoveries are stored in the browser. The app has no build step or third-party JavaScript dependencies; Google Fonts are optional.
