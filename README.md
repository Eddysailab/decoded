# Decoded

A free, playable crash course in AI, by Eddy's AI Lab. Eleven quick mini-games
teach a total beginner what AI actually is and how to use it. It is built as a
top-of-funnel game: it drives email signups and traffic to www.eddysailab.com.

Decoded is a plain static website. No build step, no server, no accounts. It runs
fully offline once the files are on a page.

---

## Quick start (run it on your computer)

You have two easy options.

**Option A, just open it.**
Double-click `index.html` inside the `decoded` folder. It opens in your browser
and works. This is the simplest way to look at it.

**Option B, run the little local server (matches how it will look online).**
From the project root there is a helper server. In a terminal, run:

```
powershell -NoProfile -ExecutionPolicy Bypass -File .claude/serve.ps1
```

Then open `http://localhost:3210/decoded/` in your browser.

Either way, no installation is required.

**Light or dark:** there is a sun/moon button in the top right corner. Players can
switch between dark mode and light mode, and their choice is remembered. The icons
throughout the game come from Iconoir (iconoir.com) and are built into the files, so
nothing loads from the internet.

---

## What is where (folder map)

```
decoded/
  index.html            The single page. Loads everything.
  README.md             This file.
  DEPLOY.md             One-page guide to putting it online.
  css/
    styles.css          All the styling. Brand colors are at the very top.
  js/
    config.js           <-- START HERE. Email endpoint, site URL, brand, CTA.
    ui.js               Small helpers. You will not need to touch this.
    icons.js            The icon set (from Iconoir, iconoir.com). Inlined so it works offline.
    mascot.js           Draws the Ada and Leo robot characters.
    state.js            Saves progress in the browser.
    leaderboard.js      The local leaderboard.
    fx.js               Background, confetti, floating points.
    share.js            Builds the shareable image.
    engine.js           The 11 mini-games.
    app.js              Screen flow and glue.
    data/
      guides.js         The two guide characters (names, personalities).
      ranks.js          The ranks and the XP target.
      glossary.js       The 11 concept cards.
      levels.js         <-- ALL THE QUESTIONS AND LEVEL CONTENT.
      copy.js           Small bits of text and the leaderboard seed.
```

You will spend almost all of your editing time in just two files:
`js/config.js` (setup) and `js/data/levels.js` (questions).

---

## How to edit the questions (no coding needed)

Open `js/data/levels.js` in any text editor (even Notepad works).

Each level is a block that starts with `num:` and a title. Inside it you will see
plain English you can change. For example, in level 1 you will find items like:

```js
{ icon: "calculator", label: "A calculator", answer: "rules",
  why: "A person wrote the exact math rules. It never learns, it just follows them." },
```

- Change `label` to change what the player sees.
- Change `why` to change the explanation shown after they answer.
- `answer` is the correct choice. Leave the spelling exactly as it is
  (for level 1 it is either `"rules"` or `"learns"`).
- `icon` is the little picture next to it. It uses an icon name from Iconoir.
  The names you can use are listed in `js/icons.js` (for example `calculator`,
  `mail`, `brain`, `search`). To add a new one, grab its SVG from iconoir.com and
  paste it into `js/icons.js` following the examples there.

Every level also has an `assignment:` line. That is the "Try this in real life"
task shown after the player finishes the level, so they can test their
understanding for real. Edit that sentence freely.

**Passing and retrying:** a player passes a level by getting more than half the
questions right. Half or below counts as a fail, and they are shown a **Retry
Level** button. The concept card stays locked until they pass. This rule is
automatic and applies to every level, so you do not need to configure anything.

Multiple-choice levels (9, 10, 11) look like this:

```js
{
  scenario: "A hiring AI was trained mostly on resumes from men, so it quietly downranks women.",
  options: ["Bias from unrepresentative data", "Deepfakes and misinformation", "Over-reliance", "Security misuse"],
  answer: 0,
  why: "When the training data is skewed, the model learns and repeats that skew as if it were fair."
}
```

- `answer: 0` means the first option is correct, `answer: 1` means the second, and
  so on (the count starts at 0).

**Golden rules when editing:**
1. Keep the quotation marks `"` around text.
2. Keep the commas at the end of lines.
3. Do not rename the `mechanic` field. That tells the game which mini-game to run.
4. Save the file, then refresh your browser to see the change.

