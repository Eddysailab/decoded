# Put Decoded online (one page, non-technical)

Decoded is a plain static website, so hosting is free and takes a few minutes.
Pick one of the two options below.

---

## Option 1: Netlify Drop (easiest, drag and drop)

1. Go to **https://app.netlify.com/drop** in your browser.
2. Open your file explorer and find the **`decoded`** folder.
3. **Drag the whole `decoded` folder** onto the Netlify Drop page.
4. Wait a few seconds. Netlify gives you a live link like
   `https://your-random-name.netlify.app`.
5. That link is your game. Share it.

To use a nicer address, create a free Netlify account (a "Claim" button appears
after your first drop), then in **Site settings > Domain** you can rename it or
connect a custom domain such as `play.eddysailab.com`.

**To update the game later:** make your edits, then drag the `decoded` folder onto
Netlify Drop again. Or, in your site's **Deploys** tab, drag the folder to redeploy.

---

## Option 2: Vercel (also free)

1. Go to **https://vercel.com** and sign up (free).
2. Click **Add New > Project**.
3. If you keep your files on GitHub, connect the repository. Otherwise use Vercel's
   drag-and-drop / CLI upload for the `decoded` folder.
4. There is no build step. If asked for a framework, choose **Other**. Leave the
   build command empty and set the output directory to the folder that contains
   `index.html`.
5. Deploy. Vercel gives you a live link.

---

## Hosting it under your existing website

If you already run **www.eddysailab.com**, you can host the game at
`www.eddysailab.com/decoded` by uploading the `decoded` folder into your website's
files (via your host's file manager or FTP), next to your existing pages. The links
inside the game are all relative, so it will work in a subfolder.

---

## After it is live: a 3 point checklist

1. **Turn on email collection.** Open `js/config.js`, paste your form endpoint into
   `FORM_ENDPOINT` (see README), and redeploy. Without this, signups are only saved
   in the player's own browser.
2. **Check the links.** The "Start here" button and share card point to
   `SITE_URL` in `js/config.js`. Make sure that is your real site.
3. **Play it once on your phone.** The game is built for phones, which is where most
   people will play and share it. Confirm the share image downloads.

That is it. You now have a free game online that teaches AI and collects emails.
