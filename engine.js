/* ============================================================================
   DECODED - ENGINE (the 11 mini-games)
   ----------------------------------------------------------------------------
   Each mechanic renders itself into a container and reports progress through a
   shared "round" context (ctx) provided by app.js:
     ctx.correct(basePoints, anchorEl)  -> awards points with streak logic
     ctx.wrong()                        -> resets the streak
     ctx.award(points, anchorEl)        -> flat bonus, no streak change
     ctx.finish()                       -> the mini-game is done; show the reveal
   Adding a new level type means adding one function to DECODED.mechanics.
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var el = DECODED.dom.el;
  var clear = DECODED.dom.clear;
  var icon = DECODED.icon;

  // Small inline feedback marker (check / cross) that reads with the text.
  function fbMark(good) {
    return '<span class="fb-mark">' + icon(good ? "check-circle" : "xmark-circle") + '</span> ';
  }

  DECODED.mechanics = {};

  /* ======================================================================
     Shared: a step-by-step quiz used by several levels
     (sort-binary, true-false, judge-scenarios, multiple-choice).
     `questions` is a normalized list: { prompt, options:[{key,label,icon}],
     correct, why }.
  ====================================================================== */
  function runQuiz(container, ctx, level, questions) {
    var i = 0, correctCount = 0;
    var stage = el("div", "quiz-stage");
    container.appendChild(stage);

    function progressText() {
      return "Question " + (i + 1) + " of " + questions.length;
    }

    function renderQuestion() {
      clear(stage);
      var q = questions[i];

      var card = el("div", "card fade-up");
      card.appendChild(el("div", "quiz-count", progressText()));
      card.appendChild(el("div", "quiz-prompt", q.prompt));

      var opts = el("div", "options");
      var buttons = [];
      q.options.forEach(function (opt) {
        var btn = el("button", "option-btn", null, {
          type: "button",
          "aria-label": opt.plain || opt.label
        });
        btn.appendChild(el("span", "opt-icon", opt.icon ? DECODED.icon(opt.icon) : ""));
        btn.appendChild(el("span", "opt-label", opt.label));
        btn.addEventListener("click", function () { choose(opt.key, btn, buttons, q); });
        buttons.push(btn);
        opts.appendChild(btn);
      });
      card.appendChild(opts);

      var feedback = el("div", "feedback", "", { "aria-live": "polite" });
      card.appendChild(feedback);

      stage.appendChild(card);
      DECODED.dom.stagger(buttons, 55);
    }

    function choose(key, btn, buttons, q) {
      buttons.forEach(function (b) { b.disabled = true; });
      var feedback = stage.querySelector(".feedback");
      var right = key === q.correct;

      if (right) {
        btn.classList.add("correct");
        correctCount++;
        ctx.correct(level.points, btn);
      } else {
        btn.classList.add("wrong");
        ctx.wrong();
        // Also highlight the correct one.
        buttons.forEach(function (b) {
          if (b.getAttribute("data-key") === q.correct) b.classList.add("correct");
        });
        var correctBtn = buttons[keyIndex(q, q.correct)];
        if (correctBtn) correctBtn.classList.add("correct");
      }

      feedback.className = "feedback show " + (right ? "good" : "bad");
      feedback.innerHTML =
        '<div class="fb-head">' + fbMark(right) + (right ? "Nice" : "Not quite") + '</div>' +
        '<div class="fb-why">' + q.why + '</div>';

      var last = i === questions.length - 1;
      var next = el("button", "btn primary next-btn",
        last ? "See what this means" : "Continue", { type: "button" });
      next.addEventListener("click", function () {
        if (last) { ctx.finish({ correct: correctCount, total: questions.length }); }
        else { i++; renderQuestion(); }
      });
      feedback.appendChild(next);
      next.focus();
    }

    function keyIndex(q, key) {
      for (var k = 0; k < q.options.length; k++) {
        if (q.options[k].key === key) return k;
      }
      return -1;
    }

    // Tag buttons with their key so we can find the correct one after a wrong pick.
    var origRender = renderQuestion;
    renderQuestion = function () {
      origRender();
      var btns = stage.querySelectorAll(".option-btn");
      var q = questions[i];
      for (var k = 0; k < btns.length; k++) btns[k].setAttribute("data-key", q.options[k].key);
    };

    renderQuestion();
  }

  /* ---------- LEVEL 1: sort-binary ---------- */
  DECODED.mechanics["sort-binary"] = function (level, container, ctx) {
    var questions = level.items.map(function (item) {
      return {
        prompt: '<span class="big-icon">' + icon(item.icon, { size: 52 }) + '</span>' +
                '<span class="prompt-label">' + item.label + '</span>',
        options: level.options,
        correct: item.answer,
        why: item.why
      };
    });
    runQuiz(container, ctx, level, questions);
  };

  /* ---------- LEVEL 4: true-false ---------- */
  DECODED.mechanics["true-false"] = function (level, container, ctx) {
    var questions = level.statements.map(function (s) {
      return {
        prompt: '<span class="statement">' + s.text + '</span>',
        options: level.options,
        correct: s.answer,
        why: s.why
      };
    });
    runQuiz(container, ctx, level, questions);
  };

  /* ---------- LEVEL 8: judge-scenarios ---------- */
  DECODED.mechanics["judge-scenarios"] = function (level, container, ctx) {
    var questions = level.scenarios.map(function (s) {
      return {
        prompt: '<span class="statement">' + s.text + '</span>',
        options: level.options,
        correct: s.answer,
        why: s.why
      };
    });
    runQuiz(container, ctx, level, questions);
  };

  /* ---------- LEVELS 9,10,11: multiple-choice ---------- */
  DECODED.mechanics["multiple-choice"] = function (level, container, ctx) {
    var questions = level.questions.map(function (q) {
      return {
        prompt: '<span class="statement">' + q.scenario + '</span>',
        options: q.options.map(function (label, idx) {
          return { key: String(idx), label: label, icon: "nav-arrow-right", plain: label };
        }),
        correct: String(q.answer),
        why: q.why
      };
    });
    runQuiz(container, ctx, level, questions);
  };

  /* ---------- LEVEL 2: train-model ---------- */
  DECODED.mechanics["train-model"] = function (level, container, ctx) {
    var i = 0, correctCount = 0;
    var stage = el("div", "quiz-stage");
    container.appendChild(stage);

    function renderLabel() {
      clear(stage);
      var item = level.training[i];
      var card = el("div", "card fade-up");
      card.appendChild(el("div", "quiz-count", "Training example " + (i + 1) + " of " + level.training.length));
      card.appendChild(el("div", "quiz-prompt", '<span class="big-icon">' + icon(item.icon, { size: 52 }) + '</span><span class="prompt-label">What is this?</span>'));

      var opts = el("div", "options");
      var buttons = [];
      level.labels.forEach(function (lab) {
        var btn = el("button", "option-btn", null, { type: "button" });
        btn.appendChild(el("span", "opt-icon", icon(lab.icon)));
        btn.appendChild(el("span", "opt-label", lab.label));
        btn.addEventListener("click", function () { pick(lab.key, btn, buttons, item); });
        buttons.push(btn);
        opts.appendChild(btn);
      });
      card.appendChild(opts);
      card.appendChild(el("div", "feedback", "", { "aria-live": "polite" }));
      stage.appendChild(card);
      DECODED.dom.stagger(buttons, 55);
    }

    function pick(key, btn, buttons, item) {
      buttons.forEach(function (b) { b.disabled = true; });
      var right = key === item.truth;
      var feedback = stage.querySelector(".feedback");
      if (right) { btn.classList.add("correct"); correctCount++; ctx.correct(level.points, btn); }
      else { btn.classList.add("wrong"); ctx.wrong(); }

      feedback.className = "feedback show " + (right ? "good" : "bad");
      feedback.innerHTML = '<div class="fb-head">' + fbMark(right) + (right ? "Labeled" : "Mislabeled") + '</div>' +
        '<div class="fb-why">' + (right ? "Clean label. That is good training data." : "A wrong label teaches the model the wrong thing.") + '</div>';

      var last = i === level.training.length - 1;
      var next = el("button", "btn primary next-btn", last ? "Test the model" : "Next example", { type: "button" });
      next.addEventListener("click", function () { if (last) runTest(); else { i++; renderLabel(); } });
      feedback.appendChild(next);
      next.focus();
    }

    function runTest() {
      clear(stage);
      var accuracy = correctCount / level.training.length;
      var numRight = Math.round(level.testing.length * accuracy);
      var card = el("div", "card fade-up");
      card.appendChild(el("div", "quiz-count", "Your model takes the test"));
      card.appendChild(el("div", "quiz-prompt",
        '<span class="prompt-label">You labeled ' + correctCount + ' of ' + level.training.length +
        ' correctly. Here is how well the model learned.</span>'));

      var grid = el("div", "test-grid");
      card.appendChild(grid);
      stage.appendChild(card);

      // Decide which test items the model gets right (first numRight get correct predictions).
      var results = level.testing.map(function (t, idx) {
        return { item: t, modelRight: idx < numRight };
      });

      var done = el("div", "feedback", "", { "aria-live": "polite" });
      card.appendChild(done);

      // The "other" label for a wrong prediction (works for any two labels).
      function otherLabel(truth) {
        var o = level.labels.filter(function (l) { return l.key !== truth; })[0];
        return o ? o.key : truth;
      }

      var d = 0;
      results.forEach(function (r, idx) {
        setTimeout(function () {
          var pred = r.modelRight ? r.item.truth : otherLabel(r.item.truth);
          var predLabel = level.labels.filter(function (l) { return l.key === pred; })[0];
          var cell = el("div", "test-cell pop-in " + (r.modelRight ? "good" : "bad"));
          cell.innerHTML = '<span class="big-icon">' + icon(r.item.icon, { size: 40 }) + '</span>' +
            '<span class="test-pred">Model says: ' + predLabel.label + '</span>' +
            '<span class="test-mark">' + icon(r.modelRight ? "check-circle" : "xmark-circle", { size: 20 }) + '</span>';
          grid.appendChild(cell);
          if (idx === results.length - 1) {
            done.className = "feedback show " + (accuracy >= 0.75 ? "good" : "bad");
            done.innerHTML = '<div class="fb-head">Model accuracy: ' + Math.round(accuracy * 100) + '%</div>' +
              '<div class="fb-why">' + (accuracy >= 0.75
                ? "Clean labels, sharp model. This is what good data buys you."
                : "Messy labels, shaky model. The data, not the model, was the problem.") + '</div>';
            var next = el("button", "btn primary next-btn", "See what this means", { type: "button" });
            next.addEventListener("click", function () { ctx.finish({ correct: correctCount, total: level.training.length }); });
            done.appendChild(next);
            next.focus();
          }
        }, d);
        d += 650;
      });
    }

    renderLabel();
  };

  /* ---------- LEVEL 3: next-word ---------- */
  DECODED.mechanics["next-word"] = function (level, container, ctx) {
    var i = 0, matchCount = 0;
    var stage = el("div", "quiz-stage");
    container.appendChild(stage);

    function render() {
      clear(stage);
      var round = level.rounds[i];
      var top = round.options.slice().sort(function (a, b) { return b.p - a.p; })[0].word;

      var card = el("div", "card fade-up");
      card.appendChild(el("div", "quiz-count", "Sentence " + (i + 1) + " of " + level.rounds.length));
      card.appendChild(el("div", "quiz-prompt",
        '<span class="statement">' + round.stub.replace("___", '<span class="blank">?</span>') + '</span>'));

      var opts = el("div", "options word-options");
      var buttons = [];
      round.options.forEach(function (o) {
        var btn = el("button", "option-btn word-btn", '<span class="opt-label">' + o.word + '</span>', { type: "button" });
        btn.addEventListener("click", function () { pick(o.word, top, round, buttons, card); });
        buttons.push(btn);
        opts.appendChild(btn);
      });
      card.appendChild(opts);
      card.appendChild(el("div", "feedback", "", { "aria-live": "polite" }));
      stage.appendChild(card);
      DECODED.dom.stagger(buttons, 55);
    }

    function pick(word, top, round, buttons, card) {
      buttons.forEach(function (b) { b.disabled = true; });
      var matched = word === top;
      if (matched) { matchCount++; ctx.correct(level.points, card); } else ctx.wrong();

      // Reveal probability bars.
      var bars = el("div", "prob-bars");
      round.options.slice().sort(function (a, b) { return b.p - a.p; }).forEach(function (o) {
        var row = el("div", "prob-row" + (o.word === top ? " top" : "") + (o.word === word ? " picked" : ""));
        row.innerHTML = '<span class="prob-word">' + o.word + (o.word === word ? ' <span class="you-pick">you</span>' : "") + '</span>' +
          '<span class="prob-track"><span class="prob-fill" style="width:0%"></span></span>' +
          '<span class="prob-pct">' + Math.round(o.p * 100) + '%</span>';
        bars.appendChild(row);
        setTimeout(function () {
          row.querySelector(".prob-fill").style.width = Math.round(o.p * 100) + "%";
        }, 30);
      });
      card.appendChild(bars);

      var feedback = card.querySelector(".feedback");
      feedback.className = "feedback show " + (matched ? "good" : "bad");
      feedback.innerHTML = '<div class="fb-head">' + fbMark(matched) + (matched ? "You matched the AI" : "AI went with " + top) + '</div>' +
        '<div class="fb-why">The AI leans toward the highest bar. You picked ' + word + '.</div>';

      var last = i === level.rounds.length - 1;
      var next = el("button", "btn primary next-btn", last ? "See what this means" : "Next sentence", { type: "button" });
      next.addEventListener("click", function () { if (last) ctx.finish({ correct: matchCount, total: level.rounds.length }); else { i++; render(); } });
      feedback.appendChild(next);
      next.focus();
    }

    render();
  };

  /* ---------- LEVEL 5: prompt-upgrade ---------- */
  DECODED.mechanics["prompt-upgrade"] = function (level, container, ctx) {
    var awarded = {};   // which upgrades already earned points
    var active = {};    // which upgrades are currently on
    var bonusGiven = false;

    var card = el("div", "card fade-up");
    card.appendChild(el("div", "quiz-count", "Upgrade the prompt"));

    // Live preview
    var preview = el("div", "prompt-preview");
    card.appendChild(preview);

    // Quality meter
    var meterWrap = el("div", "meter-wrap");
    meterWrap.innerHTML = '<div class="meter-label"><span>Prompt quality</span><span class="meter-count">0 of 4 upgrades</span></div>' +
      '<div class="meter-track"><span class="meter-fill" style="width:8%"></span></div>';
    card.appendChild(meterWrap);

    // Chips
    var chips = el("div", "chips");
    var chipButtons = [];
    level.upgrades.forEach(function (up) {
      var btn = el("button", "chip", null, { type: "button", "aria-pressed": "false" });
      btn.appendChild(el("span", "chip-icon", icon(up.icon)));
      btn.appendChild(el("span", "chip-text", up.chip));
      btn.addEventListener("click", function () { toggle(up, btn); });
      chipButtons.push(btn);
      chips.appendChild(btn);
    });
    card.appendChild(chips);

    var feedback = el("div", "feedback", "", { "aria-live": "polite" });
    card.appendChild(feedback);

    container.appendChild(card);
    DECODED.dom.stagger(chipButtons, 60);
    renderPreview();

    function toggle(up, btn) {
      active[up.key] = !active[up.key];
      btn.classList.toggle("on", active[up.key]);
      btn.setAttribute("aria-pressed", active[up.key] ? "true" : "false");

      if (active[up.key] && !awarded[up.key]) {
        awarded[up.key] = true;
        ctx.correct(level.points, btn);
      }
      renderPreview();
      checkComplete();
    }

    function renderPreview() {
      var lines = ['<span class="pp-base">' + level.basePrompt + '</span>'];
      level.upgrades.forEach(function (up) {
        if (active[up.key]) lines.push('<span class="pp-add">' + up.text + '</span>');
      });
      preview.innerHTML = lines.join("");

      var count = level.upgrades.filter(function (u) { return active[u.key]; }).length;
      meterWrap.querySelector(".meter-count").textContent = count + " of 4 upgrades";
      meterWrap.querySelector(".meter-fill").style.width = (8 + (count / 4) * 92) + "%";
    }

    function checkComplete() {
      var allOn = level.upgrades.every(function (u) { return active[u.key]; });
      if (allOn && !bonusGiven) {
        bonusGiven = true;
        ctx.award(level.completionBonus, meterWrap);
        feedback.className = "feedback show good";
        feedback.innerHTML = '<div class="fb-head">' + fbMark(true) + 'Four of four. Prompt maxed out.</div>' +
          '<div class="fb-why">Plus a ' + level.completionBonus + ' point bonus for the full upgrade.</div>';
        var next = el("button", "btn primary next-btn", "See what this means", { type: "button" });
        next.addEventListener("click", function () { ctx.finish(); });
        feedback.appendChild(next);
        next.focus();
      }
    }
  };

  /* ---------- LEVEL 6: agent-tools ---------- */
  DECODED.mechanics["agent-tools"] = function (level, container, ctx) {
    var equipped = {};

    var card = el("div", "card fade-up");
    card.appendChild(el("div", "quiz-count", "The goal"));
    card.appendChild(el("div", "goal-box", '<span class="goal-icon">' + icon("star") + '</span>' + level.goal));

    var toolWrap = el("div", "tool-grid");
    var toolButtons = [];
    level.tools.forEach(function (t) {
      var btn = el("button", "tool-btn", null, { type: "button", "aria-pressed": "false" });
      btn.appendChild(el("span", "tool-icon", icon(t.icon, { size: 28 })));
      btn.appendChild(el("span", "tool-label", t.label));
      btn.addEventListener("click", function () {
        equipped[t.key] = !equipped[t.key];
        btn.classList.toggle("on", equipped[t.key]);
        btn.setAttribute("aria-pressed", equipped[t.key] ? "true" : "false");
      });
      toolButtons.push(btn);
      toolWrap.appendChild(btn);
    });
    card.appendChild(el("div", "tool-hint", "Equip the tools your agent needs, then run it."));
    card.appendChild(toolWrap);

    var runBtn = el("button", "btn primary run-btn", '<span class="btn-ic">' + icon("play") + '</span>Run agent', { type: "button" });
    card.appendChild(runBtn);

    var log = el("div", "agent-log", "", { "aria-live": "polite" });
    card.appendChild(log);

    var feedback = el("div", "feedback", "", { "aria-live": "polite" });
    card.appendChild(feedback);

    container.appendChild(card);
    DECODED.dom.stagger(toolButtons, 60);

    runBtn.addEventListener("click", run);

    function run() {
      clear(log);
      clear(feedback);
      feedback.className = "feedback";
      runBtn.disabled = true;

      var extraCalc = equipped.calculator;
      var lines = level.steps.map(function (s) {
        return { text: equipped[s.need] ? s.ok : s.fail, ok: !!equipped[s.need] };
      });

      var d = 0;
      lines.forEach(function (ln, idx) {
        setTimeout(function () {
          var row = el("div", "log-line pop-in " + (ln.ok ? "ok" : "stall"));
          row.innerHTML = '<span class="log-mark">' + icon(ln.ok ? "check-circle" : "xmark-circle", { size: 18 }) + '</span>' + ln.text;
          log.appendChild(row);
          if (idx === lines.length - 1) finishRun(lines, extraCalc);
        }, d);
        d += 700;
      });
    }

    function finishRun(lines, extraCalc) {
      var allOk = lines.every(function (l) { return l.ok; });
      var perfectKit = allOk && !extraCalc;

      if (extraCalc) {
        var calcRow = el("div", "log-line stall pop-in",
          '<span class="log-mark">' + icon("xmark-circle", { size: 18 }) + '</span>Calculator sat unused. This task never needed it.');
        log.appendChild(calcRow);
      }

      if (perfectKit) {
        ctx.award(level.bonus, runBtn);
        feedback.className = "feedback show good";
        feedback.innerHTML = '<div class="fb-head">' + fbMark(true) + 'Goal complete. Perfect kit.</div>' +
          '<div class="fb-why">Search, Calendar, and Email, nothing wasted. Plus a ' + level.bonus + ' point bonus.</div>';
        var next = el("button", "btn primary next-btn", "See what this means", { type: "button" });
        next.addEventListener("click", function () { ctx.finish(); });
        feedback.appendChild(next);
        next.focus();
      } else {
        ctx.wrong();
        feedback.className = "feedback show bad";
        feedback.innerHTML = '<div class="fb-head">' + fbMark(false) + 'Not quite the right kit</div>' +
          '<div class="fb-why">' + (extraCalc
            ? "Drop the Calculator and make sure Search, Calendar, and Email are all on."
            : "Your agent stalled. Give it every tool the goal needs, then run again.") + '</div>';
        runBtn.disabled = false;
        runBtn.innerHTML = '<span class="btn-ic">' + icon("refresh-double") + '</span>Run again';
        runBtn.focus();
      }
    }
  };

  /* ---------- LEVEL 7: order-steps ---------- */
  DECODED.mechanics["order-steps"] = function (level, container, ctx) {
    var target = level.steps.slice().sort(function (a, b) { return a.order - b.order; });
    var pool = shuffle(level.steps.slice());
    // Avoid an accidentally-correct starting shuffle.
    if (isSorted(pool)) pool = shuffle(pool.slice());
    var placed = [];

    var card = el("div", "card fade-up");
    card.appendChild(el("div", "quiz-count", "Put the steps in order"));
    card.appendChild(el("div", "order-hint", "Tap the steps in the order they should happen, top to bottom."));

    var slots = el("ol", "order-slots");
    card.appendChild(slots);

    var poolWrap = el("div", "order-pool");
    card.appendChild(poolWrap);

    var actions = el("div", "order-actions");
    var resetBtn = el("button", "btn ghost", "Reset", { type: "button" });
    actions.appendChild(resetBtn);
    card.appendChild(actions);

    var feedback = el("div", "feedback", "", { "aria-live": "polite" });
    card.appendChild(feedback);

    container.appendChild(card);
    resetBtn.addEventListener("click", reset);
    renderPool();
    renderSlots();

    function renderPool() {
      clear(poolWrap);
      var buttons = [];
      pool.forEach(function (step) {
        if (placed.indexOf(step) !== -1) return;
        var btn = el("button", "step-chip", '<span class="step-icon">' + icon(step.icon, { size: 22 }) + '</span>' + step.text, { type: "button" });
        btn.addEventListener("click", function () { place(step); });
        buttons.push(btn);
        poolWrap.appendChild(btn);
      });
      DECODED.dom.stagger(buttons, 50);
    }

    function renderSlots() {
      clear(slots);
      for (var s = 0; s < target.length; s++) {
        var li = el("li", "order-slot");
        if (placed[s]) {
          li.classList.add("filled");
          li.innerHTML = '<span class="slot-num">' + (s + 1) + '</span>' +
            '<span class="step-icon">' + icon(placed[s].icon, { size: 22 }) + '</span>' + placed[s].text;
        } else {
          li.innerHTML = '<span class="slot-num">' + (s + 1) + '</span><span class="slot-empty">Tap a step below</span>';
        }
        slots.appendChild(li);
      }
    }

    function place(step) {
      placed.push(step);
      renderPool();
      renderSlots();
      if (placed.length === target.length) check();
    }

    function reset() {
      placed = [];
      feedback.className = "feedback";
      feedback.innerHTML = "";
      renderPool();
      renderSlots();
    }

    function check() {
      var correct = 0;
      var lis = slots.querySelectorAll(".order-slot");
      for (var s = 0; s < target.length; s++) {
        var right = placed[s].order === target[s].order;
        if (right) { correct++; lis[s].classList.add("good"); }
        else { lis[s].classList.add("bad"); }
      }
      if (correct > 0) ctx.correct(level.points * correct, slots); else ctx.wrong();

      feedback.className = "feedback show " + (correct === target.length ? "good" : "bad");
      feedback.innerHTML = '<div class="fb-head">' + fbMark(correct === target.length) + (correct === target.length
        ? "Perfect order" : "You placed " + correct + " of " + target.length + " correctly") + '</div>' +
        '<div class="fb-why">The right flow is: describe, AI writes, run it, then refine.</div>';

      var next = el("button", "btn primary next-btn", "See what this means", { type: "button" });
      next.addEventListener("click", function () { ctx.finish({ correct: correct, total: target.length }); });
      feedback.appendChild(next);
      resetBtn.disabled = true;
      next.focus();
    }
  };

  /* -------------------------- small utilities -------------------------- */
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function isSorted(arr) {
    for (var i = 1; i < arr.length; i++) if (arr[i].order < arr[i - 1].order) return false;
    return true;
  }
})();
