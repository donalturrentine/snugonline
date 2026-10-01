# SNUG website

Static site for the Spillman/Flex Northwest Users Group. Plain HTML, CSS and a small vanilla JS file. No build step, no frameworks, all links relative, so it works from any folder or from GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | Home: hero, conference cards, quick links, who we serve, goals, membership call to action |
| `conferences.html` | Conference details, agenda slot, registration slot, next conference |
| `membership.html` | Member benefits, who can join, join by email, online sign-up slot |
| `about-us.html` | Mission, executive officers, goals |
| `contact-us.html` | Email, mailing address, mailto contact form |
| `by-laws.html`, `partners.html`, `policies.html`, `news.html`, `faq.html`, `public-documents.html`, `login.html` | "Coming soon" pages sharing the same layout |
| `assets/style.css` | All styles. Brand colors are variables at the top (`:root`) |
| `assets/site.js` | Mobile menu, keyboard/touch dropdowns, automatic conference status badge |
| `assets/logo.png` | SNUG badge, also used as the favicon |
| `.nojekyll` | Tells GitHub Pages to serve files as-is |

## Deploy to GitHub Pages

1. Copy everything in this folder (including `.nojekyll`) to the root of the repo.
2. Commit and push to `main`.
3. In the repo: **Settings > Pages > Build and deployment > Deploy from a branch**, pick `main` and `/ (root)`, save.
4. The site is live at `https://<user>.github.io/<repo>/` within a minute or two.
5. Custom domain (optional): add a `CNAME` file containing the domain, then point DNS at GitHub Pages.

## Adding things later

Each future feature has a dashed "Coming soon" box marked with an HTML comment. Search the file for the comment and replace the whole `<section class="slot" ...>` block.

- **Conference registration**: `conferences.html`, comment `REGISTRATION`. Replace with a button:
  `<a class="btn btn-primary" href="https://your-registration-link">Register now</a>`.
  Also update the "Agenda &amp; registration" button on `index.html` if you want it to go straight to the form.
- **Conference agenda**: `conferences.html`, comment `AGENDA`. Put in a list or table of sessions, or link a PDF (drop it in `assets/` and use `href="assets/agenda.pdf"`).
- **Online membership sign-up**: `membership.html`, comment `SIGN-UP`. Replace with the form or a link button.
- **New conference**: copy the Fall 2026 `<article class="card event event-feature">` block. Set `data-start` and `data-end` (YYYY-MM-DD) on the `.status` badge; it shows "Upcoming", "Happening now" or "Concluded" automatically based on the visitor's date.
- **Filling a coming-soon page**: replace the `<div class="soon">` block with your content. Header, nav and footer stay the same.

Reusable pieces: `.btn` + `.btn-primary` / `.btn-outline` / `.btn-gold`, `.card`, `.tile` (in a `.tiles` grid), `.slot` + `.pill` for placeholders.

The nav, header and footer are repeated in each page. If you add or rename a page, update the `<nav>` and `<footer>` in every `.html` file (a find-and-replace across files works).

## Swapping the logo

Replace `assets/logo.png` with the new file, keeping the same name. A square-ish transparent PNG around 260px or larger works best. It is used in the header, home hero, footer and as the favicon. If the new logo is not round, check the header on a phone.

## Colors and fonts

Change colors in the `:root` block at the top of `assets/style.css`. White text is only used on the darkened green (`--cta: #2b7350`) and navy, both of which pass WCAG AA. The font is Public Sans from Google Fonts, with the system font as fallback if it can't load.

## Contact form

GitHub Pages can't run server code, so the form uses `mailto:` and opens the visitor's email app. To receive submissions directly, point the form `action` at a form service (Formspree, Basin, etc.).

## Online payments (Stripe)
The membership page (`membership.html#pay`) carries the two Stripe buy buttons that were on the previous site (same button IDs and publishable key). To change prices or products, edit them in the Stripe dashboard. To add or swap a button, copy its embed code from Stripe into the `#pay` section.
