# Social and Gen-Z review: 15anosdalorena.com.br

Reviewed 2026-11-06 on a 390px phone emulation (Playwright, iPhone UA), opening screen clicked, full page scrolled (page is about 10,700px tall on a phone), plus `index.html`, `assets/site.js`, `assets/site.css` and `index-config.js` read in full.

## What I actually saw

- Opening screen: blush background, a thin-ring "15" seal, eyebrow "VOCÊ ESTÁ CONVIDADO", LORENA in Italiana, the date, one button "ABRIR CONVITE". It slides up (0.9s) and is remembered per tab with `sessionStorage`. No animation beyond the slide; the wrapper is even called `.env` (envelope) but nothing envelope-like happens.
- Cover: on a phone the tilted polaroid (pool photo, caption "13 · 02 · 2027") comes first, then "SÁBADO · 13 DE FEVEREIRO DE 2027 · 19H30", LORENA, QUINZE ANOS, "Casa Quintal · Consolação, São Paulo", "Você está convidado para a festa de 15 anos da Lorena!", two buttons (Confirmar presença / Como chegar).
- Ticker in rose-deep: date, venue, city, 19h30, "Confirme até 31 de dezembro".
- Gallery "De lá até aqui": 27 polaroids, chronological (Minnie ears at a party, mermaid tail, boat, up to prom-style dresses, friend groups, a boy with a guitar, family photos). On a phone that is roughly 5,000px of scrolling before "Casa Quintal".
- Local: address, Google Maps + Waze buttons, and an embedded Google Maps iframe (rendered as an empty pink box in the headless run).
- Ônibus: clear rules (only teens without parents, two buses: igreja Jundiaí / Bonfim Campinas and escola), a bus form, two WhatsApp numbers for doubts.
- Presentes: "Sua presença já é o presente", a 9-item ideas list, sizes P/38 and 37.
- RSVP: name, WhatsApp, headcount (1-6), bus, companions, guardian contact when a bus is picked, honeypot, success card "OBRIGADA!" with the button "Confirmei! no WhatsApp". Posts to the Apps Script; falls back to wa.me with prefilled text.
- Footer: LORENA, date, venue.
- Head: `noindex, nofollow`, title "Os 15 da Lorena", a meta description, Google Fonts (Italiana, Bodoni Moda, Jost). **No Open Graph or Twitter tags at all, no favicon, no apple-touch-icon, no theme-color.** Bodoni Moda is loaded for a `.amp` class that no markup uses.
- At widths under 820px the whole `nav` is `display:none`, so on a phone there is no way to jump to Confirmar or Ônibus except the cover button or scrolling past all 27 photos.

## How the link looks when shared today

WhatsApp and Instagram DMs build the preview from Open Graph tags; none exist. WhatsApp will fall back to the `<title>` ("Os 15 da Lorena") and the meta description, with no image or a grey globe, so the link lands in the group as a plain grey card. Instagram DM shows a bare link. Telegram and iMessage behave the same. For a Gen-Z group chat the preview card is the invitation's first impression, and right now it is the weakest moment of the whole site.

## Three things that already feel right

1. **The opening screen is a real "moment".** Seal, one word, one button. It reads like a magazine cover and it is already screenshot-worthy; friends will screenshot it for stories without being asked.
2. **"De lá até aqui" with the childhood photos first.** The Minnie-ears and mermaid-tail photos next to the prom dresses are exactly what her friends will scroll and screenshot ("olha ela pequena"). Chronological order was the right call.
3. **The voice of the RSVP flow.** "Sua presença já é o presente", "Obrigada!" in her own voice, "Agora manda um 'confirmei!' no WhatsApp da Lorena", "Nada de e-mail: qualquer contato será pelo WhatsApp". It sounds like a person, not a form, and it is how 15-year-olds actually communicate.

## Ideas (ordered by impact for effort)

### 1. Fix the WhatsApp / Instagram preview with a typographic share card (no face)