If something breaks, you probably removed a quote or a comma. Undo your last change
and try again.

---

## The setup values (config.js)

Open `js/config.js`. The important ones:

- `FORM_ENDPOINT` — where email signups go. See the next section.
- `SITE_URL` and `SITE_URL_LABEL` — your website, used on the CTA and share image.
- `BRAND` — the product name and tagline.
- `CTA` — the exact call-to-action text and its button link.
- `AFFILIATE_TOOLS` — optional recommended-tool links for later.

---

## Collecting emails for real

By default, emails players submit are saved only in their own browser. To actually
collect them, you paste one link into `js/config.js`.

1. Make a free form at **Formspree** (formspree.io) or **ConvertKit** or
   **Mailchimp**. Formspree is the quickest.
2. Copy the form's endpoint URL. In Formspree it looks like
   `https://formspree.io/f/abcdwxyz`.
3. In `js/config.js`, put it between the quotes:

   ```js
   FORM_ENDPOINT: "https://formspree.io/f/abcdwxyz",
   ```

4. Save and re-upload. Signups now arrive in that form's inbox, along with the
   player's score and rank.

---

## Require Google sign-in (optional)

By default anyone can play with no account. If you want players to **sign in with
Google before playing**, you add one value.

1. Get a Google OAuth **Client ID** (free, about 5 minutes):
   - Go to https://console.cloud.google.com and create a project.
   - **APIs and Services → Credentials → Create credentials → OAuth client ID →
     Web application.**
   - Under **Authorized JavaScript origins**, add the exact web address where the
     game will live (for example `https://www.eddysailab.com`). Add
     `http://localhost:3210` too if you want to test locally.
   - Copy the Client ID (it ends in `.apps.googleusercontent.com`).
2. Open `js/config.js` and paste it in:

   ```js
   GOOGLE_CLIENT_ID: "123456789-abcdef.apps.googleusercontent.com",
   REQUIRE_SIGN_IN: true,
   ```

3. Save and re-upload. Players now see a "Continue with Google" screen before the
   game, and their name shows in the top corner with a sign-out option.

**Important to understand:**
- This needs an internet connection, so it turns off the "works offline" behavior.
- It will **not** work inside a Claude preview link, only on your own deployed
  website with the address listed as an authorized origin above.
- Sign-in identifies the player in their browser. It is convenient, but it is not
  yet a locked-down server account (see the developer notes at the end).

Leave `GOOGLE_CLIENT_ID` blank to turn the whole thing off again.

---

## Resetting all saved progress

Progress lives in each player's browser. If you ever change the game a lot and want
everyone to start clean, open `js/config.js` and change:

```js
STORAGE_PREFIX: "decoded.v1."
```

to `"decoded.v2."` (any new value). Everyone gets a fresh start.

---

## Putting it online

See **DEPLOY.md** for a short, non-technical, step-by-step guide.

---

## Notes for a future developer

The code is plain HTML, CSS, and JavaScript with no framework and no build step.
Content is separated from logic in `js/data/*`. A few things were intentionally
structured so they can grow without a rewrite:

- **Leaderboard** (`js/leaderboard.js`) exposes `fetch()` and `add()`. Swap the
  local storage internals for network calls to add a shared backend leaderboard.
- **State** (`js/state.js`) is the single place progress is read and written. Point
  its load/save at an API to sync across devices.
- **Email** posts `{ email, score, rank }` to `FORM_ENDPOINT`. A real backend can
  receive the same payload.
- **Google sign-in** (`js/auth.js`) is client-side only today: it decodes the
  Google ID token in the browser to greet the player. To make it a real, secured
  account, send the raw `credential` (the ID token) to your server, verify it with
  Google's token endpoint, create or look up the account, and return your own
  session. `_userFromCredential` and `DECODED.state.setUser` are the two seams to
  swap. Progress in `state.js` can then be synced to that account instead of only
  `localStorage`.
- **Branding** is config and CSS variables driven (`js/config.js`, top of
  `css/styles.css`), which makes a white-label or B2B mode straightforward.
- **Mechanics** live in `DECODED.mechanics` (`js/engine.js`). Adding a level type is
  adding one function plus a data block in `js/data/levels.js`.

Roadmap items the structure already anticipates: randomized/expanding question
pools, a live-AI prompt level (keep any API key server side), pre and post knowledge
checks, resume mid-level, analytics, and a paid verifiable certificate.
