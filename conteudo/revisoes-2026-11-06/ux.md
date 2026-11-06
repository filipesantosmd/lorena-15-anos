# UX review: 15anosdalorena.com.br (2026-11-06)

Method: Playwright (Chromium), iPhone-class viewport 390x844 and desktop 1366x768. Passed the opening screen, scrolled the whole page, submitted the RSVP empty, filled it with 3 people + bus and submitted against a mocked Apps Script (`{"ok":true}`), reloaded, submitted the bus form empty, opened lista.html with a wrong password. Read `index.html`, `assets/site.js`, `assets/site.css`, `lista.html` in the repo.

Note on versions: the live deploy is one step behind the repo. Live, the bus form is always visible under "Ônibus" and there is no `#aviso-rsvp` / localStorage memory; the repo has the collapsed `<details>` "Já confirmei e esqueci de pedir o ônibus" and the "Você já confirmou presença neste aparelho" notice. Ideas below assume the repo version ships.

## What already works well

1. **Validation in plain Portuguese, with focus.** Empty submit shows "Falta preencher: seu nome completo, seu whatsapp." and moves focus to the first empty field; the bus form says "Falta preencher: nome, contato dos responsáveis, seu contato, qual ônibus?". If the POST fails, the error offers "confirme pelo WhatsApp" as a fallback. Real `<label>` elements wrap every input, so tapping the label focuses the field.
2. **Warm, honest copy.** "Sua presença já é o presente.", "Seus dados ficam só com a família da Lorena... Nada de e-mail: qualquer contato será pelo WhatsApp.", "Confirmou e mudou algo? Envie de novo com o mesmo WhatsApp que a gente atualiza, sem duplicar." These are exactly the reassurances guests need, and the thank-you state adapts ("Presença confirmada e lugar no ônibus pedido...") when a bus was chosen.
3. **Solid technical basics.** Every photo has `width`/`height` (no layout jumps), `loading="lazy"` on the 27 gallery photos, `fetchpriority="high"` on the cover, `prefers-reduced-motion` stops the marquee and the opening animation, `:focus-visible` outlines are 3px rose, Maps and Waze buttons both open in a new tab, the honeypot is `aria-hidden` and `tabindex="-1"`. Tab order on desktop is sensible (brand, 5 nav links, the two CTAs).

## Ideas

### 1. Add Open Graph tags so the WhatsApp link preview shows Lorena, not a blank card
- **Observed:** the live `<head>` has only `charset`, `viewport`, `robots noindex`, and `description`. No `og:title`, `og:image`, `og:description`, no favicon/apple-touch-icon. In WhatsApp the link renders as a grey card with the domain and "Os 15 da Lorena"; many guests will not tap a bare link. (`noindex` is unrelated: WhatsApp still reads OG tags.)
- **Fix:** add to both pages' `<head>`:
  `<meta property="og:title" content="Os 15 da Lorena">`
  `<meta property="og:description" content="Sábado, 13 de fevereiro de 2027, 19h30 · Casa Quintal, São Paulo. Abra para confirmar presença.">`
  `<meta property="og:image" content="https://15anosdalorena.com.br/assets/og.jpg">` plus `og:image:width/height` (1200x630), `og:url`, `og:type website`, and `<meta name="twitter:card" content="summary_large_image">`. Make `assets/og.jpg` a 1200x630 crop of `capa.jpg` with the text "Lorena · 15 anos · 13.02.2027" baked in, under 300 KB (WhatsApp skips heavier images). Add a 180x180 `apple-touch-icon` with the "15" seal so "Add to Home Screen" looks right. Test with `curl -A WhatsApp` after deploy; WhatsApp caches previews, so set it right the first time.
- **Effort:** small.

### 2. Give the opening screen the three facts and a gender-neutral greeting
- **Observed:** the overlay shows the seal "15", "VOCÊ ESTÁ CONVIDADO", "LORENA", "Sábado, 13 de fevereiro de 2027" and a 160x51px "ABRIR CONVITE" button in 13px uppercase. No time, no city. "Convidado" is masculine; half the guests are girls and mothers/grandmothers. The overlay also stays in the accessibility tree without `role="dialog"`, and the page behind it is still readable by screen readers.
- **Fix:** copy: eyebrow "VOCÊ ESTÁ CONVIDADO" → "COM CARINHO, PARA VOCÊ" (or "SEU CONVITE"); line under the name → "Sábado, 13 de fevereiro de 2027 · 19h30 · São Paulo". Make the button larger and warmer: `padding:18px 34px; font-size:15px`, text "Abrir o convite ✦". Add `role="dialog" aria-modal="true"` to `#abertura`, set `inert` on `header`/`main`/`footer` while it is open (remove on `abrir()`), and move focus to `.capa h1` (`tabindex="-1"`) after it closes.
- **Effort:** small.

