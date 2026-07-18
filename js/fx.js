/* ============================================================================
   DECODED - FX (atmosphere and feedback)
   ----------------------------------------------------------------------------
   - Moving-code background: faint pseudo-code drifting upward.
   - Confetti burst on level completion.
   - Floating "+points" burst on correct answers.
   All of it respects prefers-reduced-motion (see DECODED.reducedMotion).
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {

  DECODED.reducedMotion = function () {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) { return false; }
  };

  /* ---------------------------- Moving code bg ---------------------------- */
  var CODE_SNIPPETS = [
    "model.fit(train_data, labels)",
    "if confidence < 0.7: verify()",
    "def predict(next_word): ...",
    "agent.use(tool='search')",
    "for example in dataset:",
    "prompt = role + task + format",
    "loss = cross_entropy(y, y_hat)",
    "while learning: improve()",
    "tokens = encode(sentence)",
    "return most_likely(options)",
    "data = clean(raw_examples)",
    "weights += learning_rate * grad",
    "response = llm.generate(prompt)",
    "review(output)  # always",
    "risk = bias or misuse",
    "value = leverage.aim(goal)"
  ];

  DECODED.initBackground = function () {
    var host = document.getElementById("bg-code");
    if (!host) return;
    if (DECODED.reducedMotion()) { host.innerHTML = ""; return; }

    var count = window.innerWidth < 640 ? 14 : 26;
    var html = "";
    for (var i = 0; i < count; i++) {
      var text = CODE_SNIPPETS[i % CODE_SNIPPETS.length];
      var left = Math.round(Math.random() * 96);
      var dur = 16 + Math.random() * 20;
      var delay = -Math.random() * dur;
      var size = 11 + Math.random() * 5;
      html += '<span class="bg-line" style="left:' + left + '%;' +
              'animation-duration:' + dur.toFixed(1) + 's;' +
              'animation-delay:' + delay.toFixed(1) + 's;' +
              'font-size:' + size.toFixed(0) + 'px;">' + text + '</span>';
    }
    host.innerHTML = html;
  };

  /* ------------------------------ Confetti ------------------------------- */
  DECODED.confetti = function () {
    if (DECODED.reducedMotion()) return;
    var colors = ["#C6FF3A", "#3AE8FF", "#FFB13A", "#F5F7F2", "#8FBE1F"];
    var layer = document.createElement("div");
    layer.className = "confetti-layer";
    document.body.appendChild(layer);
    var n = 90;
    for (var i = 0; i < n; i++) {
      var p = document.createElement("i");
      p.className = "confetti-bit";
      p.style.left = Math.random() * 100 + "vw";
      p.style.background = colors[i % colors.length];
      p.style.animationDuration = (1.6 + Math.random() * 1.4) + "s";
      p.style.animationDelay = (Math.random() * 0.3) + "s";
      p.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      p.style.width = (6 + Math.random() * 6) + "px";
      p.style.height = (8 + Math.random() * 8) + "px";
      layer.appendChild(p);
    }
    setTimeout(function () { layer.remove(); }, 3400);
  };

  /* --------------------------- Floating points --------------------------- */
  // Shows a "+N" burst near an element (or at given page coords).
  DECODED.floatPoints = function (text, anchorEl) {
    var burst = document.createElement("div");
    burst.className = "points-burst";
    burst.textContent = text;
    var x = window.innerWidth / 2, y = window.innerHeight / 2;
    if (anchorEl && anchorEl.getBoundingClientRect) {
      var r = anchorEl.getBoundingClientRect();
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    burst.style.left = x + "px";
    burst.style.top = y + "px";
    document.body.appendChild(burst);
    setTimeout(function () { burst.remove(); }, 1100);
  };
})();
