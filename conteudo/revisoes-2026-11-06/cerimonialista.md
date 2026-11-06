# Cerimonialista review: 15anosdalorena.com.br

Reviewed 2026-11-06 in Playwright at 1366 px and 390 px (opening screen, "Abrir convite", full scroll), plus the live HTML, assets/site.js and index-config.js. Note: the live page still shows the bus form open inside the "Ônibus" section; the local repo (commit 8bc5dc2) already has it behind the "Já confirmei e esqueci de pedir o ônibus" disclosure, which is the right call. The Google Maps iframe rendered as a blank pink box in headless Chromium; worth a check on a real phone, the two buttons below it work regardless.

## What the site does well (do not change)

1. **The envelope opening and the cover.** "15" in a thin circle, "VOCÊ ESTÁ CONVIDADO", LORENA in Italiana, one button "Abrir convite". It feels like a printed invitation being opened, which is exactly the emotion a 15 anos needs. Keep it, keep the one-per-visit behaviour.
2. **"Sua presença já é o presente. Se quiser dar algo, aqui vão ideias."** plus "Tamanho de roupa: P ou 38. Calçados: 37." This is the warmest and most useful gift section I have seen on a debutante site: no pressure, no prices, and the sizes stop the single most common question from aunts and godmothers.
3. **One RSVP for the whole family** ("Quantas pessoas vêm, contando você" + "Nomes de quem vem com você, um nome por linha") and the WhatsApp fallback when the form fails ("Não conseguimos enviar agora... confirme pelo WhatsApp"). Families confirm once, and nothing is lost if the Apps Script hiccups.

Also good and worth protecting: the ticker ("13 de fevereiro de 2027 ✦ Casa Quintal ✦ 19h30 ✦ Confirme até 31 de dezembro"), the chronological polaroid gallery "De lá até aqui", and the privacy line that data stays with the family.

## What is missing (each of these is a phone call to the family today)

### 1. Programação da noite (the timeline)
Guests of a 15 anos plan their evening around three moments: the entrance of the debutante, the valsa and the 15 velas (or the cake). Parents of teens want to know when it ends so they know when to pick up; grandparents want to know when the "parte cerimonial" happens so they do not miss it. The site says only "a partir das 19h30". Add a short section "A noite" between Local and Ônibus, with the times the family fills in (do not invent them):

> **A noite**
> 19h30 · Recepção e boas-vindas
> __h__ · Entrada da Lorena
> __h__ · Valsa e as 15 velas
> __h__ · Jantar
> __h__ · Balada
> __h__ · Encerramento
> *Chegue às 19h30: a entrada da Lorena é um dos primeiros momentos e vale a pena estar lá.*

Even a three-line version (recepção, momento das velas, encerramento) kills most calls. Effort: **small** (one section, same `.bloco` markup; the hours come from the family and the buffet).

### 2. Traje (dress code)
This is the question number one in every family WhatsApp group: "é longo? pode ir de tênis? e os meninos?". Nothing on the site says it. Add one line on the cover under "Casa Quintal · Consolação, São Paulo" and a short block in "A noite". The wording depends on what the family wants; the two usual options in São Paulo are:

> **Traje:** esporte fino. Mulheres: vestido midi ou longo; homens: camisa social, com ou sem blazer. Nada de preto fechado, por favor: a festa é rosa.

or, if the family wants it simpler:

> **Traje:** passeio completo. Vista-se para uma festa à noite.

Add "Traje ___" to the ticker as well so it is seen without scrolling. Effort: **small**.

### 3. Corte de honra, valsa e 15 velas (a warm, private note)
The court (damas e cavalheiros / amigos da valsa) and the 15 people who light candles are personal; names should not go on a public link. But guests do want to know that these moments exist, and the court needs instructions. A short paragraph in "A noite" does both without exposing anyone:

> **Valsa e 15 velas.** A Lorena vai dançar a valsa com a família e com os amigos mais próximos, e depois acender as 15 velas com as pessoas que marcaram a vida dela. Quem faz parte desses momentos recebe o combinado (ensaio, horário de chegada, cor da roupa) direto pelo WhatsApp. Se você está nesse grupo e ainda não recebeu nada, fale com a família.

