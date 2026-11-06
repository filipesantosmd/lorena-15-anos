# Design review: 15anosdalorena.com.br (editorial / luxury pass)

Reviewed 2026-11-06 at 1366px and 390px (Playwright), plus `index.html`, `assets/site.css`, `assets/site.js`, `index-config.js`. All ideas keep Lorena's choices (palette, Italiana + Jost, magazine reference with big type, polaroids, ticker) and the constraints (static, Google Fonts only, no analytics, no budget, phones first, reduced motion respected). Measured facts: body 17px/1.6; `.capa h1` 177px desktop / 76px mobile; `.cab h2` 92px / 44px; `.eyebrow` 12px; `section.bloco` padding 72px / 52px; page height 12,021px desktop, 10,719px mobile; `--gold` is declared and never used; `Bodoni Moda` italic is downloaded but only referenced by `.capa h1 .amp`, which no element uses; `.polaroid.b` and `.galeria figcaption` are styled but never used in the HTML.

## Already good, keep

1. **The wordmark.** `LORENA` in Italiana at `clamp(76px,13vw,190px)` with `.06em` tracking, and the `QUINZE ANOS` deck in `--rose-deep` at `.3em`, is exactly the magazine feel of the reference. Do not shrink it.
2. **The polaroid cover with a dated figcaption** (`13 · 02 · 2027`, 3deg tilt, soft `0 18px 40px` shadow) and `fetchpriority="high"` on the hero image. It is the one object on the page that already feels like a keepsake.
3. **The engineering hygiene**: `width`/`height` on every image, `loading="lazy"` in the gallery, `prefers-reduced-motion` already switches off the ticker and the opening slide, `text-wrap:balance` on headings, honeypot instead of CAPTCHA, visible `:focus-visible` rings. Every idea below has to keep this.

## Ideas

### 1. Put the gold to work as the "jewellery" colour (small)
`--gold:#C9A24B` is Lorena's and it is never painted. Gold should not be a surface colour on this palette; it should be the small metallic details a printed invitation has: the ticker's `✦`, the `15` seal, the hairline under section titles, the polaroid caption dates, and the active state of the tab you are on. Used that way it reads as foil stamping instead of yellow.
```css
.faixa span:nth-child(even){color:var(--gold)}          /* the ✦ separators */
#abertura .selo{border-color:var(--gold);color:var(--gold)}
.cab h2::after{content:"";display:block;width:56px;height:1px;background:var(--gold);margin-top:18px}
.polaroid figcaption,.galeria figcaption{color:var(--gold)}
.topo nav a:hover{color:var(--rose-deep);text-decoration:underline;text-decoration-color:var(--gold);text-underline-offset:6px}
```
Rule of thumb: gold only on things 1px thin or 14px small. Never on buttons or backgrounds.

### 2. Use the italic Bodoni you are already paying for (small)
The font link downloads `Bodoni Moda ital 400` (a ~20KB request on every visit) and nothing uses it. An italic serif against Italiana's upright capitals is the classic editorial pairing from the reference, and it gives you a second voice without a new font. Use it for one word per heading, the figcaption dates, and the thank-you line.
```html
<h2>De lá <i class="it">até</i> aqui</h2>
<div class="sub">Quinze <i class="it">anos</i></div>
```
```css
.it{font-family:"Bodoni Moda",Didot,serif;font-style:italic;font-weight:400;text-transform:none;letter-spacing:0;color:var(--rose-deep)}
.cab h2 .it,.capa .sub .it{font-size:1.1em}
```
Also `.capa .quando b` ("Casa Quintal") would look better in Bodoni italic 22px than in Jost 500. If you decide against it, drop `Bodoni+Moda` from the `<link>`; either way the current state (loaded, unused) is the one wrong answer.