**What and why.** Add `og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `twitter:card=summary_large_image`, plus a favicon and apple-touch-icon with the "15" seal. The `og:image` should be a 1200x630 JPG in the site's palette: the seal, LORENA in Italiana, "13 · 02 · 2027 · Casa Quintal" and a tiny "toque para abrir o convite". This turns every forward in a group into a pink card that already looks like the invitation, which is what makes teens tap.

**Copy.**
- `og:title`: `Os 15 da Lorena`
- `og:description`: `Sábado, 13 de fevereiro de 2027, 19h30, Casa Quintal, São Paulo. Abre o convite e confirma até 31 de dezembro.`
- `theme-color`: `#B84C66` (Android address bar matches the ticker).

**Privacy.** Keep her face off the `og:image`: the preview is cached by WhatsApp and Meta servers and appears wherever the link is forwarded, including by people outside the guest list. A typographic card is also the one that matches the opening screen. `noindex` stays; OG tags do not affect indexing.

**Effort.** Small (one image, eight meta tags, two icon files).

### 2. A hashtag presented as "a sticker", used in close friends and stories, not for discovery

**What and why.** Pick `#Os15daLorena` (matches the site title and wordmark). Put it in the ticker between "19h30" and "Confirme até 31 de dezembro", in the footer under LORENA, and on the share card from idea 1. Present it as "marca a gente", not as a public campaign: among 15-year-olds the point of a party hashtag is to find each other's stories on the night, not to go viral.

**Copy.**
- Ticker: `✦ #Os15daLorena ✦`
- Footer line: `No dia, posta nos stories com #Os15daLorena. Melhor ainda: só pros Close Friends.`

**Privacy.** A hashtag is searchable on Instagram and TikTok even when the site is not. The nudge to post on Close Friends, and the family's instruction to the court and close friends to keep their accounts private that weekend, is the mitigation. Do not put the hashtag on the public `og:description`. Lorena should approve the hashtag; it is her name.

**Effort.** Small (copy only).

### 3. Countdown on the cover and the opening screen, plus "Salvar no calendário"

**What and why.** A "Faltam 99 dias" line is the most shared element of any teen party site; it is what people screenshot for stories at round numbers (100, 50, 30, 7, 1). Compute it client-side from the date in `index-config.js`, no server. Add a static `lorena15.ics` file and a button "Salvar no calendário": that is how Gen Z and parents alike avoid forgetting, and it works with no account on iPhone and Android.

**Copy.**
- Opening screen, under the date: `Faltam 99 dias` (singular `Falta 1 dia`, on the day `É hoje!`, after: `Foi inesquecível. Obrigada!`).
- Cover eyebrow unchanged; add a small line under the buttons: `Faltam 99 dias. Salvar no calendário`.
- `.ics` title: `Os 15 da Lorena`, location `Casa Quintal, Av. Angélica, 2278, Consolação, São Paulo`, description `Confirme até 31 de dezembro em 15anosdalorena.com.br`.

**Privacy.** None; everything runs in the browser, and the `.ics` file holds only party facts already on the page.

**Effort.** Small (about 20 lines of JS, one `.ics` file, a button).

### 4. "Eu vou!" story template after the RSVP

**What and why.** The success card "OBRIGADA!" is the emotional peak and today it ends with one WhatsApp button. Add a second button, "Baixar o 'Eu vou' pros stories", that downloads a 1080x1920 PNG (static file in `assets/`) in the pink palette: the seal, "EU VOU", "Os 15 da Lorena", "13 · 02 · 2027", a blank polaroid frame where the friend puts their own photo with the Instagram sticker tools, and the hashtag. Friends posting "eu vou" is the single biggest driver of RSVPs in this age group; it is peer confirmation. Offer the same file in a "Stories" link in the footer for people who confirmed via family.

**Copy.**
- Success card: `Obrigada! Presença confirmada. Agora manda um "confirmei!" no WhatsApp da Lorena. Se quiser, posta o "eu vou" nos stories e marca a gente.`
- Buttons: `Confirmei! no WhatsApp` (keep) and `Baixar o "Eu vou"`.

