/* ============================================================================
   DECODED - AUTH (optional Google sign-in gate)
   ----------------------------------------------------------------------------
   Turns on ONLY when config.GOOGLE_CLIENT_ID is set. When on, players must sign
   in with Google before playing. The Google Identity Services script is loaded
   on demand (never loaded when sign-in is off), so the game stays offline-first
   by default.

   IMPORTANT (security): the Google ID token is decoded here in the browser just
   to greet the player and remember who they are locally. This is NOT a secured
   account. For real accounts, send the raw token to a server and verify it with
   Google before trusting the identity. The code is shaped so that upgrade is a
   drop-in: replace _userFromCredential / setUser with a call to your backend.
   ============================================================================ */

window.DECODED = window.DECODED || {};

(function () {
  var GIS_SRC = "https://accounts.google.com/gsi/client";
  var loaded = false, loading = false, waiters = [];

  function flush(ok) {
    loaded = ok;
    var list = waiters.slice();
    waiters = [];
    list.forEach(function (cb) { cb(ok); });
  }

  DECODED.auth = {
    // Sign-in is available only when a Client ID is configured.
    isEnabled: function () {
      var id = DECODED.config.GOOGLE_CLIENT_ID;
      return !!(id && String(id).trim());
    },

    // Whether players are REQUIRED to sign in before playing.
    isRequired: function () {
      return this.isEnabled() && DECODED.config.REQUIRE_SIGN_IN !== false;
    },

    getUser: function () { return DECODED.state.get().user; },

    signOut: function () {
      try {
        if (window.google && google.accounts && google.accounts.id) {
          google.accounts.id.disableAutoSelect();
        }
      } catch (e) { /* ignore */ }
      DECODED.state.clearUser();
    },

    // Load the Google script on demand, then call cb(ok).
    load: function (cb) {
      if (!this.isEnabled()) { cb(false); return; }
      if (loaded) { cb(true); return; }
      waiters.push(cb);
      if (loading) return;
      loading = true;
      var s = document.createElement("script");
      s.src = GIS_SRC;
      s.async = true;
      s.defer = true;
      s.onload = function () { loading = false; flush(true); };
      s.onerror = function () { loading = false; flush(false); };
      document.head.appendChild(s);
    },

    // Render the official Google button into `container`. Calls onUser(user)
    // after a successful sign-in.
    renderButton: function (container, onUser) {
      var self = this;
      this.load(function (ok) {
        if (!ok || !window.google || !google.accounts || !google.accounts.id) {
          container.innerHTML = '<div class="auth-error">Google Sign-In could not load. ' +
            "Check the Client ID in js/config.js and that this web address is listed as an authorized origin.</div>";
          return;
        }
        google.accounts.id.initialize({
          client_id: DECODED.config.GOOGLE_CLIENT_ID,
          callback: function (resp) {
            var user = self._userFromCredential(resp && resp.credential);
            if (user) {
              DECODED.state.setUser(user);
              if (onUser) onUser(user);
            }
          }
        });
        container.innerHTML = "";
        google.accounts.id.renderButton(container, {
          theme: "filled_black",
          size: "large",
          shape: "pill",
          text: "continue_with",
          logo_alignment: "left"
        });
      });
    },

    // Decode a Google ID token (JWT) into a small user object.
    _userFromCredential: function (jwt) {
      if (!jwt) return null;
      try {
        var payload = jwt.split(".")[1];
        var b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        var json = decodeURIComponent(atob(b64).split("").map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
        var p = JSON.parse(json);
        return {
          id: p.sub,
          email: p.email || "",
          name: p.name || p.given_name || "Player",
          firstName: p.given_name || (p.name ? p.name.split(" ")[0] : "Player"),
          picture: p.picture || ""
        };
      } catch (e) {
        return null;
      }
    }
  };
})();