### 3. Give the opening screen a sequence and a reveal (small)
`#abertura` appears fully formed and leaves with a single `translateY(-100%)` in 0.9s. Luxury is pacing: the seal, then the eyebrow, then the name, then the date, then the button, each 120ms apart, and a two-layer exit (a blush sheet lagging behind the cream one) so the page feels unveiled rather than scrolled. Everything is CSS, gated by `prefers-reduced-motion`, and the `sessionStorage` once-per-visit logic stays.
```css
@media (prefers-reduced-motion:no-preference){
  #abertura .env>*{opacity:0;transform:translateY(14px);animation:sobe .7s cubic-bezier(.2,.7,.2,1) forwards}
  #abertura .selo{animation-delay:.1s} #abertura .eyebrow{animation-delay:.25s}
  #abertura h1{animation-delay:.4s} #abertura p{animation-delay:.55s} #abertura .btn{animation-delay:.7s}
  @keyframes sobe{to{opacity:1;transform:none}}
  #abertura::after{content:"";position:absolute;inset:0;background:var(--blush);z-index:-1;transition:transform 1.1s cubic-bezier(.77,0,.18,1)}
  #abertura.fechar::after{transform:translateY(-100%)}
}
```
Also wait for the display font before showing the name: in `site.js`, add `document.fonts.ready.then(()=>document.body.classList.add("fontes"))` and keep `#abertura h1{visibility:hidden}` until `body.fontes` (with a 1.5s CSS fallback via `animation`). Right now the 160px name can flash in Times before Italiana arrives, and that is the first thing a guest sees.

### 4. Compose the cover like a spread, not a two-column form (medium)
At 1366px the right column is a lone 420px polaroid floating in 600px of cream; at 390px the polaroid comes first (`.capa .foto{order:-1}`) and pushes `LORENA` below the fold, so the first screen after the opening is a photo and a top bar. Fix both with layering: a second, smaller polaroid tucked behind (the `.polaroid.b` rule exists and is unused), a huge outlined "15" as a watermark behind the type, and on mobile the name overlapping the bottom edge of the photo.
```html
<div class="pilha">
  <figure class="polaroid b"><img src="assets/fotos/01.jpg" ...><figcaption>2012</figcaption></figure>
  <figure class="polaroid foto"><img src="assets/fotos/capa.jpg" ...><figcaption>13 · 02 · 2027</figcaption></figure>
</div>
```
```css
.capa{position:relative;isolation:isolate}
.capa::before{content:"15";position:absolute;right:-.05em;top:-.1em;z-index:-1;font-family:var(--display);font-size:clamp(220px,34vw,520px);line-height:1;color:transparent;-webkit-text-stroke:1px var(--line)}
.pilha{position:relative}
.pilha .polaroid.b{position:absolute;inset:auto -6% 8% auto;width:62%;z-index:0;transform:rotate(-7deg)}
.pilha .polaroid.foto{position:relative;z-index:1}
@media (max-width:820px){
  .polaroid{max-width:270px}
  .capa .txt{margin-top:-56px;position:relative;z-index:2}   /* name rides up over the photo's white border */
  .capa .txt .eyebrow{white-space:normal} .capa .txt .eyebrow span{white-space:nowrap}
}
```
Wrap the three eyebrow parts in `<span>`s so "19H30" stops wrapping alone (it does now at 390px). Also delete `Você está convidado para a festa de 15 anos da Lorena!` from `.quando`: the opening screen already said it, and the duplicate makes the cover read like a form. Replace with the time and dress note if there is one.

### 5. Make the gallery chronological on purpose: year chapters and captions (medium)
The 27 polaroids are chronological but nothing tells the guest; the bottom band of every polaroid (34px of white padding) is empty even though `.galeria figcaption` is styled and waiting. Add a year (or age) under each photo and insert a full-width Italiana numeral every time the year changes. This turns a grid into a story, which is the whole point of "De lá até aqui". It needs the family to supply years; a rough "2012 · 2015 · 2019 · 2023 · 2026" is enough.
```html
<h3 class="ano">2012</h3>
<figure><img ...><figcaption>Primeiro aniversário</figcaption></figure>
```
```css
.galeria .ano{grid-column:1/-1;font-size:clamp(56px,9vw,120px);color:var(--line);-webkit-text-stroke:1px var(--rose);letter-spacing:.08em;margin:24px 0 -8px;text-align:right}
.galeria figcaption{font-family:"Bodoni Moda",serif;font-style:italic;text-transform:none;letter-spacing:.02em;font-size:14px;color:var(--muted)}
```
Two execution details: the `nth-child` tilt rules will shift when `.ano` rows are inserted, so move the tilt to `.galeria figure:nth-of-type(...)`; and set `object-position` per photo where the face is high in the frame (the current global `50% 30%` crops some foreheads in the 4/5 box; photos 08 and 21 are the ones to check).