### 3. Mobile has no navigation: a sticky bottom bar with "Confirmar" and "Como chegar"
- **Observed:** `.topo nav{display:none}` under 820px. On the phone, `#confirmar` starts at 9,317px of a 10,719px page; `#local` at 6,593px. After the cover, a guest scrolls through roughly 5,500px of photos before reaching the address, and the only in-page shortcuts are the two cover buttons, which sit at 862px (just below the fold at 844px, see screenshot: the first screen ends at "Você está convidado para a festa de 15 anos da Lorena!").
- **Fix:** on `max-width:820px`, add a fixed bottom bar (`position:fixed; bottom:0; padding-bottom:env(safe-area-inset-bottom)`) with two buttons: "Confirmar presença" (`#confirmar`) and "Como chegar" (`#local`), hidden while `#abertura` is open and while `#confirmar` is in view (IntersectionObserver, 6 lines). Alternatively keep the nav as a horizontally scrollable row of chips under the header ("Fotos · Local · Ônibus · Presentes · Confirmar"). Also swap the order on the cover so the eyebrow with date/time comes before the polaroid (`order:-1` currently puts the photo first), so date, time and venue are on the first screen.
- **Effort:** small.

### 4. Make the key facts big and scannable: a facts card with add-to-calendar
- **Observed:** the most important line, "SÁBADO · 13 DE FEVEREIRO DE 2027 · 19H30", is the smallest text on the page: 12px uppercase with `.22em` tracking, in `--rose-deep` on blush (about 4.6:1, passes AA but hard for a 70-year-old). The end time, dress code and "pais são bem-vindos?" are not stated anywhere; "Ônibus somente para os jovens que vão sem os pais" is the only hint that parents may come. There is no add-to-calendar.
- **Fix:** under the cover, replace the marquee-only repetition with a three-cell facts card in 18-20px body text: "**Quando** Sábado, 13 de fevereiro de 2027, das 19h30 às 1h" (confirm end time with the family), "**Onde** Casa Quintal · Av. Angélica, 2278, Consolação", "**Traje** Esporte fino" (or whatever Lorena decides; if nothing, "Venha como se sentir bem"). Add a "Salvar na agenda" button: a static `assets/lorena15.ics` (`DTSTART;TZID=America/Sao_Paulo:20270213T193000`, `LOCATION:Casa Quintal, Av. Angélica, 2278...`, `URL:https://15anosdalorena.com.br`) plus a Google Calendar link (`https://calendar.google.com/calendar/render?action=TEMPLATE&text=15+anos+da+Lorena&dates=20270213T223000Z/20270214T040000Z&location=...`). Both are free and work on iPhone and Android.
- **Effort:** small.

### 5. Require the companions' names when "Quantas pessoas" > 1, and count them
- **Observed:** with "3" selected and "Nomes de quem vem com você" left empty, the form submitted fine (textarea is never `required`), the sheet got `"acompanhantes":""` and the WhatsApp text became `Confirmei! Maria Teste (3 pessoas: ). Ônibus: Escola...`. The family then has 3 seats with one name. The textarea placeholder "Um nome por linha" is the only instruction and disappears on typing.
- **Fix:** when `pessoas !== "1"`, set `#r-acomp.required = true` and change the label to "Quem vem com você? (2 nomes, um por linha)" with the number computed from the select. In `valida`, if the non-empty lines are fewer than `pessoas - 1`, show "Você marcou 3 pessoas, então faltam 2 nomes além do seu." Build the WhatsApp summary as "Confirmei! Maria Teste + Ana Teste e João Teste (3 pessoas)". Also replace the select options "2, 3, 4..." with "2 pessoas, 3 pessoas..." so the collapsed select reads as a sentence.
- **Effort:** small.

### 6. Help with the WhatsApp number: mask, digit check and a clear "why we ask"
- **Observed:** "SEU WHATSAPP" accepted `11999990000` unformatted; nothing checks that it has 10 or 11 digits, and the thank-you WhatsApp text carries the raw digits. Since the number is also the dedupe key ("Envie de novo com o mesmo WhatsApp que a gente atualiza"), a typo on the second visit creates a duplicate row, and the family cannot reach the guest.
- **Fix:** on `input`, format as `(11) 99999-0000` (strip non-digits, then insert punctuation; 15 lines, no library) and validate `digits.length === 10 || 11`, with the message "Confira o WhatsApp: precisa ter DDD e o número, por exemplo (11) 99999-0000." Add a helper line under the field: "Só para a família combinar a festa com você." Set `autocomplete="tel-national"`. Keep `inputmode="tel"` (already there).
- **Effort:** small.

