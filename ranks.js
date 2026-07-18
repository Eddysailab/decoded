/* ============================================================================
   DECODED - RANKS and XP TARGET
   ----------------------------------------------------------------------------
   Ranks unlock by total score. "min" is the score needed to reach each rank.
   XP_TARGET fills the knowledge bar on the home screen.
   ============================================================================ */

window.DECODED = window.DECODED || {};

DECODED.ranks = [
  { name: "CURIOUS",      min: 0,   icon: "leaf" },
  { name: "AI AWARE",     min: 120, icon: "search" },
  { name: "AI LITERATE",  min: 260, icon: "book" },
  { name: "AI FLUENT",    min: 420, icon: "sparks" },
  { name: "AI DECODED",   min: 560, icon: "brain" }
];

DECODED.XP_TARGET = 660;

/* Returns the rank object for a given score. */
DECODED.rankForScore = function (score) {
  var ranks = DECODED.ranks;
  var current = ranks[0];
  for (var i = 0; i < ranks.length; i++) {
    if (score >= ranks[i].min) current = ranks[i];
  }
  return current;
};
