/* ============================================================================
   DECODED - SHARE CARD
   ----------------------------------------------------------------------------
   Draws a 1080x1080 shareable image on a canvas: the player's mascot, the
   DECODED wordmark, the maker tagline, score, rank, the "I decoded AI. Can you?"
   line, and where to play free. Used for the live preview, Download, and Share.
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var SIZE = 1080;

  // Renders the card onto the given canvas. Calls done() when finished
  // (mascot image loads asynchronously).
  DECODED.buildShareCard = function (canvas, data, done) {
    canvas.width = SIZE;
    canvas.height = SIZE;
    var ctx = canvas.getContext("2d");
    var guide = DECODED.guides[data.guide] || DECODED.guides.ada;

    // Background
    ctx.fillStyle = "#0B0B0C";
    ctx.fillRect(0, 0, SIZE, SIZE);

    // Panel with border
    roundRect(ctx, 60, 60, SIZE - 120, SIZE - 120, 36);
    ctx.fillStyle = "#141417";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#2A2A31";
    ctx.stroke();

    // Accent glow bar at top
    ctx.fillStyle = guide.color;
    roundRect(ctx, SIZE / 2 - 60, 96, 120, 8, 4);
    ctx.fill();

    // Draw mascot (async), then all the text.
    var svg = DECODED.mascotSVG(guide.id, { animate: false, size: 300 });
    var img = new Image();
    var svg64 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);

    img.onload = function () { paint(img); };
    img.onerror = function () { paint(null); };
    img.src = svg64;

    function paint(mascotImg) {
      if (mascotImg) {
        ctx.drawImage(mascotImg, SIZE / 2 - 150, 150, 300, 315);
      }

      ctx.textAlign = "center";

      // Wordmark
      ctx.fillStyle = guide.color;
      ctx.font = "800 120px Inter, Arial, sans-serif";
      ctx.fillText(DECODED.config.BRAND.productName, SIZE / 2, 590);

      // Maker tagline
      ctx.fillStyle = "#9A9AA3";
      ctx.font = "700 30px Inter, Arial, sans-serif";
      ctx.fillText(DECODED.config.BRAND.tagline, SIZE / 2, 636);

      // Score + rank pill
      ctx.fillStyle = "#F5F7F2";
      ctx.font = "800 78px Inter, Arial, sans-serif";
      ctx.fillText(data.score + " pts", SIZE / 2, 736);

      var rankText = data.rank;
      ctx.font = "700 40px Inter, Arial, sans-serif";
      var rw = ctx.measureText(rankText).width + 64;
      roundRect(ctx, SIZE / 2 - rw / 2, 770, rw, 72, 36);
      ctx.fillStyle = "#1C1C21";
      ctx.fill();
      ctx.strokeStyle = guide.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = guide.color;
      ctx.fillText(rankText, SIZE / 2, 819);

      // Hook line
      ctx.fillStyle = "#F5F7F2";
      ctx.font = "800 58px Inter, Arial, sans-serif";
      ctx.fillText("I decoded AI. Can you?", SIZE / 2, 928);

      // Play free line
      ctx.fillStyle = "#9A9AA3";
      ctx.font = "600 34px Inter, Arial, sans-serif";
      ctx.fillText("Play free at " + DECODED.config.SITE_URL_LABEL, SIZE / 2, 986);

      if (done) done(canvas);
    }
  };

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
})();
