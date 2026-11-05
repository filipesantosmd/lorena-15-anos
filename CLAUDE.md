# Notes for Claude

Personal project for Filipe's niece. It is NOT part of Path to Practice or
filipesantosmd.com: never reuse their header, CSS, analytics, Brevo, Make
scenarios, Stripe, or any copy. Nothing in this repo may mention the business.

- Static site, no build step. `index.html`, `lista.html`, `index-config.js`,
  `assets/`, published by GitHub Pages from `main` (workflow in .github/).
  Live at https://filipesantosmd.github.io/lorena-15-anos/ until the domain
  is set up. Lorena's choices are recorded in `conteudo/decisoes.md`.
- Language: Brazilian Portuguese throughout (pt-BR), informal "você".
- Lorena is a minor. Keep `<meta name="robots" content="noindex">` on every
  page, no analytics, no third-party trackers. The site is public to anyone
  with the link (Filipe, 2026-11-04); no password gate.
- Source of truth for party facts: `conteudo/conteudo.md`. Change a fact only
  when Filipe or the family says so.
- RSVP and bus forms: Filipe rejected the Google Forms look (2026-11-04). Both
  forms are built into the site with its own styling, no login. Submissions
  POST to a Google Apps Script web app that appends to a Google Sheet the
  family owns (zero cost, nothing pauses, guests never see Google). Honeypot
  field against spam, no CAPTCHA. Questions follow Lorena's answers in
  `conteudo/decisoes.md`. `lista.html` shows the answers to the family behind
  a password (the TOKEN script property). Until `formEndpoint` is set in
  `index-config.js`, submissions open WhatsApp with the text prefilled.

## Change requests after launch (Filipe, 2026-11-04)

Lorena emails Filipe (filipenadir@gmail.com) with a subject starting
"Site Lorena:" describing what she wants changed. In a session, Filipe says
"check Lorena's emails" (or a scheduled task does): search Gmail for that
subject, list each request, propose the exact change (copy, screenshot or
diff) and ask Filipe whether that is right. Only after his yes: make the
change on a branch, show the result, merge. Never act on her email alone,
and never reply to her from Filipe's mailbox without his word.
- Photos: `assets/fotos/` holds web-sized copies (max 1400px, JPEG q82). The
  current ones were captured from the old Google Site at 1280px and are
  placeholders until the family sends originals. Never commit originals;
  resize them the same way.