### 7. Make the "Confirmei!" WhatsApp step optional and explain it
- **Observed:** the thank-you box says "Presença confirmada. Agora manda um \"confirmei!\" no WhatsApp da Lorena." and the only button is "CONFIRMEI! NO WHATSAPP". After the form has already written to the sheet, this reads as a second mandatory task, and an older guest will wonder whether the first step failed. The prefilled text also includes the parents' phone ("responsáveis: 19999990000"), which a teen may not want to send from their own chat.
- **Fix:** rewrite the box: "**Prontinho, obrigada!** Sua presença está confirmada. Se quiser, mande um oi pra Lorena (ela adora saber quem vem):" with the button "Mandar um oi no WhatsApp" and a secondary link "Voltar ao convite". Prefill a friendlier message: `Oi, Lorena! Confirmei presença na sua festa de 15 anos: Maria Teste (3 pessoas). Até o dia 13! 🎉` and leave the bus/parents data out of the WhatsApp text (it is already in the sheet). Keep the full summary only in the fallback path (`enviar` → `catch`), where WhatsApp is the real channel.
- **Effort:** small.

### 8. Photos: 5.9 MB on mobile data, served at 1050-1400px for 157px slots
- **Observed:** one full scroll on the 390px viewport downloaded about 5.9 MB of JPEG (capa.jpg 333 KB, 13.jpg 380 KB, 15.jpg 357 KB, 18.jpg 329 KB...). Each gallery image renders at 157px wide (two columns) but the file is 783-1400px wide. Lazy loading helps only if the guest never scrolls; most will, because the form is below the photos. On a 4G plan in Campinas this is 10-20 seconds and real data cost.
- **Fix:** extend `tools/fotos.py` to also write `assets/fotos/sm/NN.jpg` at 480px (q75, ~40 KB each) and use `srcset="assets/fotos/sm/01.jpg 480w, assets/fotos/01.jpg 1050w" sizes="(max-width:820px) 45vw, 30vw"`. Cover: a 700px variant for phones via the same `srcset`. Optionally show 8 photos first with a "Ver mais fotos (19)" button that reveals the rest, which also brings the address and form 4,000px closer. Keep originals out of the repo as today.
- **Effort:** medium.

### 9. Larger type and stronger contrast for grandparents
- **Observed:** form labels are 13px uppercase in `#7D6670` (5.2:1 on white, fine) but with `.08em` tracking and all caps they are slow to read; buttons are 13px uppercase; the hint "Ônibus só para jovens que vão sem os pais..." is 14px muted on blush (`#7D6670` on `#FDEBEE`, 4.56:1, borderline); the eyebrow is 12px. The nav links (desktop) are 12px. Everything important that is not a headline is 12-14px.
- **Fix:** raise `.btn` to 15px, `form.f label` to 14px with `letter-spacing:.04em` (or sentence case, which the brand can afford for form labels), `.aviso` and `.prazo` to 15px with `color:var(--ink)` on blush, `.eyebrow` to 13px. Add `role="alert"` to `.erro` and `aria-live="polite"` to `.aviso` so screen readers announce validation and the "você já confirmou" notice. Confirm the whole page still reads at iOS "Larger Text" by testing with `html{font-size:120%}`.
- **Effort:** small.

### 10. Bus choice: hide it from guests it does not apply to, and show who the seat is for
- **Observed:** "VAI DE ÔNIBUS?" with "Igreja Jundiaí / Igreja Bonfim (Campinas) / Escola" is shown to every guest, including grandparents and families, and the rule "Ônibus só para jovens que vão sem os pais" appears only after a bus is picked. When a family of 3 picks a bus, only `d.nome` is booked (`bus = {nome: d.nome, ...}`), so a parent confirming for two teens books one seat under the parent's name. The repo's "Já confirmei e esqueci de pedir o ônibus" is good, but on live the bus form is fully visible, which invites double entries.
- **Fix:** add a helper under the select: "Só para jovens que vão sem os pais. Saída de Jundiaí, Campinas (Bonfim) ou da escola." Change the label to "Vai no ônibus dos jovens?" and the first option to "Não, vou por conta própria". When `pessoas > 1` and a bus is chosen, add "Quem vai no ônibus?" (textarea, prefilled with the names typed above) and post one `onibus` row per name, or at least include `acompanhantes` in the bus row so `lista.html` shows it. Ship the collapsed `<details>` (already in the repo) so the standalone bus form is hidden by default.
- **Effort:** medium.