This tells the court "wait for the WhatsApp" and tells everyone else what to expect. Effort: **small** (copy only; the mechanics stay on WhatsApp).

### 4. "Vindo de fora": parking, metro, and hotels for the Jundiaí and Campinas guests
The bus section already shows that a big part of the guest list comes from Jundiaí and Campinas. The adults in those families will drive or stay over, and the site gives them only an address. Add a short "Vindo de fora" block inside "Casa Quintal" with the facts the family confirms with the venue:

> **Chegando de carro.** [Há/Não há] estacionamento na Casa Quintal / valet na porta (R$ __). Uber e 99 deixam na porta, na Av. Angélica.
> **De metrô.** Estação mais próxima: ____ (linha __), cerca de __ min a pé.
> **Dormindo em São Paulo.** A região de Higienópolis e Consolação tem hotéis a poucos minutos da festa. Se quiser uma indicação, pergunte à família pelo WhatsApp.

Do not name a hotel unless the family has checked it; "pergunte pelo WhatsApp" is enough and keeps the site light. The parking line alone removes a dozen calls on the day. Effort: **small**.

### 5. Presentes: Pix etiquette and where to hand gifts
Brazilian adults will ask "tem Pix?" and "levo o presente na festa ou mando antes?". A Pix key (phone or CPF) must not sit on a public link for a minor's party, so keep it off the page and point to WhatsApp. Add under "Tamanho de roupa: P ou 38. Calçados: 37.":

> Se preferir presentear com Pix ou com um vale, peça a chave pelo WhatsApp da família. Presentes físicos podem ser entregues na festa: haverá uma mesa de presentes na entrada.

The "mesa de presentes" line is for the family to confirm with the venue. Effort: **small**.

### 6. RSVP wording: warmer, clearer, and one fewer step
Current text: "A festa é para convidados. Se for pela família, escreva o nome de cada pessoa que vem com você." The first sentence reads like a bouncer and does not say what it means (no plus-ones, no uninvited children). Current privacy line: "Nada de e-mail: qualquer contato será pelo WhatsApp." "Nada de e-mail" is the family's internal reason, not something a guest needs to read. Suggested replacement for the left column:

> Vamos adorar ter você com a gente. O convite é para as pessoas que o receberam; se vier mais alguém da sua família, escreva o nome de cada um, assim o buffet e a mesa ficam certinhos.
> Seus dados ficam só com a família da Lorena, para organizar a festa. Qualquer aviso chega pelo WhatsApp.

And the cover line "Você está convidado para a festa de 15 anos da Lorena!" has a gender problem for half the guests and reads flat. Brazilian invitations are written by the hosts:

> A Lorena e a família convidam você para a festa dos seus 15 anos.

(or, if the parents want their names on it, the traditional "[Nome da mãe] e [Nome do pai] convidam você para os 15 anos da Lorena"). Same fix on the opening screen eyebrow: "VOCÊ ESTÁ CONVIDADO" → "VOCÊ É NOSSO CONVIDADO" or simply "CONVITE". Effort: **small**.

The thank-you screen says "Presença confirmada. Agora manda um 'confirmei!' no WhatsApp da Lorena." The spreadsheet already has the confirmation, so the second action feels like homework and half the guests will think the form did not work. Make it optional and name the number honestly (the number in index-config.js is the family's, not necessarily Lorena's):

> Presença confirmada, está tudo anotado. Se quiser, manda um oi para a família pelo WhatsApp.

Effort: **small** (two strings in site.js).

### 7. Deadline: say why, and count down
"Confirme até 31 de dezembro de 2026" appears three times, which is good, but nobody is told what happens after. Guests in Brazil confirm late unless there is a reason. Add one sentence to the RSVP intro:

> Confirme até 31 de dezembro de 2026: nessa data a lista vai para o buffet e depois não conseguimos incluir mais ninguém.