### 6. Let images arrive instead of popping (small)
Lazy images snap into white boxes; old scans and new iPhone photos sit side by side with no unifying treatment. A blush placeholder, a 400ms fade on load, and one very light global grade (slight desaturation, warm) make the 27 photos feel like one album and the scroll feel smooth. All CSS plus 6 lines of JS; `img.complete` handles the cached case.
```css
.galeria img,.polaroid img{background:var(--blush);filter:saturate(.92) contrast(1.02);opacity:0;transition:opacity .5s ease}
.galeria img.ok,.polaroid img.ok{opacity:1}
@media (prefers-reduced-motion:reduce){.galeria img,.polaroid img{opacity:1;transition:none}}
```
```js
document.querySelectorAll(".galeria img,.polaroid img").forEach(function(i){
  var ok=function(){i.classList.add("ok")}; i.complete?ok():i.addEventListener("load",ok,{once:true});
});
```
Also add `decoding="async"` to the gallery `<img>`s and consider `sizes`/`srcset` at 700px for the phone (the 1400px files are 2x what a 174px-wide polaroid column needs; this is the single biggest win for the mobile loading feel).

### 7. Fix the type scale between 17px and 92px (small)
The scale jumps from `.eyebrow` 12px to body 17px to `h2` 92px with nothing between, so section intros (`.cab p`, 17px, muted) look like footnotes under a 92px title, and `.endereco` (20px) and `.lista` (18px) are the only mid sizes. Add one "lead" step and let the tracking breathe at mobile sizes, where `.06em` uppercase Italiana at 44px is tight.
```css
:root{--lead:clamp(19px,1.5vw,22px)}
.cab p,.capa .quando{font-size:var(--lead);line-height:1.5}
.cab h2{letter-spacing:clamp(.03em,.5vw,.06em)}
section.bloco{padding-block:clamp(64px,9vw,112px)}        /* was fixed 72/52 */
.cab{margin-bottom:clamp(28px,4vw,48px)}
```
And consider sentence case for section titles only (`text-transform:none` on `.cab h2`): "De lá até aqui" and "Confirme sua presença" in Italiana lower case are far more editorial than all-caps, and it keeps the caps for where they belong, the name and the ticker. The reference site does exactly this mix.

### 8. Section transitions: numbered chapters and a slower ticker edge (small)
Sections are separated by a 1px `--line` border, which is correct but anonymous. A chapter number next to the eyebrow (`01 — Galeria`) is a magazine convention that costs nothing, and the ticker should fade at its edges and pause on hover so it feels like a printed band, not a marquee.
```css
.cab .eyebrow::before{content:counter(sec,decimal-leading-zero) "  —  ";color:var(--gold)}
main{counter-reset:sec} section.bloco{counter-increment:sec}
.faixa{mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.faixa:hover .trilho{animation-play-state:paused}
.faixa .trilho{animation-duration:60s}    /* 40s reads as hurried on desktop */
```
If you want one scroll-triggered motion, limit it to the `.cab` blocks: `opacity 0 → 1, translateY 12px → 0`, driven by a 10-line `IntersectionObserver`, and only inside `@media (prefers-reduced-motion:no-preference)`. Do not animate the polaroids on scroll; 27 of them moving is noise.

### 9. Forms that look like the rest of the invitation (medium)
The forms are clean but generic: white card, `border-radius:8px`, uppercase muted labels, native `<select>` arrows, and `.rodape` with the deadline and a button on opposite ends. Make them feel like a reply card: paper-coloured card with a hairline inset border, a title in Italiana, a custom gold chevron on selects, and a short description under the submit.
```css
form.f{background:var(--paper);border:1px solid var(--line);outline:1px solid var(--line);outline-offset:6px;border-radius:0;padding:32px 28px}
form.f::before{content:"Cartão de resposta";font-family:var(--display);font-size:26px;letter-spacing:.08em;text-transform:uppercase}
form.f select{appearance:none;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' fill='none' stroke='%23C9A24B' stroke-width='1.5'/%3E%3C/svg%3E") no-repeat right 2px center;padding-right:22px}
form.f input::placeholder{color:#B9A6AC}
form.f input:focus,form.f select:focus,form.f textarea:focus{border-bottom-color:var(--gold);box-shadow:0 1px 0 var(--gold)}
.btn{transition:background .15s,color .15s,transform .15s,box-shadow .15s}
.btn:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(184,76,102,.22)}
```
Two usability points that read as polish: the `.erro` message is a plain red line; give it `padding:10px 14px;background:var(--blush);border-left:2px solid var(--rose-deep)`. And `hidden` labels (`#r-acomp-label`, `#r-bus-extra`) appear with no transition; a `grid-template-rows:0fr → 1fr` wrapper (pure CSS) makes them unfold.

