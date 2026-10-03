# Muhammad Taha — Graphic Designer & Management / Data Portfolio

A fast, responsive, dependency-free static website (plain HTML / CSS / JS). No backend and no API.

## Run locally

```bash
npm start      # http://localhost:3000  (tiny built-in static server, no packages to install)
npm test       # offline checks: assets exist, no old info, no secrets, no API calls
```

Any static host works (Netlify, Vercel, GitHub Pages, Cloudflare Pages): publish the `public/` folder.

## Contact form (no API)

The form in `public/index.html` is a plain HTML `<form>` that posts to **FormSubmit** and is forwarded to
`mtahahussain1234@gmail.com`. JavaScript only validates the fields and then submits the form normally.
There are no keys, passwords or custom endpoints.

**One-time activation:** the first time someone submits the form on the live site, FormSubmit emails an
activation link to the Gmail address. Click it once and all later messages arrive in the inbox.
Check the spam folder if it does not appear. A hidden `_honey` field blocks simple bots; change
`_captcha` to `true` in the form if spam becomes a problem.

## Editing content

* **CV** — replace `public/Muhammad-Taha-CV.pdf` (keep the same file name).
* **Design gallery** — each piece is one `<button class="g-item" data-cat="…">` in `index.html`; images are in
  `public/assets/img/design/`. Valid `data-cat` values: `youtube`, `social`, `ads`, `print`, `creative`.
  These are sample pieces: replace them with Muhammad's own work.
* **Photo** — `public/assets/img/profile/` (`muhammad-taha.webp`, `muhammad-taha-sm.webp` for mobile).
* After deploying, change the `og:image` / `twitter:image` URLs in `index.html` to absolute URLs.
