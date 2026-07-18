/* ============================================================================
   DECODED - MASCOT
   ----------------------------------------------------------------------------
   Builds the robot head as inline SVG so it can animate.
     - Ada: neon green, antenna to the upper-left ending in a round ball.
            This is the exact attached character and the official app logo.
     - Leo: cyan variant, antenna mirrored to the upper-right with a square tip,
            plus small headphone pads on the left and right of the head.

   Animations (blink, look, bob) are CSS classes defined in css/styles.css.
   Pass animate:false for a still version (used when reduced motion is on).
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var uid = 0;

  DECODED.mascotSVG = function (guideId, opts) {
    opts = opts || {};
    var g = DECODED.guides[guideId] || DECODED.guides.ada;
    var color = g.color;
    var animate = opts.animate !== false;
    var size = opts.size || 120;
    var id = "m" + (uid++);
    var isLeo = guideId === "leo";

    var bobClass = animate ? "dc-bob" : "";
    var eyesClass = animate ? "dc-eyes" : "";
    var eyeClass = animate ? "dc-eye" : "";

    // Antenna differs per guide.
    var antenna;
    if (isLeo) {
      // Upper-right stalk ending in a small square tip.
      antenna =
        '<path d="M124 58 Q138 44 143 32" stroke="' + color + '" stroke-width="9" stroke-linecap="round" fill="none"/>' +
        '<rect x="135" y="20" width="20" height="20" rx="4" fill="' + color + '" transform="rotate(12 145 30)"/>';
    } else {
      // Upper-left stalk ending in a round ball.
      antenna =
        '<path d="M76 58 Q62 44 58 32" stroke="' + color + '" stroke-width="9" stroke-linecap="round" fill="none"/>' +
        '<circle cx="55" cy="30" r="12" fill="' + color + '"/>';
    }

    // Headphone pads only on Leo.
    var pads = "";
    if (isLeo) {
      pads =
        '<rect x="20" y="96" width="16" height="36" rx="8" fill="' + g.dim + '"/>' +
        '<rect x="164" y="96" width="16" height="36" rx="8" fill="' + g.dim + '"/>';
    }

    return '' +
      '<svg class="dc-mascot" viewBox="0 0 200 210" width="' + size + '" height="' + (size * 1.05) +
        '" role="img" aria-label="' + g.name + ' the Decoded mascot" xmlns="http://www.w3.org/2000/svg">' +
        '<defs>' +
          '<radialGradient id="' + id + 'head" cx="42%" cy="34%" r="72%">' +
            '<stop offset="0%" stop-color="' + lighten(color) + '"/>' +
            '<stop offset="100%" stop-color="' + color + '"/>' +
          '</radialGradient>' +
        '</defs>' +
        '<g class="' + bobClass + '">' +
          pads +
          antenna +
          // Head
          '<circle cx="100" cy="114" r="72" fill="url(#' + id + 'head)"/>' +
          // Visor
          '<ellipse cx="100" cy="116" rx="46" ry="31" fill="#080809"/>' +
          // Eyes (wrapped for the look shift; each eye squashes for the blink)
          '<g class="' + eyesClass + '">' +
            '<circle class="' + eyeClass + '" cx="83" cy="116" r="9.5" fill="' + color + '"/>' +
            '<circle class="' + eyeClass + '" cx="117" cy="116" r="9.5" fill="' + color + '"/>' +
          '</g>' +
        '</g>' +
      '</svg>';
  };

  // Small helper to nudge a hex color lighter for the head highlight.
  function lighten(hex) {
    var c = hex.replace("#", "");
    var r = parseInt(c.substring(0, 2), 16);
    var gr = parseInt(c.substring(2, 4), 16);
    var b = parseInt(c.substring(4, 6), 16);
    r = Math.min(255, Math.round(r + (255 - r) * 0.28));
    gr = Math.min(255, Math.round(gr + (255 - gr) * 0.28));
    b = Math.min(255, Math.round(b + (255 - b) * 0.28));
    return "rgb(" + r + "," + gr + "," + b + ")";
  }
})();