### 10. A thank-you moment, not a thank-you box (small)
`.obrigada` is `display:none → block` with a centred `OBRIGADA!`. This is the emotional peak of the site and it is the flattest moment. Three things: use the guest's name (`d.nome` is already in `site.js`), let the card scale in, and add "Salvar na agenda" as a `.ics` data URI, which is free, static, and the thing guests actually need next. Keep the WhatsApp button as the primary action.
```js
$("#ok-rsvp h3").textContent = "Obrigada, " + d.nome.split(" ")[0] + "!";
var ics = "BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART;TZID=America/Sao_Paulo:20270213T193000\nSUMMARY:Os 15 da Lorena\nLOCATION:Casa Quintal, Av. Angélica 2278, São Paulo\nEND:VEVENT\nEND:VCALENDAR";
$("#ok-rsvp-ics").href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
```
```css
@media (prefers-reduced-motion:no-preference){
  .obrigada.aparece{animation:pop .6s cubic-bezier(.2,.8,.2,1)}
  @keyframes pop{from{opacity:0;transform:scale(.96) translateY(8px)}}
}
.obrigada::before{content:"✦";display:block;color:var(--gold);font-size:22px;margin-bottom:10px}
```
(Set `.aparece` in `enviar()` where `ok.style.display="block"` is set. Add `<a class="btn" id="ok-rsvp-ics" download="os-15-da-lorena.ics">Salvar na agenda</a>` beside the WhatsApp button.)

### 11. A countdown somewhere quiet (small)
"Alive" on a static site means something that changes between visits. A countdown in the footer (or under the cover's `.quando`) in Italiana numerals ("Faltam 99 dias") is 6 lines of JS, needs no library, and is the one element guests will screenshot. Put it in the footer so the cover stays calm, and make it read "É hoje" on the day.
```html
<footer><b>Lorena</b><div class="conta"><span id="dias">—</span> dias</div>13 de fevereiro de 2027 · Casa Quintal · São Paulo</footer>
```
```css
footer .conta{font-family:var(--display);font-size:clamp(40px,6vw,72px);letter-spacing:.08em;color:var(--rose-deep);margin:10px 0 14px}
footer .conta span{color:var(--ink)}
```
```js
var d=Math.ceil((new Date(2027,1,13,19,30)-new Date())/864e5); $("#dias").textContent=d>0?d:"É hoje";
```
While you are in the footer: add the gold `✦`, a one-line "Com carinho, a família da Lorena", and raise `padding-block` to `72px 88px` so the page ends with air instead of a strip.

### 12. Mobile: a sticky "Confirmar" pill instead of a hidden nav (small)
At `max-width:820px` the nav is `display:none` and nothing replaces it, so the only route to the RSVP from the gallery is to scroll 10,700px. A single floating pill (`position:fixed;bottom:16px`) that appears after the cover scrolls away gives the phone the one action that matters, and the `IntersectionObserver` for it is the same one from idea 8. Hide it while `#confirmar` is on screen so it never covers the form.
```css
.pill{position:fixed;left:50%;bottom:max(16px,env(safe-area-inset-bottom));transform:translate(-50%,120%);transition:transform .3s;z-index:40;box-shadow:0 10px 30px rgba(58,42,48,.2)}
.pill.ver{transform:translate(-50%,0)}
@media (min-width:821px){.pill{display:none}}
```
And make `.topo` sticky with a blur so the wordmark stays as a running head: `position:sticky;top:0;background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(8px);z-index:30` (drop the blur under `prefers-reduced-transparency` if you want to be thorough).

## Suggested order
Small and immediate: 1, 2, 3, 6, 7, 8, 10, 11, 12 (one afternoon, all CSS/JS, no content needed). Medium, needs a decision or content from the family: 4 (which second photo), 5 (years for the chapters), 9 (copy for the reply-card title). Nothing here changes a fact, a colour, or a font Lorena chose; every motion addition sits inside `@media (prefers-reduced-motion:no-preference)`.
