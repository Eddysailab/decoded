/* ============================================================================
   DECODED - LEADERBOARD
   ----------------------------------------------------------------------------
   Local for now, seeded from data/copy.js. Architected so a shared backend
   leaderboard can replace this later: keep the same fetch/add interface and
   swap the internals for network calls.
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var KEY = DECODED.config.STORAGE_PREFIX + "leaderboard";

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    // First run: start from the seed.
    var seed = DECODED.leaderboardSeed.map(function (e) {
      return { initials: e.initials, score: e.score, seed: true };
    });
    save(seed);
    return seed;
  }

  function save(list) {
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
  }

  function sorted(list) {
    return list.slice().sort(function (a, b) { return b.score - a.score; });
  }

  DECODED.leaderboard = {
    // Returns entries sorted high to low. Async-shaped for a future backend.
    fetch: function () {
      return sorted(load());
    },

    add: function (initials, score) {
      var list = load();
      initials = (initials || "YOU").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4) || "YOU";
      var entry = { initials: initials, score: score, you: true };
      list.push(entry);
      save(list);
      return sorted(list);
    }
  };
})();
