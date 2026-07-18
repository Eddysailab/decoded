/* ============================================================================
   DECODED - UI HELPERS
   ----------------------------------------------------------------------------
   Tiny DOM helpers shared across the app. No framework, just less boilerplate.
   ============================================================================ */

window.DECODED = window.DECODED || {};

DECODED.dom = {
  // Create an element: el("button", "btn primary", "Go", { onclick: fn })
  el: function (tag, className, html, attrs) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined && html !== null) node.innerHTML = html;
    if (attrs) {
      for (var k in attrs) {
        if (k === "onclick") node.addEventListener("click", attrs[k]);
        else if (k === "onkeydown") node.addEventListener("keydown", attrs[k]);
        else if (k === "oninput") node.addEventListener("input", attrs[k]);
        else if (k === "onsubmit") node.addEventListener("submit", attrs[k]);
        else if (k === "text") node.textContent = attrs[k];
        else node.setAttribute(k, attrs[k]);
      }
    }
    return node;
  },

  clear: function (node) { while (node.firstChild) node.removeChild(node.firstChild); },

  // Staggered pop-in for a list of child nodes.
  stagger: function (nodes, step) {
    step = step || 60;
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].style.animationDelay = (i * step) + "ms";
      nodes[i].classList.add("pop-in");
    }
  },

  escape: function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
};
