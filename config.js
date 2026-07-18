/* ============================================================================
   DECODED - CONFIG
   ----------------------------------------------------------------------------
   This is the ONE file a non-technical owner will edit most often for setup.
   Everything below is plain text you can safely change. Keep the quotes.
   ============================================================================ */

window.DECODED = window.DECODED || {};

DECODED.config = {

  /* --------------------------------------------------------------------------
     EMAIL CAPTURE ENDPOINT
     --------------------------------------------------------------------------
     Leave this as "" (empty) and emails are only saved in the player's browser.
     To collect emails for real, paste a form endpoint URL between the quotes.

     Where to get one (all free tiers work):
       - Formspree:  make a form, copy the URL that looks like
                     https://formspree.io/f/abcdwxyz
       - ConvertKit / Mailchimp: use their "custom form action" / API URL.

     When set, Decoded sends { email, score, rank } to this URL on signup.
  -------------------------------------------------------------------------- */
  FORM_ENDPOINT: "",

  /* --------------------------------------------------------------------------
     YOUR SITE URL (used on the CTA button and the shareable image card)
  -------------------------------------------------------------------------- */
  SITE_URL: "https://www.eddysailab.com",
  SITE_URL_LABEL: "www.eddysailab.com",

  /* --------------------------------------------------------------------------
     GOOGLE SIGN-IN (require players to sign in with Google before playing)
     --------------------------------------------------------------------------
     Leave GOOGLE_CLIENT_ID as "" and the game plays with no sign-in (the
     default). Paste your Google OAuth Client ID here and players must sign in
     with Google to play.

     How to get a Client ID (free, about 5 minutes):
       1. Go to https://console.cloud.google.com and create a project.
       2. APIs and Services  ->  Credentials  ->  Create credentials
          ->  OAuth client ID  ->  Web application.
       3. Under "Authorized JavaScript origins" add the exact web address where
          this game will live, for example https://www.eddysailab.com
          (add http://localhost:3210 too if you want to test locally).
       4. Copy the Client ID (it ends in .apps.googleusercontent.com) and paste
          it between the quotes below.

     Notes:
       - This requires an internet connection and does not work offline.
       - Sign-in identifies the player in their browser. It is not a secured
          server account yet. See the "future developer" notes in the README for
          how to add real, server-verified accounts later.
  -------------------------------------------------------------------------- */
  GOOGLE_CLIENT_ID: "",
  REQUIRE_SIGN_IN: true, // when a Client ID is set: true = must sign in to play

  /* --------------------------------------------------------------------------
     BRAND (white-label ready: change these to rebrand the whole game later)
  -------------------------------------------------------------------------- */
  BRAND: {
    productName: "DECODED",
    tagline: "BY EDDY'S AI LAB",
    maker: "Eddy's AI Lab"
  },

  /* --------------------------------------------------------------------------
     FINAL CALL TO ACTION (shown only on the last level and the certificate)
     Copy is exact and intentional. Change with care.
  -------------------------------------------------------------------------- */
  CTA: {
    text: "Looking to gain a deeper understanding of AI, and build with it too? Let's get to it.",
    buttonLabel: "Start here",
    href: "https://www.eddysailab.com"
  },

  /* --------------------------------------------------------------------------
     AFFILIATE / RECOMMENDED TOOLS
     --------------------------------------------------------------------------
     Optional. These can be surfaced on the build-related levels later
     (agent, vibe coding, prompt). Add links here; the app reads them by level id.
     Leave the arrays empty to show nothing.
  -------------------------------------------------------------------------- */
  AFFILIATE_TOOLS: {
    prompt: [],   // level 5
    agent: [],    // level 6
    vibe: []      // level 7
  },

  /* --------------------------------------------------------------------------
     STORAGE KEY PREFIX (bump this to reset ALL saved data for every player)
  -------------------------------------------------------------------------- */
  STORAGE_PREFIX: "decoded.v1."
};