**Privacy.** The template carries no photo of Lorena and no address, only date and the name of the party, because it will be posted publicly by friends with public accounts. The friend adds their own face, which is their decision.

**Effort.** Small to medium (one designed PNG; a `download` attribute on a link). If Lorena wants three variants (eu vou / confirmei / contagem regressiva), still medium.

### 5. Song requests inside the RSVP ("A música que não pode faltar")

**What and why.** Add one optional field to the RSVP form, right after headcount: `Uma música que não pode faltar`. It goes to the same Google Sheet as a new column and the family hands the list to the DJ. Zero backend beyond the sheet column (check the Apps Script appends unknown keys or add the key explicitly). It is the cheapest way to make the site "dela e da turma": every friend gets a stake in the night. Later, a plain "Ouvir a playlist" button linking out to a Spotify or YouTube Music playlist the family curates (a link, never an embed: Spotify and YouTube embeds set cookies and track).

**Copy.**
- Field label: `Uma música que não pode faltar (opcional)`; placeholder: `Nome da música e artista`.
- Success card line when filled: `Anotamos a música. Sem garantias, mas o DJ vai saber.`
- Later button: `Ouvir a playlist da festa` (external link).

**Privacy.** Song titles are not sensitive. Keep the list in the family sheet; do not display who requested what. Link, do not embed, any streaming service.

**Effort.** Small (one input, one sheet column, one line in the WhatsApp fallback text).

### 6. Mural de recados: captured now, shown by the family, not on the public page

**What and why.** Add an optional textarea to the RSVP: `Deixa um recado pra Lorena`. It lands in the sheet, is visible to the family on `lista.html`, and gets printed or read at the party (a wall of printed notes on the day is a classic 15-anos moment and costs nothing). After the party, Lorena picks her favourite 10 to 15 and they become a static section on the site ("O que vocês disseram"), first name only, no surnames. This gives family members (grandparents, aunts) the warm channel they want, and teens the inside-joke channel they want.

**Copy.**
- Field: `Deixa um recado pra Lorena (opcional)`; placeholder: `Pode ser uma lembrança, um desejo ou uma piada interna.`
- Post-party section eyebrow/title: `Recados` / `O que vocês deixaram pra ela`.

**Privacy.** Never render submitted text on the public page automatically: a static site cannot moderate, and she is a minor. Curation by the family, hand-copied into a static JSON or HTML, is the only safe path. First names only.

**Effort.** Small for capture; medium for the curated post-party section.

### 7. Quiz "Quanto você conhece a Lorena?" with a shareable result

**What and why.** Six to eight multiple-choice questions written by Lorena (cor preferida, comida, série, artista, lugar favorito, "o que ela faz quando está nervosa"), all client-side, no storage. The result screen is the fun bit: `Você acertou 7 de 8. Amiga de verdade.` with a button that opens WhatsApp with the score text so friends compete in the group. This is the Gen-Z "entertainment" layer the site is missing, and it is entirely about her.

**Copy.**
- Section: eyebrow `Jogo`, title `Quanto você conhece a Lorena?`, intro `Oito perguntas. Sem cola.`
- Result tiers: 0-3 `Precisa de mais tempo com ela.` / 4-6 `Conhece bem.` / 7-8 `Amiga de verdade (ou mãe).`
- Share text: `Fiz 7/8 no quiz da Lorena. Tenta aí: 15anosdalorena.com.br`

**Privacy.** Questions must stay on preferences, never on facts that locate or identify her (school name, neighbourhood, full birthday, church). The share text carries the URL, which is already shared by WhatsApp anyway; it does not add exposure.

**Effort.** Medium (one JS block, a small data array in `index-config.js`, result card styled like `.obrigada`).

### 8. Easter eggs that reward curiosity