And a small live counter on the cover under the eyebrow ("Faltam 99 dias" / "É hoje!"), computed in JS from the fixed date; it costs nothing and gives the page a pulse every time it is reopened. Effort: **small** (one sentence; ten lines of JS for the counter).

### 8. The bus, written for the parents, not only for the teens
The bus copy speaks to the teenager ("Se você ainda vai confirmar presença, marque o ônibus lá na confirmação e pronto"). The person who decides whether a 15-year-old boards a bus to São Paulo at night is the mother, and she will phone with the same four questions: who is the adult on the bus, what time does it leave, what time is it back, and will I be told where. Add a "Para os pais" box next to the form:

> **Para os pais.** Cada ônibus vai com um adulto da família na ida e na volta. Saída prevista: __h de [Jundiaí] / __h de [Campinas] / __h da escola; volta prevista: __h, com chegada no mesmo ponto. O ponto de encontro e o contato do adulto responsável pelo ônibus são enviados aos responsáveis pelo WhatsApp até [uma semana antes]. Se o seu filho ou filha tiver alguma necessidade (remédio, restrição alimentar), avise pelo WhatsApp.

Also, "Ônibus somente para os jovens que vão sem os pais" is clear but cold; "O ônibus é para os jovens que vêm sem os pais, para ninguém ficar de fora" says the same with the reason. The times and the adult's name are facts for the family to fill in; the structure can go up now with "a confirmar". Effort: **small** (copy); **medium** if the family wants a per-bus seat counter shown on the page, which I would not do (seat counts invite "there's still room for my cousin").

### 9. Uma mensagem da Lorena (and a photo caption or two)
The gallery is beautiful but silent. Two or three lines in the first person, placed above the gallery or on the cover, turn the site from "an invitation" into "her invitation": a 15 anos is the one party where the guest of honour is allowed to speak. Example she can edit:

> "Escolhi cada foto deste site. Algumas são do tempo da Minnie, outras de agora. Queria muito que você estivesse lá para a próxima."

Optionally three or four captions in the gallery ("Primeiro aniversário", "Com as primas", "Formatura do nono ano") give grandparents and godparents something to linger on. Effort: **small** (one paragraph; captions need Lorena's input via the "Site Lorena:" email flow).

### 10. Save the date and a sticky "Confirmar" on the phone
At 390 px the header shows only "Os 15 da Lorena"; the section links (Fotos, Local, Ônibus, Presentes, Confirmar) are hidden, so a guest on the phone scrolls through 27 photos before finding the RSVP. Two cheap fixes: a sticky bottom bar on mobile with one button "Confirmar presença", and an "Adicionar à agenda" link that downloads a static .ics (date, 19h30, Casa Quintal, address) so the date lands in the family calendar the moment the invitation is opened. Effort: **small** for the .ics (static file in assets/); **small/medium** for the sticky button (CSS plus a few lines so it hides when the form is visible).

### 11. Tone of the Portuguese copy (quick pass)
Overall the copy is correct, informal "você", and short, which fits the magazine look. A few lines read like instructions rather than hospitality:
- "Ônibus somente para os jovens que vão sem os pais." → "O ônibus é para os jovens que vêm sem os pais."
- "Só para quem vai sem os pais." (under the bus form) → "Para quem vem sem os pais."
- "Não preencha" is the honeypot label and is correctly hidden; fine.
- "Quero um lugar" is a good, friendly button; keep it.
- "Anotado" as a heading on the bus thank-you is a little dry; "Lugar pedido!" or "Combinado!" matches the rest of the site better.
- "De lá até aqui" and "Sua presença já é o presente" are the best lines on the site; keep that voice for everything new.
Effort: **small**.

## Priority if the family does only three things
1. Traje (idea 2) and the timeline, even in three lines (idea 1).
2. The "Para os pais" bus box with departure and return times (idea 8).
3. Parking/metro/Pix-by-WhatsApp lines (ideas 4 and 5).

All of the above are copy and static markup, within the GitHub Pages, no-tracker, no-email, zero-budget constraints, and none changes a fact of the party; every blank is for Filipe or the family to fill.
