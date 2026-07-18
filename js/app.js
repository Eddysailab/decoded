/* ============================================================================
   DECODED - APP
   ----------------------------------------------------------------------------
   Screen flow, HUD, per-level scoring context, reveals, certificate,
   leaderboard, and growth features. This is the orchestration layer; the
   mini-games themselves live in engine.js and the content in js/data/*.
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var el = DECODED.dom.el;
  var clear = DECODED.dom.clear;
  var S = DECODED.state;
  var icon = DECODED.icon;

  // Leading icon: sits inside a button/label, before its text.
  function ic(name, size) { return '<span class="ui-ic">' + icon(name, { size: size || 18 }) + '</span>'; }
  // Trailing icon: after the text.
  function ic2(name, size) { return '<span class="ui-ic ui-ic-r">' + icon(name, { size: size || 18 }) + '</span>'; }

  var root, hud;

  DECODED.app = {
    init: function () {
      root = document.getElementById("screen");
      hud = document.getElementById("hud");
      applyTheme(S.get().theme);
      wireThemeToggle();
      DECODED.initBackground();
      renderHeader();
      var st = S.get();
      // When Google sign-in is required, gate everything behind it.
      if (DECODED.auth.isRequired() && !DECODED.auth.getUser()) {
        screenSignIn();
      } else if (!st.guide) {
        screenSplash();
      } else {
        screenHome();
      }
      updateHud();
    }
  };

  // Where to go once the player is signed in (or when no sign-in is needed).
  function enterGame() {
    renderHeader();
    updateHud();
    if (!S.get().guide) screenSplash();
    else screenHome();
  }

  /* ------------------------------ Theme --------------------------------- */
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("theme-toggle");
    if (btn) {
      // Show the icon for the theme you would switch TO.
      var toDark = theme === "light";
      btn.innerHTML = icon(toDark ? "half-moon" : "sun-light", { size: 20 });
      btn.setAttribute("aria-label", toDark ? "Switch to dark theme" : "Switch to light theme");
    }
  }
  function wireThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var next = S.get().theme === "dark" ? "light" : "dark";
      S.setTheme(next);
      applyTheme(next);
    });
  }

  /* ------------------------------ Header -------------------------------- */
  function renderHeader() {
    var header = document.getElementById("brandbar");
    clear(header);
    // Header logo is always Ada (green).
    var logo = el("a", "brand", null, { href: "#", "aria-label": "Decoded home" });
    logo.innerHTML = '<span class="brand-mascot">' +
      DECODED.mascotSVG("ada", { size: 40, animate: !DECODED.reducedMotion() }) + '</span>' +
      '<span class="brand-word">' + DECODED.config.BRAND.productName + '</span>';
    logo.addEventListener("click", function (e) {
      e.preventDefault();
      if (S.get().guide) screenHome(); else screenSplash();
    });
    header.appendChild(logo);
    renderAccount();
  }

  // The signed-in player's chip (avatar + sign out). Only shows when signed in.
  function renderAccount() {
    var box = document.getElementById("account");
    if (!box) return;
    clear(box);
    var user = DECODED.auth.getUser();
    if (!user) { box.hidden = true; return; }
    box.hidden = false;

    var chip = el("button", "account-chip", null, {
      type: "button",
      title: "Signed in as " + user.name + ". Click to sign out.",
      "aria-label": "Signed in as " + user.name + ". Click to sign out."
    });
    var avatar = user.picture
      ? '<img class="account-avatar" src="' + user.picture + '" alt="" referrerpolicy="no-referrer">'
      : '<span class="account-avatar account-initial">' + (user.firstName || "?").charAt(0).toUpperCase() + '</span>';
    chip.innerHTML = avatar + '<span class="account-name">' + user.firstName + '</span>';
    chip.addEventListener("click", function () {
      if (confirm("Sign out of Decoded?")) {
        DECODED.auth.signOut();
        renderHeader();
        updateHud();
        if (DECODED.auth.isRequired()) screenSignIn();
        else if (S.get().guide) screenHome();
        else screenSplash();
      }
    });
    box.appendChild(chip);
  }

  /* ------------------------------ Sign in ------------------------------- */
  function screenSignIn() {
    clear(root);
    hud.hidden = true;
    var box = document.getElementById("account");
    if (box) { clear(box); box.hidden = true; }

    var name = DECODED.config.BRAND.productName;
    var wrap = el("div", "screen-center fade-up");
    wrap.innerHTML =
      '<div class="hero-mascot">' + DECODED.mascotSVG("ada", { size: 160, animate: !DECODED.reducedMotion() }) + '</div>' +
      '<h1 class="wordmark glitch" data-text="' + name + '">' + name + '</h1>' +
      '<div class="wordmark-sub">' + DECODED.config.BRAND.tagline + '</div>' +
      '<p class="lead">Create your free account to start playing. Your progress is saved to you.</p>';

    var btnWrap = el("div", "auth-btn-wrap");
    btnWrap.innerHTML = '<div class="auth-loading">Loading sign-in...</div>';
    wrap.appendChild(btnWrap);

    wrap.appendChild(el("p", "auth-note",
      "We use Google so you never need another password. We only see your name and email, and only use them to save your progress."));

    root.appendChild(wrap);

    DECODED.auth.renderButton(btnWrap, function () {
      enterGame();
    });
  }

  /* -------------------------------- HUD --------------------------------- */
  function updateHud() {
    var st = S.get();
    if (!st.guide) { hud.hidden = true; return; }
    hud.hidden = false;
    clear(hud);
    hud.appendChild(el("span", "hud-item", ic("star") + st.score, { title: "Score" }));
    if (st.streak >= 2) {
      hud.appendChild(el("span", "hud-item flame", ic("fire-flame") + st.streak, { title: "Streak" }));
    }
    hud.appendChild(el("span", "hud-item", ic("check-circle") + st.completed.length + " / " + DECODED.levels.length, { title: "Levels done" }));
  }

  /* --------------------- Per-level scoring context ---------------------- */
  function makeContext(level, onFinish) {
    return {
      correct: function (basePoints, anchorEl) {
        var streak = S.bumpStreak();
        var pts = streak >= 3 ? Math.round(basePoints * 1.5) : basePoints;
        S.addScore(pts);
        DECODED.floatPoints("+" + pts, anchorEl);
        updateHud();
        return pts;
      },
      wrong: function () {
        S.resetStreak();
        updateHud();
      },
      award: function (points, anchorEl) {
        S.addScore(points);
        DECODED.floatPoints("+" + points, anchorEl);
        updateHud();
      },
      // result is optional: { correct, total }. Used to decide pass/fail.
      finish: function (result) { onFinish(result); }
    };
  }

  /* ------------------------------ Splash -------------------------------- */
  function screenSplash() {
    clear(root);
    hud.hidden = true;
    var wrap = el("div", "screen-center fade-up");
    wrap.innerHTML =
      '<div class="hero-mascot">' + DECODED.mascotSVG("ada", { size: 180, animate: !DECODED.reducedMotion() }) + '</div>' +
      '<h1 class="wordmark glitch" data-text="' + DECODED.config.BRAND.productName + '">' + DECODED.config.BRAND.productName + '</h1>' +
      '<div class="wordmark-sub">' + DECODED.config.BRAND.tagline + '</div>' +
      '<p class="lead">' + DECODED.copy.splashIntro + '</p>';
    var start = el("button", "btn primary big", "Start", { type: "button" });
    start.addEventListener("click", screenGuidePicker);
    wrap.appendChild(start);
    root.appendChild(wrap);
    start.focus();
  }

  /* --------------------------- Guide picker ----------------------------- */
  function screenGuidePicker() {
    clear(root);
    hud.hidden = true;
    var selected = S.get().guide || null;

    var wrap = el("div", "screen-pad fade-up");
    wrap.appendChild(el("h2", "screen-title", DECODED.copy.guidePickTitle));
    wrap.appendChild(el("p", "screen-sub", DECODED.copy.guidePickSub));

    var cards = el("div", "guide-cards");
    ["ada", "leo"].forEach(function (id) {
      var g = DECODED.guides[id];
      var card = el("button", "guide-card" + (selected === id ? " selected" : ""), null, {
        type: "button", "aria-pressed": selected === id ? "true" : "false"
      });
      card.innerHTML =
        '<div class="guide-mascot">' + DECODED.mascotSVG(id, { size: 130, animate: !DECODED.reducedMotion() }) + '</div>' +
        '<div class="guide-name" style="color:' + g.color + '">' + g.name + '</div>' +
        '<div class="guide-pers">' + g.personality + '</div>';
      card.addEventListener("click", function () {
        selected = id;
        var all = cards.querySelectorAll(".guide-card");
        for (var k = 0; k < all.length; k++) {
          all[k].classList.remove("selected");
          all[k].setAttribute("aria-pressed", "false");
        }
        card.classList.add("selected");
        card.setAttribute("aria-pressed", "true");
        go.disabled = false;
      });
      cards.appendChild(card);
    });
    wrap.appendChild(cards);

    var go = el("button", "btn primary big", "Let's go", { type: "button" });
    go.disabled = !selected;
    go.addEventListener("click", function () {
      if (!selected) return;
      S.setGuide(selected);
      updateHud();
      screenHome();
    });
    wrap.appendChild(go);
    root.appendChild(wrap);
  }

  /* ----------------------------- Home map ------------------------------- */
  function screenHome() {
    clear(root);
    updateHud();
    var st = S.get();
    var guide = DECODED.guides[st.guide] || DECODED.guides.ada;

    var wrap = el("div", "screen-pad fade-up");

    // Hero panel: mascot + speech bubble
    var hero = el("div", "home-hero");
    hero.innerHTML =
      '<div class="hero-mascot small" style="--gc:' + guide.color + '">' +
        DECODED.mascotSVG(guide.id, { size: 120, animate: !DECODED.reducedMotion() }) + '</div>' +
      '<div class="speech" style="--gc:' + guide.color + '">' + bubbleForProgress(st, guide) + '</div>';
    wrap.appendChild(hero);

    // XP / knowledge bar
    var rank = DECODED.rankForScore(st.score);
    var pct = Math.min(100, Math.round((st.score / DECODED.XP_TARGET) * 100));
    var xp = el("div", "xp-panel");
    xp.innerHTML =
      '<div class="xp-top"><span class="rank-pill" style="--gc:' + guide.color + '">' + ic(rank.icon) + rank.name + '</span>' +
      '<span class="xp-score">' + st.score + ' / ' + DECODED.XP_TARGET + ' XP</span></div>' +
      '<div class="meter-track"><span class="meter-fill" style="width:' + pct + '%"></span></div>';
    wrap.appendChild(xp);

    // Toolbar
    var bar = el("div", "home-bar");
    var lbBtn = el("button", "btn ghost", ic("trophy") + "Leaderboard", { type: "button" });
    lbBtn.addEventListener("click", screenLeaderboard);
    var switchBtn = el("button", "link-btn", "Switch guide", { type: "button" });
    switchBtn.addEventListener("click", screenGuidePicker);
    bar.appendChild(lbBtn);
    bar.appendChild(switchBtn);
    wrap.appendChild(bar);

    // Levels grouped by chapter
    DECODED.chapters.forEach(function (ch) {
      var levels = DECODED.levels.filter(function (l) { return l.chapter === ch.id; });
      if (!levels.length) return;
      wrap.appendChild(el("h3", "chapter-title", ch.name));
      var list = el("div", "level-list");
      levels.forEach(function (lv) {
        list.appendChild(levelRow(lv));
      });
      wrap.appendChild(list);
    });

    // Certificate access once all done
    if (st.completed.length === DECODED.levels.length) {
      var certBtn = el("button", "btn primary big", ic("trophy", 20) + "View your certificate", { type: "button" });
      certBtn.addEventListener("click", screenCertificate);
      wrap.appendChild(certBtn);
    }

    root.appendChild(wrap);
  }

  function bubbleForProgress(st, guide) {
    if (st.completed.length === 0) return guide.intro;
    if (st.completed.length === DECODED.levels.length) return "You did it. All 11 decoded. Go grab your certificate.";
    var next = nextLevelNum(st);
    return "Nice work so far. Level " + next + " is ready when you are.";
  }

  function nextLevelNum(st) {
    for (var i = 1; i <= DECODED.levels.length; i++) {
      if (!S.isCompleted(i)) return i;
    }
    return DECODED.levels.length;
  }

  function levelRow(lv) {
    var unlocked = S.isUnlocked(lv.num);
    var done = S.isCompleted(lv.num);
    var stateLabel = done ? "DONE" : (unlocked ? "PLAY" : "LOCKED");
    var cls = "level-row " + (done ? "done" : unlocked ? "open" : "locked");

    var row = el("button", cls, null, {
      type: "button",
      "aria-label": "Level " + lv.num + ", " + lv.title + ", " + stateLabel
    });
    row.innerHTML =
      '<span class="lv-num">' + lv.num + '</span>' +
      '<span class="lv-main"><span class="lv-title">' + lv.title + '</span>' +
      '<span class="lv-tag">' + lv.tag + '</span></span>' +
      '<span class="lv-state">' + (done ? ic("check-circle") + "DONE" : unlocked ? ic("play") + "PLAY" : ic("lock") + "LOCKED") + '</span>';

    if (unlocked) row.addEventListener("click", function () { screenLevel(lv.num); });
    else row.disabled = true;
    return row;
  }

  /* ------------------------------ Level --------------------------------- */
  function screenLevel(num) {
    var lv = DECODED.levelByNum(num);
    if (!lv || !S.isUnlocked(num)) { screenHome(); return; }
    clear(root);
    updateHud();
    var guide = DECODED.guides[S.get().guide] || DECODED.guides.ada;

    var wrap = el("div", "screen-pad level-screen fade-up");

    var top = el("div", "level-top");
    var back = el("button", "link-btn", ic("arrow-left") + "Back to map", { type: "button" });
    back.addEventListener("click", screenHome);
    top.appendChild(back);
    top.appendChild(el("span", "level-counter", "Level " + lv.num + " of " + DECODED.levels.length));
    wrap.appendChild(top);

    wrap.appendChild(el("h2", "level-title", lv.title));

    // Guide intro line
    var intro = el("div", "guide-line", null);
    intro.innerHTML = '<span class="gl-mascot">' +
      DECODED.mascotSVG(guide.id, { size: 44, animate: !DECODED.reducedMotion() }) + '</span>' +
      '<span class="gl-text" style="--gc:' + guide.color + '">' + lv.intro + '</span>';
    wrap.appendChild(intro);

    // How-to-play callout
    wrap.appendChild(el("div", "howto", '<span class="howto-ic">' + icon("nav-arrow-right") + '</span>' + lv.howToPlay));

    // Mini-game host
    var host = el("div", "game-host");
    wrap.appendChild(host);
    root.appendChild(wrap);
    window.scrollTo(0, 0);

    var ctx = makeContext(lv, function (result) { screenReveal(lv, result); });
    var mechanic = DECODED.mechanics[lv.mechanic];
    if (mechanic) mechanic(lv, host, ctx);
    else host.appendChild(el("div", "card", "This level type is not available."));
  }

  /* ------------------------------ Reveal -------------------------------- */
  // A level is passed when the player got MORE than half the questions right.
  // 50% and below counts as a fail, and the player is offered a retry.
  function passedLevel(result) {
    if (!result || !result.total) return true; // levels without scored questions always pass
    return (result.correct / result.total) > 0.5;
  }

  function screenReveal(lv, result) {
    if (!passedLevel(result)) { screenFailed(lv, result); return; }

    S.completeLevel(lv.num, lv.glossaryId);
    updateHud();
    DECODED.confetti();

    clear(root);
    var glossary = DECODED.glossaryById(lv.glossaryId);
    var isLast = lv.num === DECODED.levels.length;

    var wrap = el("div", "screen-pad fade-up");
    wrap.appendChild(el("div", "reveal-badge", "Level " + lv.num + " complete"));

    // Reveal: what just happened
    var reveal = el("div", "card reveal-card");
    reveal.innerHTML = '<div class="reveal-title">' + ic("light-bulb", 20) + lv.reveal.title + '</div>' +
      '<p class="reveal-body">' + lv.reveal.body + '</p>';
    wrap.appendChild(reveal);

    // Concept unlocked
    var concept = el("div", "card concept-card pop-in");
    concept.innerHTML =
      '<div class="concept-tag">' + ic("sparks") + 'Concept Unlocked</div>' +
      '<div class="concept-term">' + ic(glossary.icon, 22) + glossary.term + '</div>' +
      '<div class="concept-def">' + glossary.definition + '</div>';
    wrap.appendChild(concept);

    // Try this: a realistic assignment to test understanding for real
    if (lv.assignment) {
      var task = el("div", "card assignment-card pop-in");
      task.innerHTML =
        '<div class="assignment-tag">' + ic("task-list") + 'Try this in real life</div>' +
        '<p class="assignment-body">' + lv.assignment + '</p>';
      wrap.appendChild(task);
    }

    // CTA only on the last level
    if (isLast) wrap.appendChild(ctaBlock());

    // Navigation
    var nav = el("div", "reveal-nav");
    if (!isLast) {
      var nextNum = lv.num + 1;
      var nextBtn = el("button", "btn primary", "Next level" + ic2("nav-arrow-right"), { type: "button" });
      nextBtn.addEventListener("click", function () { screenLevel(nextNum); });
      nav.appendChild(nextBtn);
    } else {
      var certBtn = el("button", "btn primary", ic("trophy", 20) + "See your certificate", { type: "button" });
      certBtn.addEventListener("click", screenCertificate);
      nav.appendChild(certBtn);
    }
    var mapBtn = el("button", "btn ghost", "Back to map", { type: "button" });
    mapBtn.addEventListener("click", screenHome);
    nav.appendChild(mapBtn);
    wrap.appendChild(nav);

    root.appendChild(wrap);
    window.scrollTo(0, 0);
  }

  /* ---------------------- Failed a level (retry) ------------------------ */
  function screenFailed(lv, result) {
    // Do NOT complete the level: the concept stays locked until they pass.
    clear(root);
    var wrap = el("div", "screen-pad fade-up");
    wrap.appendChild(el("div", "reveal-badge fail", "Level " + lv.num + " not passed"));

    var panel = el("div", "card fail-card");
    panel.innerHTML =
      '<div class="fail-title">' + ic("refresh-double", 20) + "Give it another go</div>" +
      '<p class="fail-body">You got ' + result.correct + " of " + result.total +
      " right. You need more than half to pass and unlock this concept. Take another run at it, the explanation below will help.</p>";
    wrap.appendChild(panel);

    // Still teach the idea so the retry goes better.
    var reveal = el("div", "card reveal-card");
    reveal.innerHTML = '<div class="reveal-title">' + ic("light-bulb", 20) + lv.reveal.title + '</div>' +
      '<p class="reveal-body">' + lv.reveal.body + '</p>';
    wrap.appendChild(reveal);

    var nav = el("div", "reveal-nav");
    var retry = el("button", "btn primary", ic("refresh-double", 18) + "Retry Level", { type: "button" });
    retry.addEventListener("click", function () { screenLevel(lv.num); });
    nav.appendChild(retry);
    var mapBtn = el("button", "btn ghost", "Back to map", { type: "button" });
    mapBtn.addEventListener("click", screenHome);
    nav.appendChild(mapBtn);
    wrap.appendChild(nav);

    root.appendChild(wrap);
    window.scrollTo(0, 0);
  }

  function ctaBlock() {
    var block = el("div", "card cta-card");
    block.innerHTML = '<p class="cta-text">' + DECODED.config.CTA.text + '</p>';
    var btn = el("a", "btn primary", DECODED.config.CTA.buttonLabel, {
      href: DECODED.config.CTA.href, target: "_blank", rel: "noopener"
    });
    block.appendChild(btn);
    return block;
  }

  /* ---------------------------- Certificate ----------------------------- */
  function screenCertificate() {
    clear(root);
    S.markCertificateSeen();
    var st = S.get();
    var guide = DECODED.guides[st.guide] || DECODED.guides.ada;
    var rank = DECODED.rankForScore(st.score);

    var wrap = el("div", "screen-pad fade-up");

    var cert = el("div", "card cert-card", null, { style: "--gc:" + guide.color });
    cert.innerHTML =
      '<div class="cert-mascot">' + DECODED.mascotSVG(guide.id, { size: 140, animate: !DECODED.reducedMotion() }) + '</div>' +
      '<h2 class="cert-title">' + DECODED.copy.certTitle + '</h2>' +
      '<div class="cert-stats">' +
        '<div class="cert-stat"><span class="cs-num">' + st.score + '</span><span class="cs-lab">' + ic("star") + 'Score</span></div>' +
        '<div class="cert-stat"><span class="cs-num">' + rank.name + '</span><span class="cs-lab">' + ic("trophy") + 'Rank</span></div>' +
        '<div class="cert-stat"><span class="cs-num">' + st.bestStreak + '</span><span class="cs-lab">' + ic("fire-flame") + 'Best streak</span></div>' +
      '</div>';
    wrap.appendChild(cert);

    // Concept pills row
    var pills = el("div", "concept-pills");
    DECODED.glossary.forEach(function (g) {
      pills.appendChild(el("span", "concept-pill", ic(g.icon) + g.term));
    });
    wrap.appendChild(el("h3", "chapter-title", "Concepts you unlocked"));
    wrap.appendChild(pills);

    // Full concept deck
    var deck = el("div", "concept-deck");
    DECODED.glossary.forEach(function (g) {
      var c = el("div", "card mini-concept");
      c.innerHTML = '<div class="concept-term">' + ic(g.icon, 20) + g.term + '</div>' +
        '<div class="concept-def">' + g.definition + '</div>';
      deck.appendChild(c);
    });
    wrap.appendChild(deck);

    // Share card + email capture + CTA
    wrap.appendChild(shareBlock(st, guide, rank));
    wrap.appendChild(emailBlock(st, rank));
    wrap.appendChild(ctaBlock());

    // Leaderboard entry + replay/reset
    var lbBtn = el("button", "btn ghost", ic("trophy") + "Add your score to the leaderboard", { type: "button" });
    lbBtn.addEventListener("click", function () { screenLeaderboard(true); });
    wrap.appendChild(lbBtn);

    var endNav = el("div", "reveal-nav");
    var replay = el("button", "btn ghost", ic("refresh-double") + "Replay", { type: "button" });
    replay.addEventListener("click", screenHome);
    var reset = el("button", "btn danger", "Reset progress", { type: "button" });
    reset.addEventListener("click", function () {
      if (confirm("Reset all your progress and score? This cannot be undone.")) {
        S.reset();
        applyTheme(S.get().theme);
        renderHeader();
        screenSplash();
        updateHud();
      }
    });
    endNav.appendChild(replay);
    endNav.appendChild(reset);
    wrap.appendChild(endNav);

    root.appendChild(wrap);
    window.scrollTo(0, 0);
  }

  /* ---------------------------- Share block ----------------------------- */
  function shareBlock(st, guide, rank) {
    var block = el("div", "card share-card");
    block.appendChild(el("h3", "block-title", ic("share-android", 20) + "Share your result"));
    var canvas = el("canvas", "share-preview");
    block.appendChild(canvas);

    var row = el("div", "share-actions");
    var dl = el("button", "btn primary", ic("download") + "Download image", { type: "button" });
    var sh = el("button", "btn ghost", ic("share-android") + "Share", { type: "button" });
    row.appendChild(dl);
    row.appendChild(sh);
    block.appendChild(row);

    DECODED.buildShareCard(canvas, { guide: guide.id, score: st.score, rank: rank.name }, function () {});

    var FILENAME = "decoded-result.png";

    dl.addEventListener("click", function () {
      DECODED.buildShareCard(canvas, { guide: guide.id, score: st.score, rank: rank.name }, function (cv) {
        saveImage(cv);
      });
    });

    sh.addEventListener("click", function () {
      DECODED.buildShareCard(canvas, { guide: guide.id, score: st.score, rank: rank.name }, function (cv) {
        if (!cv.toBlob) { saveImage(cv); return; }
        cv.toBlob(function (blob) {
          if (!blob) { saveImage(cv); return; }
          var file = new File([blob], FILENAME, { type: "image/png" });
          var shareData = {
            title: "Decoded",
            text: DECODED.copy.shareHeadline + " Play free at " + DECODED.config.SITE_URL_LABEL,
            url: DECODED.config.SITE_URL
          };
          try {
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              navigator.share({ title: shareData.title, text: shareData.text, files: [file] })
                .catch(function () { saveImage(cv, blob); });
            } else if (navigator.share) {
              navigator.share(shareData).catch(function () { saveImage(cv, blob); });
            } else {
              saveImage(cv, blob);
            }
          } catch (e) {
            saveImage(cv, blob);
          }
        }, "image/png");
      });
    });

    // Robust PNG saver: prefers a Blob object URL with an anchor that is actually
    // in the DOM (a detached anchor is ignored by many browsers), and falls back
    // to opening the image in a new tab so the player can save it manually.
    function saveImage(cv, blob) {
      function download(url, revoke) {
        var a = document.createElement("a");
        a.href = url;
        a.download = FILENAME;
        a.rel = "noopener";
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          if (a.parentNode) a.parentNode.removeChild(a);
          if (revoke) URL.revokeObjectURL(url);
        }, 1500);
      }
      function openInTab() {
        var url = cv.toDataURL("image/png");
        var w = window.open("", "_blank");
        if (w && w.document) {
          w.document.title = "Your Decoded result";
          w.document.body.style.margin = "0";
          w.document.body.style.background = "#0B0B0C";
          w.document.body.innerHTML =
            '<img src="' + url + '" alt="Your Decoded result. Long press or right click to save." ' +
            'style="display:block;max-width:100%;height:auto;margin:0 auto">';
        } else {
          download(url, false); // final attempt with a data URL
        }
      }
      try {
        if (blob) { download(URL.createObjectURL(blob), true); return; }
        if (cv.toBlob) {
          cv.toBlob(function (b) {
            if (b) download(URL.createObjectURL(b), true);
            else openInTab();
          }, "image/png");
        } else {
          openInTab();
        }
      } catch (e) {
        openInTab();
      }
    }

    return block;
  }

  /* ---------------------------- Email block ----------------------------- */
  function emailBlock(st, rank) {
    var block = el("div", "card email-card");
    block.innerHTML = '<h3 class="block-title">' + ic("mail", 20) + DECODED.copy.emailTitle + '</h3>' +
      '<p class="block-sub">' + DECODED.copy.emailSub + '</p>';

    var form = el("form", "email-form");
    var input = el("input", "email-input", null, {
      type: "email", placeholder: "you@email.com", "aria-label": "Your email address", required: "required"
    });
    var submit = el("button", "btn primary", DECODED.copy.emailButton, { type: "submit" });
    form.appendChild(input);
    form.appendChild(submit);
    block.appendChild(form);
    var msg = el("div", "email-msg", "", { "aria-live": "polite" });
    block.appendChild(msg);

    var user = DECODED.auth.getUser();
    if (st.email) input.value = st.email;
    else if (user && user.email) input.value = user.email;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        msg.className = "email-msg bad";
        msg.textContent = "That email does not look right. Give it another go.";
        return;
      }
      S.setEmail(email);
      submit.disabled = true;
      submit.textContent = "Sending...";

      var payload = { email: email, score: st.score, rank: rank.name };
      var endpoint = DECODED.config.FORM_ENDPOINT;

      function done() {
        msg.className = "email-msg good";
        msg.textContent = DECODED.copy.emailSuccess;
        submit.textContent = "Sent";
      }

      if (endpoint) {
        fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify(payload)
        }).then(done).catch(function () {
          // Even if the network fails, the email is stored locally.
          done();
        });
      } else {
        done();
      }
    });

    return block;
  }

  /* --------------------------- Leaderboard ------------------------------ */
  function screenLeaderboard(fromCert) {
    clear(root);
    var st = S.get();
    var wrap = el("div", "screen-pad fade-up");

    var top = el("div", "level-top");
    var back = el("button", "link-btn", ic("arrow-left") + (fromCert ? "Back to certificate" : "Back to map"), { type: "button" });
    back.addEventListener("click", function () { if (fromCert) screenCertificate(); else screenHome(); });
    top.appendChild(back);
    wrap.appendChild(top);

    wrap.appendChild(el("h2", "screen-title", ic("trophy", 24) + "Leaderboard"));

    var listWrap = el("div", "lb-list");
    wrap.appendChild(listWrap);

    function draw(list) {
      clear(listWrap);
      list.forEach(function (entry, idx) {
        var rankNum = idx + 1;
        var cls = "lb-row" + (rankNum <= 3 ? " top top-" + rankNum : "") + (entry.you ? " you" : "");
        var medal = rankNum <= 3 ? icon("trophy", { size: 20 }) : rankNum;
        var row = el("div", cls);
        row.innerHTML = '<span class="lb-rank">' + medal + '</span>' +
          '<span class="lb-initials">' + entry.initials + (entry.you ? " (you)" : "") + '</span>' +
          '<span class="lb-score">' + entry.score + '</span>';
        listWrap.appendChild(row);
      });
    }
    draw(DECODED.leaderboard.fetch());

    // Add-your-score flow
    var add = el("div", "card lb-add");
    add.innerHTML = '<div class="block-title">Add your score: ' + st.score + '</div>';
    var form = el("form", "lb-form");
    var input = el("input", "lb-initials-input", null, {
      type: "text", maxlength: "4", placeholder: "ABC", "aria-label": "Your initials, up to 4 letters"
    });
    var btn = el("button", "btn primary", "Add me", { type: "submit" });
    form.appendChild(input);
    form.appendChild(btn);
    add.appendChild(form);
    var addedMsg = el("div", "email-msg", "", { "aria-live": "polite" });
    add.appendChild(addedMsg);
    wrap.appendChild(add);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var initials = input.value.trim();
      if (!initials) { addedMsg.className = "email-msg bad"; addedMsg.textContent = "Add a couple letters first."; return; }
      var list = DECODED.leaderboard.add(initials, st.score);
      draw(list);
      btn.disabled = true;
      input.disabled = true;
      addedMsg.className = "email-msg good";
      addedMsg.textContent = "You're on the board.";
    });

    root.appendChild(wrap);
    window.scrollTo(0, 0);
  }

})();
