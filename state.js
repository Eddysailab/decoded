/* ============================================================================
   DECODED - STATE
   ----------------------------------------------------------------------------
   All player progress lives in the browser via localStorage. This module is the
   single place that reads and writes it, so a real backend can be added later
   without touching game logic: swap the load/save internals for API calls.
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var PREFIX = DECODED.config.STORAGE_PREFIX;
  var KEY = PREFIX + "state";

  function defaults() {
    return {
      guide: null,           // "ada" | "leo"
      score: 0,
      streak: 0,             // current streak, resets only on a wrong answer
      bestStreak: 0,
      completed: [],         // array of level nums finished
      unlockedGlossary: [],  // array of glossary ids
      email: null,           // captured email (local copy)
      certificateSeen: false,
      theme: "dark",         // "dark" | "light"
      user: null             // signed-in Google user (when sign-in is enabled)
    };
  }

  var state = load();

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      var parsed = JSON.parse(raw);
      var base = defaults();
      for (var k in base) {
        if (parsed[k] !== undefined) base[k] = parsed[k];
      }
      return base;
    } catch (e) {
      return defaults();
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) { /* storage may be full or blocked; game still runs in memory */ }
  }

  DECODED.state = {
    get: function () { return state; },

    setGuide: function (id) { state.guide = id; save(); },

    addScore: function (n) { state.score += n; save(); return state.score; },

    // Streak increases on each correct answer and resets only on a wrong one.
    bumpStreak: function () {
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      save();
      return state.streak;
    },
    resetStreak: function () { state.streak = 0; save(); },

    isCompleted: function (num) { return state.completed.indexOf(num) !== -1; },

    completeLevel: function (num, glossaryId) {
      if (state.completed.indexOf(num) === -1) state.completed.push(num);
      if (glossaryId && state.unlockedGlossary.indexOf(glossaryId) === -1) {
        state.unlockedGlossary.push(glossaryId);
      }
      save();
    },

    // A level is unlocked if it is level 1, already done, or the previous is done.
    isUnlocked: function (num) {
      if (num <= 1) return true;
      if (this.isCompleted(num)) return true;
      return this.isCompleted(num - 1);
    },

    setEmail: function (email) { state.email = email; save(); },

    setTheme: function (theme) { state.theme = theme; save(); },

    setUser: function (user) { state.user = user; save(); },
    clearUser: function () { state.user = null; save(); },

    markCertificateSeen: function () { state.certificateSeen = true; save(); },

    // Reset progress and score, but keep the player's account and theme choice.
    reset: function () {
      var keepTheme = state.theme, keepUser = state.user;
      state = defaults();
      state.theme = keepTheme;
      state.user = keepUser;
      save();
    }
  };
})();
