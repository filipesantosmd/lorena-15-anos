# Notes for Claude

Personal project for Filipe's niece. It is NOT part of Path to Practice or
filipesantosmd.com: never reuse their header, CSS, analytics, Brevo, Make
scenarios, Stripe, or any copy. Nothing in this repo may mention the business.

- Static site, no build step. `index.html`, `lista.html`, `perguntas.html`,
  `index-config.js`, `assets/`, published by GitHub Pages from `main`
  (workflow in .github/). Everything the family decides lives in
  `index-config.js` (traje, programação, paraOsPais, vindoDeFora, hashtag,
  mensagem, fraseSelo, fotos[].ano/legenda, quiz, fotosFesta...). An empty
  value hides that part of the page, so new answers are config edits, not
  layout work. Bump the `?v=` query on the css/js/config references in the
  three HTML files whenever those files change (GitHub Pages caches 10 min).
  Live at https://15anosdalorena.com.br (Registro.br, DNS A records to GitHub
  Pages, www CNAME; set as custom domain in the repo's Pages settings on
  2026-11-06). https://filipesantosmd.github.io/lorena-15-anos/ redirects
  there. Lorena's choices are recorded in `conteudo/decisoes.md`.
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
  a password (the TOKEN script property). Choosing a bus in the RSVP also
  books the seat (two POSTs); the standalone bus form is collapsed behind
  "Já confirmei e esqueci de pedir o ônibus" (Filipe, 2026-11-06). Duplicates:
  the script upserts by WhatsApp digits, else by normalised name, under a
  LockService lock; the site remembers submissions in localStorage and says so.
  Choosing a bus for N people posts one Ônibus row per name (column
  "Confirmado por"). The RSVP also takes an optional song and a message
  (columns Música, Recado). `perguntas.html` posts tipo "perguntas" (JSON in
  the Perguntas tab); read answers with `?lista=1&token=` or in lista.html.
  `?contagem=1` is public and returns only counts (used for "Já confirmaram N
  pessoas", shown from minimoContagem). Any change to apps-script/Code.gs
  needs Filipe to paste it and deploy a new version (URL stays the same).
- No "Compartilhar convite" button anywhere and no site link in share texts:
  the invitation is for whoever received it (Filipe, 2026-11-06). Music: a
  CC BY instrumental only; her favourite song is a Spotify link, never hosted.
- Reviews of 2026-11-06 (conteudo/revisoes-2026-11-06/) were implemented
  where no family content was needed: OG tags and share image, sticky phone
  pill, facts card with calendar links, countdowns, softened thank-you, gold
  and italic accents, opening sequence, layered cover, image fade-in,
  lead type size, reply-card forms, static map (no Google iframe), Uber and
  copy-address buttons, required companion names with count, WhatsApp mask,
  story template, quiz engine, after-party mode, lista.html
  timeout/CSV/show-password. Facts never invented: end time, dress code,
  programme, parking, bus times, hashtag wait for the questionnaire.

## Change requests after launch (Filipe, 2026-11-04)

Lorena emails Filipe (filipenadir@gmail.com) with a subject starting
"Site Lorena:" describing what she wants changed. In a session, Filipe says
"check Lorena's emails" (or a scheduled task does): search Gmail for that
subject, list each request, propose the exact change (copy, screenshot or
diff) and ask Filipe whether that is right. Only after his yes: make the
change on a branch, show the result, merge. Never act on her email alone,
and never reply to her from Filipe's mailbox without his word.
- Photos: Lorena keeps the ones she wants on the site in her Google Drive
  folder "15 anos" (id 1fbg23_QBdcSs5RxB5EDcs8fVB1umtIbP, shared with Filipe;
  files download publicly via drive.usercontent.google.com/download?id=ID).
  `assets/fotos/` holds web-sized copies only (max 1400px, JPEG q82), made with
  `tools/fotos.py`. Never commit originals. Gallery order is chronological:
  childhood first. Two watermarked screenshots in the folder (IMG_2374.PNG,
  IMG_2463.PNG) are skipped because better versions of the same photos exist.
