// Listening rules shared by the browser (window.SideBListeningRules) and the server (require).
((root, factory) => {
  const rules = factory();
  if (typeof module === "object" && module.exports) module.exports = rules;
  else root.SideBListeningRules = rules;
})(typeof self !== "undefined" ? self : globalThis, () => {
  const heardThreshold = 0.6;
  const earlySkipThreshold = 0.3;
  const dayMs = 24 * 60 * 60 * 1000;

  // Each repeat skip doubles the cooldown: 3, 6, 12, 24, then 30 days.
  function holdDaysFor(skipCount) {
    return Math.min(30, 3 * (2 ** (skipCount - 1)));
  }

  // Expired holds stay stored so repeated skips keep lengthening the cooldown.
  function isHoldActive(entry, now = Date.now()) {
    return Boolean(entry && (entry.blocked || Date.parse(entry.heldUntil) > now));
  }

  function nextHold(previous, progressRatio, now = Date.now()) {
    const skipCount = (previous?.skipCount || 0) + 1;
    const holdDays = holdDaysFor(skipCount);
    return {
      skipCount,
      holdDays,
      heldUntil: new Date(now + holdDays * dayMs).toISOString(),
      earlySkip: progressRatio < earlySkipThreshold,
      blocked: false,
      lastSkippedAt: new Date(now).toISOString()
    };
  }

  function simplify(text) {
    return String(text || "").normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  }

  // Spotify gives each release of a song (album, single, remaster, compilation) its own id. This key is
  // the same for all of them: the title without " - 2004 Remaster" style endings or "(feat. …)"-style
  // notes, plus the main artist. Remixes keep their own key, since they sound different.
  function songKey(track) {
    const title = String(track?.title || "")
      .replace(/\s+-\s+.*$/, "")
      .replace(/[([][^)\]]*\b(?:remaster(?:ed)?|version|edit|live|mono|stereo|deluxe|bonus|feat|ft|with)\b[^)\]]*[)\]]/gi, "");
    const artist = String(track?.artist || "").split(/,|&|\s(?:feat\.?|ft\.?|x)\s/i)[0];
    const key = `${simplify(title)}|${simplify(artist)}`;
    return key === "|" ? "" : key;
  }

  // A longer gap than a song's length plus this means the listener paused or stopped, so the play can't be judged.
  const breakGapMs = 15 * 60 * 1000;
  const durationMatchToleranceMs = 4000;

  // Spotify doesn't document whether played_at marks the start or the end of a play. When a song plays
  // through, the gap to its neighbour equals its length: the earlier song's if played_at is the start,
  // the later song's if it is the end. Count which pattern the history shows.
  function detectTimestampMode(plays) {
    let startMatches = 0;
    let endMatches = 0;
    for (let index = 1; index < plays.length; index += 1) {
      const gap = plays[index].playedAt - plays[index - 1].playedAt;
      if (Math.abs(gap - plays[index - 1].track.duration * 1000) <= durationMatchToleranceMs) startMatches += 1;
      if (Math.abs(gap - plays[index].track.duration * 1000) <= durationMatchToleranceMs) endMatches += 1;
    }
    return endMatches >= 5 && endMatches > startMatches * 2 ? "end" : "start";
  }

  // Decides each undecided play (oldest first) from the time until the next play, or since the previous
  // one. Plays that may still be in progress are left undecided for later.
  function classifyPlays(plays, mode, now = Date.now()) {
    const decisions = [];
    plays.forEach((play, index) => {
      if (play.outcome) return;
      const durationMs = play.track.duration * 1000;
      const neighbour = mode === "start" ? plays[index + 1] : plays[index - 1];
      if (!neighbour) {
        if (mode === "start" && now - play.playedAt < durationMs + breakGapMs) return;
        decisions.push({ play, outcome: "unknown" });
        return;
      }
      const listenedMs = Math.abs(neighbour.playedAt - play.playedAt);
      if (listenedMs > durationMs + breakGapMs) {
        decisions.push({ play, outcome: "unknown" });
        return;
      }
      const listenedRatio = Math.min(listenedMs, durationMs) / durationMs;
      decisions.push({ play, listenedRatio, outcome: listenedRatio >= heardThreshold ? "heard" : "skipped" });
    });
    return decisions;
  }

  return { heardThreshold, earlySkipThreshold, holdDaysFor, isHoldActive, nextHold, songKey, detectTimestampMode, classifyPlays };
});