**What and why.** Teens explore sites by tapping things. Three cheap surprises, all CSS/JS: tap the "15" seal on the opening screen three times and it spins and the eyebrow changes to a phrase Lorena picks; tap any gallery polaroid and it flips to show a one-line caption in her words ("eu tinha 4 anos e achava que era sereia"); after midnight on 13/02 the ticker changes to `É HOJE ✦ É HOJE ✦`. These are the details friends DM each other about.

**Copy.** Captions come from Lorena, one per photo, in `index-config.js`; the flip tooltip default: `toca pra ver`.

**Privacy.** Captions must not say where a photo was taken (school, church, home address) or name other minors. First names of friends are fine if those friends say yes.

**Effort.** Small each; the gallery captions are the only one that needs her time (27 lines).

### 9. Feature the friends and the court without exposing them

**What and why.** The gallery already shows friends (the trio in dresses, the guitar photo), so friends are implicitly featured. If there will be damas e cavalheiros, a short section "A turma" works best as first names in a hand-set typographic list with the same polaroid tilt, not photos, unless each family agrees. Simpler and very effective for teens: a live-ish social proof line `Já confirmaram 48 pessoas` updated by hand in `index-config.js` (`confirmados: 48`) from the sheet. Seeing the number go up is what makes the undecided confirm.

**Copy.**
- Section: eyebrow `A turma`, title `Quem vai estar lá`, intro `As damas, os cavalheiros e quem a Lorena não solta.`
- Social proof: `Já confirmaram 48 pessoas. Falta você.`

**Privacy.** Photos of other minors go on the public page only with their parents' yes, in writing (WhatsApp is fine). First names only, no surnames or schools. The count is a number, not a list.

**Effort.** Small for the count and a names list; medium if photos with consents are gathered.

### 10. Photo wall after the party, same polaroid grid

**What and why.** On 14/02 the site should turn into the album: the opening screen becomes `Foi inesquecível. Obrigada!`, the gallery gets a second block `A festa` with 20 to 30 curated photos, and a button `Manda suas fotos` that opens WhatsApp (not an upload form, which a static site cannot moderate). The same site that invited becomes the site everyone reopens for a week, and the family keeps full control.

**Copy.**
- Opening screen after the date: eyebrow `Foi incrível`, h1 `Obrigada`, button `Ver as fotos`.
- Block: eyebrow `13 · 02 · 2027`, title `A festa`, intro `As fotos que vocês mandaram e as do fotógrafo. Manda as suas pelo WhatsApp.`
- Button: `Manda suas fotos` → `wa.me/<number>?text=Fotos da festa da Lorena`.

**Privacy.** Curated by the family with `tools/fotos.py`, faces of other minors only with a yes, no watermarked screenshots, originals never committed. Keep `noindex`.

**Effort.** Medium (date switch in JS, one new block, the photo pass).

### 11. Make the opening animation a moment, not just a curtain

**What and why.** The screen already has the right ingredients. Three small upgrades: the seal "15" draws its ring in (CSS stroke animation) and the letters of LORENA fade up one by one (0.6s total); the button label becomes warmer; the countdown from idea 3 sits under the date. Optional: a two-panel envelope flap that opens on tap, using the `.env` wrapper the markup already has. No sound, no autoplay: teens open links on mute in class.

**Copy.** Button: `Abre aí` for the teen voice, or keep `Abrir convite` if the family prefers neutral; a compromise that works for both audiences is `Abrir o convite` with the eyebrow `É pra você`.

**Privacy.** None.

**Effort.** Small for the ring/letter animation; medium for an envelope flap. Respect `prefers-reduced-motion` as the CSS already does for the ticker.

### 12. Tone of the Portuguese copy: teen touches in three places, parents everywhere else

**What and why.** The copy is already warm and clear; the risk is not formality but sameness. Keep Local, Presentes and the RSVP body as they are (parents and grandparents read those). Put the teen voice where teens actually look: the opening screen, the ticker, the Ônibus intro and the success cards. Also fix the gendered "Você está convidado" (half the guest list is female and Gen Z notices): use a form that avoids the agreement.