### 11. Map section: add a ride link, parking line, and lighten the embed
- **Observed:** "Abrir no Google Maps" and "Abrir no Waze" are present and correct. The Google Maps iframe (`output=embed`) is the heaviest third-party load on the page and keeps the network busy (Playwright's `networkidle` never settled). No mention of parking, Metrô (Casa Quintal is near Higienópolis-Mackenzie / Consolação stations), or ride-hailing, which is how most 15-year-olds and many parents will arrive at night.
- **Fix:** add "Chamar Uber" (`https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=Av.%20Ang%C3%A9lica%2C%202278%2C%20Consola%C3%A7%C3%A3o%2C%20S%C3%A3o%20Paulo&dropoff[latitude]=...&dropoff[longitude]=...`) and a "Copiar endereço" button (`navigator.clipboard.writeText`). Add one line the family confirms: "Estacionamento: ... · Metrô mais próximo: ...". Replace the iframe with a static map image (a screenshot of the map saved as `assets/mapa.jpg`, ~60 KB) that links to Google Maps; the iframe can stay desktop-only via `<template>`/media query if the family likes it.
- **Effort:** small.

### 12. A "Compartilhar convite" button, and a visible countdown to the deadline
- **Observed:** the invitation is spread by WhatsApp, but there is no share action on the page; a teen who wants to forward it copies the URL from the in-app browser bar (hard inside WhatsApp's own browser). The deadline "Confirme até 31 de dezembro de 2026" is stated in text and in the marquee, with no sense of urgency; 31 December is New Year's Eve and easy to forget.
- **Fix:** add a round "Compartilhar" button in the footer and after the thank-you box: `navigator.share({title:"Os 15 da Lorena", text:"Convite da festa de 15 anos da Lorena, 13 de fevereiro de 2027", url:location.href})` with a fallback to `https://wa.me/?text=...`. Under "Confirme sua presença", compute "Faltam 55 dias para confirmar" from `C.prazo` (store it as ISO in `index-config.js`), switching to "Último dia para confirmar!" and then "O prazo passou, mas fale com a gente no WhatsApp" after 31 Dec.
- **Effort:** small.

### 13. Gallery captions as alt text: make the photos tell the story
- **Observed:** all 27 photos have `alt="Lorena, foto N de 27"`, the section is titled "De lá até aqui" and promises "de pequena até hoje", but there are no captions; `.galeria figcaption` is styled in CSS and never used. For a blind guest the gallery is 27 identical lines; for everyone else, the chronological order is invisible.
- **Fix:** ask Lorena for one short caption per photo (age or year plus a word: "2 anos, praia de Ubatuba", "Formatura do 5º ano", "Hoje"), put it in `<figcaption>` and reuse it as `alt`. Ten minutes of her time, and it turns the gallery into the emotional centre of the page. If she does not want captions, at least alternate alt text by era ("Lorena bebê", "Lorena criança", "Lorena hoje").
- **Effort:** small (content from Lorena), small code.

### 14. lista.html: feedback while the Apps Script wakes up, and a wrong-password message that arrives
- **Observed:** after submitting a wrong password the button read "Abrindo…" and no error had appeared after 4 seconds; the fetch has no timeout, so on a slow Apps Script cold start the family sees a disabled button indefinitely. The code shows "Senha errada." only when the script returns `error: "senha"`, otherwise "Não foi possível abrir a lista agora." There is no show-password toggle and the field has no hint.
- **Fix:** add a 15-second `AbortController` timeout with the message "A planilha demorou para responder. Tente de novo em alguns segundos." and a "Mostrar senha" toggle. Under the totals, add "Atualizado às HH:MM" and a "Baixar CSV" link (build from the JSON on the client) so the family can forward the list without opening Sheets. This page is for the family, so it is low priority for guests but high for the organisers in the last week.
- **Effort:** small.

### 15. The "já confirmou neste aparelho" memory: say what it means in one line, and offer "Começar do zero"
- **Observed (repo version):** on return the form is prefilled and the notice says "Você já confirmou presença neste aparelho como Maria Teste em 06/11/2026. Se enviar de novo, a sua confirmação é atualizada, não duplicada." The form title still says "Confirme sua presença" and the button "Confirmar presença", so a shared family phone (grandmother using her daughter's phone) will overwrite the daughter's RSVP without realising. Note also that WhatsApp's in-app browser on Android has its own storage, so the memory will not appear if the guest opens the link in Chrome later; the dedupe by WhatsApp number in the sheet covers that case.
- **Fix:** when a memory exists, change the heading to "Sua confirmação" and the button to "Atualizar confirmação", and add a small link "Confirmar outra pessoa neste celular" that clears the fields (not localStorage) and restores the original labels. Keep the notice but shorten it: "Já confirmado neste celular: Maria Teste, 06/11. Mudou algo? Edite e envie de novo."
- **Effort:** small.

## Priority order if time is short
1. Open Graph tags + og image (idea 1): affects every guest before they even open the site.
2. Mobile bottom bar + cover order (idea 3) and facts card with calendar (idea 4): the first 10 seconds.
3. Companion names required (idea 5) and WhatsApp number check (idea 6): data quality for the family.
4. Photo `srcset` (idea 8): mobile data.
5. Everything else.