**Copy.**
- Opening eyebrow: `Você está na lista` (instead of `Você está convidado`).
- Cover line: `Vem comemorar os 15 anos da Lorena!` (instead of `Você está convidado para a festa de 15 anos da Lorena!`).
- Ônibus intro first line: `Vai sem os pais? Tem ônibus. São dois: um pro pessoal da igreja (Jundiaí e Bonfim, em Campinas) e outro pro pessoal da escola. O ponto de encontro a gente avisa depois pelo WhatsApp.`
- Ônibus success: `Anotado. Seu lugar no ônibus está pedido. O ponto de encontro vem pelo WhatsApp.`
- RSVP success (no bus): `Presença confirmada! Agora manda um "confirmei!" pra Lorena no WhatsApp.`
- Ticker: add `✦ Vem! ✦`.

**Privacy.** None.

**Effort.** Small (copy only; "pro/pra" contractions are deliberate and read as natural pt-BR for this audience; parents will not mind them in those spots).

### 13. The "Confirmei!" WhatsApp message

**What and why.** Today the prefilled text is `Confirmei! Nome (3 pessoas: a, b)`. It is functional and it is what Lorena receives dozens of times, so it should be fun to receive and easy to scan. Make it one line per fact, with the name first so her chat list is readable, and add the song from idea 5 if filled.

**Copy** (built in `site.js` from the form):
```
Confirmei! Eu vou nos 15 da Lorena 💗
Nome: Maria Clara
Vamos em 3: Maria Clara, Ana, João
Ônibus: Escola (responsáveis: (19) 9xxxx-xxxx)
Música: As It Was, Harry Styles
```
Single guest, no bus: `Confirmei! Eu vou nos 15 da Lorena 💗` + `Nome: Maria Clara`. Keep the emoji (it is the only place an emoji belongs on the site; WhatsApp is its native habitat) or drop it if the family prefers.

**Privacy.** The message goes to the number in `index-config.js` (`5519981174550`), which is also the first "Dúvidas" number in the Ônibus section, while the copy says "WhatsApp da Lorena". If that number is a parent's, say `no WhatsApp da família da Lorena`; if it is Lorena's own, consider whether every guest and every guest's parent should have a minor's number, and route "confirmei" to a parent and keep Lorena's for friends only. Worth one question to Filipe.

**Effort.** Small.

## Supporting fixes that affect sharing and conversion (not social ideas, but seen on the phone)

- **No navigation on phones.** `.topo nav{display:none}` under 820px, and the RSVP form sits after about 5,000px of photos. Add a sticky bottom bar on phones with `Confirmar · Ônibus · Local`, or at least a "Confirmar presença" pill that stays visible after the cover scrolls away. Effort small; this is the single biggest RSVP leak for friends who open the link in a group and skim.
- **The Google Maps iframe is a third-party embed that sets Google cookies**, which contradicts "no third-party trackers", and in my headless run it rendered as an empty pink box. The two buttons (Maps, Waze) are what teens use anyway. Replace the iframe with a static image of the map (a screenshot or a simple hand-drawn block "Av. Angélica, 2278, a 400 m do metrô" if that is true; confirm with the family) or just drop it. Effort small.
- **Dress code is missing** and "o que eu visto?" is the first question every teen will ask in the group. If the family has an answer, a two-line "O que vestir" block near Local saves the family a hundred messages. Fact for the family to decide, not for me.
- `Bodoni Moda` is loaded for an unused `.amp` class; dropping it is one less font request on a cellular connection.
- Add `<link rel="icon">` and `apple-touch-icon` with the seal so "Adicionar à Tela de Início" and the browser tab look intentional.

## Suggested order if time is short

1 (preview card and icons), 3 (countdown and calendar), 12 and 13 (copy and the WhatsApp message), the sticky mobile bar, then 4 (story template), 5 (song field), 6 (recados capture). Those are all small, all static, all privacy-neutral, and together they make the link feel like hers in the group chat. 7, 8, 9 and 10 are the "wow" layer for later, each one gated on content from Lorena or consent from other families.
