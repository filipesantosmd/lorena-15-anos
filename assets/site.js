/* Os 15 da Lorena. Tudo lê de window.CONFIG (index-config.js). */
(function () {
  var C = window.CONFIG || {};
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };
  var reduz = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var zap = function (texto, numero) { return "https://wa.me/" + (numero || C.whatsapp) + (texto ? "?text=" + encodeURIComponent(texto) : ""); };
  var dataFesta = new Date(C.dataFesta || "2027-02-13T19:30:00-03:00");
  var agora = new Date();
  var diaFesta = new Date(dataFesta.getFullYear(), dataFesta.getMonth(), dataFesta.getDate());
  var hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
  var dias = Math.round((diaFesta - hoje) / 864e5);
  var ehHoje = dias === 0, passou = dias < 0;
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function primeiroNome(n) { return String(n || "").trim().split(/\s+/)[0]; }
  function fraseDias() { return passou ? "Foi inesquecível. Obrigada!" : ehHoje ? "É hoje!" : dias === 1 ? "É amanhã!" : "Faltam " + dias + " dias"; }

  /* Fontes: mostra o nome só quando a Italiana carregou (ou depois de 1,5 s). */
  function fontesOk() { document.body.classList.remove("sem-fontes"); }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fontesOk); setTimeout(fontesOk, 1500);

  /* Abertura: uma vez por visita. */
  var ab = $("#abertura"), partes = ["header", "main", "footer", "#pill"];
  var jaAbriu = false;
  try { jaAbriu = sessionStorage.getItem("lorena15-aberto") === "1"; } catch (e) {}
  function inerte(on) { partes.forEach(function (s) { var el = $(s); if (el) { if (on) el.setAttribute("inert", ""); else el.removeAttribute("inert"); } }); }
  function abrir() {
    document.body.classList.add("aberta");
    ab.classList.add("fechar");
    try { sessionStorage.setItem("lorena15-aberto", "1"); } catch (e) {}
    inerte(false);
    setTimeout(function () { ab.hidden = true; var h = $(".capa h1"); if (h) h.focus({ preventScroll: true }); }, reduz ? 0 : 1000);
  }
  if (jaAbriu) { ab.hidden = true; document.body.classList.add("aberta"); } else { inerte(true); }
  $("#ab-conta").textContent = fraseDias();
  if (passou) { $("#ab-eyebrow").textContent = "Foi incrível"; $("#ab-nome").textContent = "Obrigada"; $("#ab-data").textContent = "13 de fevereiro de 2027 · Casa Quintal"; $("#abrir").firstChild.textContent = "Ver as fotos "; }
  $("#abrir").addEventListener("click", abrir);

  /* Música: começa ao abrir o convite; ♪ pausa; a escolha fica na visita. */
  var M = C.musica, audio = $("#musica"), mbtn = $("#musica-btn");
  if (M && M.src) {
    var pref = ""; try { pref = sessionStorage.getItem("lorena15-musica") || ""; } catch (e) {}
    var economiza = navigator.connection && navigator.connection.saveData;
    audio.src = M.src; audio.volume = 0; mbtn.hidden = false;
    $("#musica-credito").hidden = false; $("#musica-credito").innerHTML = "Música: " + esc(M.titulo) + (M.credito ? " · " + esc(M.credito) : "") + (M.spotify ? " · <a href=\"" + esc(M.spotify) + "\" target=\"_blank\" rel=\"noopener\">a música da Lorena no Spotify</a>" : "");
    function estado(tocando) { mbtn.setAttribute("aria-pressed", tocando ? "true" : "false"); mbtn.textContent = tocando ? "♪ Pausar" : "♪ Tocar"; }
    function sobe() { var v = 0, alvo = M.volume || .45, t = setInterval(function () { v = Math.min(alvo, v + .05); audio.volume = v; if (v >= alvo) clearInterval(t); }, 120); }
    function tocar() { var p = audio.play(); if (p && p.then) p.then(function () { estado(true); sobe(); try { sessionStorage.setItem("lorena15-musica", "on"); } catch (e) {} }).catch(function () { estado(false); }); }
    function pausar() { audio.pause(); estado(false); try { sessionStorage.setItem("lorena15-musica", "off"); } catch (e) {} }
    mbtn.addEventListener("click", function () { audio.paused ? tocar() : pausar(); });
    $("#abrir").addEventListener("click", function () { if (pref !== "off" && !economiza) tocar(); });
    if (jaAbriu && pref === "on") { var p0 = audio.play(); if (p0 && p0.then) p0.then(function () { estado(true); sobe(); }).catch(function () { estado(false); }); }
  }
  var toques = 0;
  $("#selo").addEventListener("click", function () {
    toques++; if (toques < 3) return; toques = 0;
    var s = $("#selo"); s.classList.remove("gira"); void s.offsetWidth; s.classList.add("gira");
    if (C.fraseSelo) $("#ab-eyebrow").textContent = C.fraseSelo;
  });

  /* Links e textos de configuração. */
  var mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(C.lugar + ", " + C.endereco);
  $("#btn-maps").href = mapsUrl; $("#mapa-link").href = mapsUrl;
  $("#btn-waze").href = "https://waze.com/ul?ll=" + C.lat + "," + C.lon + "&navigate=yes";
  $("#btn-uber").href = "https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=" + encodeURIComponent(C.lugar + ", " + C.endereco) + "&dropoff[latitude]=" + C.lat + "&dropoff[longitude]=" + C.lon;
  $("#zap-1").href = "https://wa.me/5519981174550"; $("#zap-2").href = "https://wa.me/5519996544550";
  $("#rodape-zap").href = zap("Oi! Tenho uma dúvida sobre a festa da Lorena.");
  $$(".js-prazo").forEach(function (el) { el.textContent = C.prazo; });
  var ini = dataFesta, fim = C.fimFesta ? new Date(C.fimFesta) : new Date(dataFesta.getTime() + 6 * 36e5);
  function utc(d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  $("#btn-gcal").href = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=" + encodeURIComponent("Os 15 da Lorena") + "&dates=" + utc(ini) + "/" + utc(fim) + "&location=" + encodeURIComponent(C.lugar + ", " + C.endereco) + "&details=" + encodeURIComponent("Confirme até " + C.prazo + " em https://15anosdalorena.com.br");
  if (C.fimFesta) { var f = new Date(C.fimFesta); $("#fato-hora").textContent = "Das 19h30 às " + f.getHours() + "h" + (f.getMinutes() ? String(f.getMinutes()).padStart(2, "0") : ""); }
  if (C.traje) { $("#fato-traje").hidden = false; $("#fato-traje-txt").textContent = C.traje; $("#fato-traje-nota").textContent = C.trajeNota || ""; }
  if (C.vindoDeFora) { $("#vindo").hidden = false; $("#vindo-txt").textContent = C.vindoDeFora; }
  if (C.paraOsPais) { $("#pais").hidden = false; $("#pais-txt").textContent = C.paraOsPais; }
  if (C.pixPorWhatsapp) $("#pix-nota").hidden = false;
  if (C.mensagem) { $("#recado-lorena").hidden = false; $("#recado-lorena-txt").textContent = C.mensagem; }
  if (C.hashtag) { $("#rodape-hash").hidden = false; $("#rodape-hash").textContent = "No dia, posta nos stories com " + C.hashtag + ". Melhor ainda: só pros Close Friends."; }
  $("#rodape-conta").innerHTML = passou ? "Foi inesquecível" : ehHoje ? "É hoje" : "<span>" + dias + "</span> " + (dias === 1 ? "dia" : "dias");
  if (C.programacao && C.programacao.length) {
    $("#noite").hidden = false;
    $("#programacao").innerHTML = C.programacao.map(function (p) { return "<li><b>" + esc(p.hora) + "</b><span>" + esc(p.o) + "</span></li>"; }).join("");
  }

  /* Faixa rolante. */
  var itens = ["13 de fevereiro de 2027", "Casa Quintal", "São Paulo", "19h30"];
  if (C.traje) itens.push("Traje " + C.traje);
  if (C.hashtag) itens.push(C.hashtag);
  itens.push(passou ? "Obrigada!" : ehHoje ? "É hoje" : "Confirme até " + C.prazo.replace(" de 2026", ""));
  if (ehHoje) itens = ["É HOJE", "Casa Quintal", "19h30", "É HOJE", "São Paulo", "Vem!"];
  var faixa = itens.map(function (t) { return "<span>" + esc(t) + "</span><span class=\"estrela\">✦</span>"; }).join("");
  $("#trilho").innerHTML = faixa + faixa;

  /* Sem botão de "compartilhar convite": o convite é de quem recebeu (Filipe, 2026-11-06). */
  $("#btn-copiar").addEventListener("click", function () {
    var b = $("#btn-copiar"), t = C.lugar + ", " + C.endereco;
    var ok = function () { b.textContent = "Copiado!"; setTimeout(function () { b.textContent = "Copiar endereço"; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, function () { window.prompt("Copie o endereço:", t); });
    else window.prompt("Copie o endereço:", t);
  });

  /* Galeria com capítulos e legendas (da configuração). */
  function figura(f, pasta, i) {
    var src = "assets/fotos/" + (pasta || "") + f.src + ".jpg", sm = "assets/fotos/" + (pasta || "") + "sm/" + f.src + ".jpg";
    var leg = f.legenda ? "<figcaption>" + esc(f.legenda) + "</figcaption>" : "";
    var alt = f.legenda ? "Lorena: " + f.legenda : "Lorena, foto " + (i + 1);
    return "<figure class=\"r" + (i % 3 + 1) + "\" data-w=\"\"><img src=\"" + src + "\" srcset=\"" + sm + " 480w, " + src + " 1400w\" sizes=\"(max-width:820px) 45vw, 30vw\" alt=\"" + esc(alt) + "\" loading=\"lazy\" decoding=\"async\">" + leg + "</figure>";
  }
  function montaGaleria(el, lista, pasta) {
    var html = "", ano = "";
    lista.forEach(function (f, i) {
      if (f.ano && f.ano !== ano) { ano = f.ano; html += "<h3 class=\"ano\">" + esc(ano) + "</h3>"; }
      html += figura(f, pasta, i);
    });
    el.innerHTML = html;
    el.querySelectorAll("img").forEach(function (img) {
      var ok = function () { img.classList.add("ok"); if (img.naturalWidth > img.naturalHeight) img.parentNode.classList.add("wide"); };
      if (img.complete && img.naturalWidth) ok(); else img.addEventListener("load", ok, { once: true });
      img.addEventListener("error", function () { img.classList.add("ok"); });
    });
  }
  if (C.fotos && C.fotos.length) montaGaleria($("#galeria"), C.fotos, "");
  if (passou && C.fotosFesta && C.fotosFesta.length) { $("#festa").hidden = false; montaGaleria($("#galeria-festa"), C.fotosFesta, "festa/"); }
  if (C.capaAtras) { var ca = $("#capa-atras"); ca.hidden = false; ca.querySelector("img").src = "assets/fotos/sm/" + C.capaAtras + ".jpg"; ca.querySelector("img").alt = "Lorena pequena"; $("#capa-atras-leg").textContent = "de lá"; }
  $$(".polaroid img").forEach(function (img) { var ok = function () { img.classList.add("ok"); }; if (img.complete && img.naturalWidth) ok(); else { img.addEventListener("load", ok, { once: true }); img.addEventListener("error", ok, { once: true }); } });

  /* Títulos entram suavemente; barra fixa no celular. */
  var pill = $("#pill"), capa = $(".capa"), conf = $("#confirmar");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -10% 0px" });
    $$(".cab.entra").forEach(function (el) { io.observe(el); });
    var capaVisivel = true, confVisivel = false;
    function pillAtualiza() { pill.classList.toggle("ver", !capaVisivel && !confVisivel && !ab.classList.contains("fechar") === false || (!capaVisivel && !confVisivel && jaAbriu)); }
    new IntersectionObserver(function (es) { capaVisivel = es[0].isIntersecting; pillAtualiza(); }).observe(capa);
    new IntersectionObserver(function (es) { confVisivel = es[0].isIntersecting; pillAtualiza(); }, { rootMargin: "0px 0px -30% 0px" }).observe(conf);
    $("#abrir").addEventListener("click", function () { jaAbriu = true; setTimeout(pillAtualiza, 1100); });
  } else { $$(".cab.entra").forEach(function (el) { el.classList.add("visto"); }); }

  /* Contagem pública de confirmados. */
  if (C.mostrarContagem && C.formEndpoint && !passou) {
    fetch(C.formEndpoint + "?contagem=1").then(function (r) { return r.json(); }).then(function (j) {
      if (j && j.ok && j.pessoas >= (C.minimoContagem || 10)) { $("#contagem").hidden = false; $("#contagem").innerHTML = "Já confirmaram <b>" + j.pessoas + "</b> pessoas. Falta você."; }
    }).catch(function () {});
  }
  if (C.prazoISO && !passou) {
    var p = C.prazoISO.split("-"), prazoDia = new Date(+p[0], +p[1] - 1, +p[2]), dp = Math.round((prazoDia - hoje) / 864e5);
    var el = $("#prazo-conta"); el.hidden = false;
    el.innerHTML = dp > 1 ? "Faltam <b>" + dp + "</b> dias para confirmar" : dp === 1 ? "Último dia para confirmar é amanhã" : dp === 0 ? "Hoje é o último dia para confirmar!" : "O prazo passou, mas fale com a gente no WhatsApp";
  }

  /* Formulários. */
  var lembrarChave = function (k, d) { try { localStorage.setItem(k, JSON.stringify({ d: d, q: new Date().toISOString() })); } catch (e) {} };
  var lembrado = function (k) { try { return JSON.parse(localStorage.getItem(k) || "null"); } catch (e) { return null; } };
  function dataBr(iso) { var dt = new Date(iso); return isNaN(dt) ? "" : dt.toLocaleDateString("pt-BR"); }
  function mascara(input) {
    input.addEventListener("input", function () {
      var d = input.value.replace(/\D/g, "").slice(0, 11), v = d;
      if (d.length > 2) v = "(" + d.slice(0, 2) + ") " + d.slice(2);
      if (d.length > 7) v = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
      if (d.length === 10) v = "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
      input.value = v;
    });
  }
  ["#r-zap", "#r-resp", "#o-resp", "#o-conv"].forEach(function (s) { mascara($(s)); });
  function telOk(v) { var d = v.replace(/\D/g, ""); return d.length === 10 || d.length === 11; }
  function linhas(t) { return String(t || "").split(/\n|,|;/).map(function (s) { return s.trim(); }).filter(Boolean); }
  function dados(form) { var d = {}; new FormData(form).forEach(function (v, k) { d[k] = String(v).trim(); }); return d; }
  function mostraErro(erro, msg, campo) { erro.innerHTML = msg; erro.style.display = "block"; if (campo) campo.focus(); }
  function limpaErro(erro) { erro.style.display = "none"; }
  function rotulo(i) { var l = i.closest("label"); return l ? l.childNodes[0].textContent.trim().replace(/\?$/, "").toLowerCase() : "o campo"; }
  function valida(form, erro) {
    var falta = $$("#" + form.id + " [required]").filter(function (i) { return !i.closest("[hidden]") && !i.value.trim(); });
    if (falta.length) { mostraErro(erro, "Falta preencher: " + falta.map(rotulo).join(", ") + ".", falta[0]); return false; }
    var tels = $$("#" + form.id + " input[type=tel]").filter(function (i) { return !i.closest("[hidden]") && i.value.trim() && !telOk(i.value); });
    if (tels.length) { mostraErro(erro, "Confira " + rotulo(tels[0]) + ": precisa ter DDD e o número, por exemplo (11) 99999-0000.", tels[0]); return false; }
    limpaErro(erro); return true;
  }
  function post(d) {
    return fetch(C.formEndpoint, { method: "POST", body: JSON.stringify(d) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || !j.ok) throw new Error("resposta"); return j; });
  }
  function mostraOk(form, ok) { form.hidden = true; ok.style.display = "block"; ok.classList.add("aparece"); ok.scrollIntoView({ behavior: reduz ? "auto" : "smooth", block: "center" }); }
  function enviar(lista, form, ok, botao, erro, fallback) {
    if (lista[0].site_url) { mostraOk(form, ok); return; } /* robô: finge que deu certo */
    lista.forEach(function (d) { d.site = "lorena15"; delete d.site_url; });
    if (!C.formEndpoint) { window.open(zap(fallback), "_blank", "noopener"); mostraOk(form, ok); return; }
    botao.disabled = true; botao.textContent = "Enviando…";
    lista.reduce(function (p, d) { return p.then(function () { return post(d); }); }, Promise.resolve())
      .then(function () { mostraOk(form, ok); })
      .catch(function () {
        botao.disabled = false; botao.textContent = botao.dataset.rotulo;
        mostraErro(erro, "Não conseguimos enviar agora. Tente de novo ou <a href=\"" + zap(fallback) + "\" target=\"_blank\" rel=\"noopener\">confirme pelo WhatsApp</a>.");
      });
  }

  /* RSVP. */
  var fr = $("#form-rsvp"), okr = $("#ok-rsvp"), er = $("#erro-rsvp"), br = $("#r-botao"); br.dataset.rotulo = br.textContent;
  var pessoas = $("#r-pessoas"), acompWrap = $("#r-acomp-wrap"), acomp = $("#r-acomp"), acompN = $("#r-acomp-n");
  var rOnibus = $("#r-onibus"), busExtra = $("#r-bus-extra"), rResp = $("#r-resp"), quemLabel = $("#r-quem-label"), quem = $("#r-quem");
  if (C.perguntarMusica) $("#r-musica-label").hidden = false;
  if (C.perguntarRecado) $("#r-recado-label").hidden = false;
  if (C.storyTemplate) $("#ok-rsvp-story").hidden = false;
  function mostraAcomp() { var n = parseInt(pessoas.value, 10) || 1; acompWrap.classList.toggle("aberto", n > 1); acomp.required = n > 1; acompN.textContent = n > 1 ? "(" + (n - 1) + (n - 1 === 1 ? " nome)" : " nomes)") : ""; mostraQuem(); }
  function mostraBus() { var on = rOnibus.value !== "Não"; busExtra.classList.toggle("aberto", on); rResp.required = on; mostraQuem(); }
  var quemEditado = false; quem.addEventListener("input", function () { quemEditado = true; });
  function mostraQuem() { var n = parseInt(pessoas.value, 10) || 1, on = rOnibus.value !== "Não" && n > 1; quemLabel.hidden = !on; if (on && !quemEditado) quem.value = [$("#r-nome").value.trim()].concat(linhas(acomp.value)).filter(Boolean).join("\n"); }
  pessoas.addEventListener("change", mostraAcomp); rOnibus.addEventListener("change", mostraBus); acomp.addEventListener("input", mostraQuem); $("#r-nome").addEventListener("input", mostraQuem);
  mostraAcomp(); mostraBus();
  fr.addEventListener("submit", function (e) {
    e.preventDefault(); if (!valida(fr, er)) return;
    var d = dados(fr), n = parseInt(d.pessoas, 10) || 1, nomes = linhas(d.acompanhantes);
    if (n > 1 && nomes.length < n - 1) { mostraErro(er, "Você marcou " + n + " pessoas, então " + (n - 1 - nomes.length === 1 ? "falta 1 nome" : "faltam " + (n - 1 - nomes.length) + " nomes") + " além do seu.", acomp); return; }
    var temBus = d.onibus !== "Não", quemBus = temBus ? (n > 1 ? linhas(d.quemOnibus) : [d.nome]) : [];
    if (temBus && !quemBus.length) quemBus = [d.nome];
    var rsvp = { tipo: "rsvp", nome: d.nome, whatsapp: d.whatsapp, pessoas: d.pessoas, acompanhantes: nomes.join("\n"), onibus: d.onibus, musica: d.musica || "", recado: d.recado || "", site_url: d.site_url };
    var lista = [rsvp].concat(quemBus.map(function (q) { return { tipo: "onibus", nome: q, contatoResp: d.contatoResp, contatoConv: d.whatsapp, onibus: d.onibus, confirmadoPor: d.nome }; }));
    var fallback = ["Confirmei! Eu vou nos 15 da Lorena 💗", "Nome: " + d.nome, n > 1 ? "Vamos em " + n + ": " + [d.nome].concat(nomes).join(", ") : "", temBus ? "Ônibus: " + d.onibus + " (" + quemBus.join(", ") + "; responsáveis: " + d.contatoResp + ")" : "", d.musica ? "Música: " + d.musica : ""].filter(Boolean).join("\n");
    lembrarChave("lorena15-rsvp", { nome: d.nome, whatsapp: d.whatsapp, pessoas: d.pessoas, acompanhantes: nomes.join("\n"), onibus: d.onibus, contatoResp: d.contatoResp, quemOnibus: quemBus.join("\n"), musica: d.musica, recado: d.recado });
    $("#ok-rsvp-h").textContent = "Obrigada, " + primeiroNome(d.nome) + "!";
    $("#ok-rsvp-txt").textContent = (temBus ? "Presença confirmada e lugar no ônibus pedido" + (quemBus.length > 1 ? " para " + quemBus.length + " pessoas" : "") + ". O ponto de encontro vem pelo WhatsApp. " : "Presença confirmada, está tudo anotado. ") + (d.recado ? "Seu recado chegou. " : "") + (d.musica ? "A música está na lista do DJ. " : "") + "Se quiser, mande um oi " + (C.whatsappPara || "pra família da Lorena") + " no WhatsApp.";
    $("#ok-rsvp-zap").href = zap("Oi! Confirmei presença na festa de 15 anos da Lorena: " + d.nome + (n > 1 ? " (" + n + " pessoas)" : "") + ". Até o dia 13! 🎉");
    enviar(lista, fr, okr, br, er, fallback);
  });

  /* Ônibus avulso (dobra). */
  var dobra = $("#dobra-onibus"), blocoBus = $("#bloco-onibus");
  dobra.addEventListener("toggle", function () { blocoBus.hidden = !dobra.open; if (dobra.open) blocoBus.scrollIntoView({ behavior: reduz ? "auto" : "smooth", block: "nearest" }); });
  if (location.hash === "#onibus-form") { dobra.open = true; blocoBus.hidden = false; }
  var fo = $("#form-onibus"), oko = $("#ok-onibus"), eo = $("#erro-onibus"), bo = fo.querySelector("button[type=submit]"); bo.dataset.rotulo = bo.textContent;
  fo.addEventListener("submit", function (e) {
    e.preventDefault(); if (!valida(fo, eo)) return;
    var d = dados(fo);
    lembrarChave("lorena15-onibus", { nome: d.nome, contatoResp: d.contatoResp, contatoConv: d.contatoConv, onibus: d.onibus });
    var fallback = "Quero um lugar no ônibus (" + d.onibus + "): " + d.nome + ". Responsáveis: " + d.contatoResp + ". Meu contato: " + d.contatoConv;
    $("#ok-onibus-zap").href = zap("Oi! Pedi lugar no ônibus (" + d.onibus + ") para " + d.nome + ".");
    enviar([{ tipo: "onibus", nome: d.nome, contatoResp: d.contatoResp, contatoConv: d.contatoConv, onibus: d.onibus, confirmadoPor: "", site_url: d.site_url }], fo, oko, bo, eo, fallback);
  });

  /* Memória deste aparelho. */
  var jr = lembrado("lorena15-rsvp");
  function preencheRsvp(d) {
    $("#r-nome").value = d.nome || ""; $("#r-zap").value = d.whatsapp || ""; pessoas.value = d.pessoas || "1"; acomp.value = d.acompanhantes || "";
    rOnibus.value = d.onibus || "Não"; rResp.value = d.contatoResp || ""; quem.value = d.quemOnibus || ""; $("#r-musica").value = d.musica || ""; $("#r-recado").value = d.recado || "";
    mostraAcomp(); mostraBus();
  }
  if (jr && jr.d) {
    var av = $("#aviso-rsvp"); av.hidden = false;
    av.innerHTML = "Já confirmado neste celular: <b>" + esc(jr.d.nome) + "</b>" + (jr.q ? ", " + dataBr(jr.q) : "") + ". Mudou algo? Edite e envie de novo, que a gente atualiza sem duplicar.";
    preencheRsvp(jr.d);
    $("#rsvp-titulo").innerHTML = "Sua <span class=\"it\">confirmação</span>";
    br.textContent = "Atualizar confirmação"; br.dataset.rotulo = br.textContent;
    var outra = $("#r-outra"); outra.hidden = false;
    outra.addEventListener("click", function (e) {
      e.preventDefault(); preencheRsvp({}); av.hidden = true; outra.hidden = true;
      $("#rsvp-titulo").innerHTML = "Confirme sua <span class=\"it\">presença</span>"; br.textContent = "Confirmar presença"; br.dataset.rotulo = br.textContent; $("#r-nome").focus();
    });
  }
  var jo = lembrado("lorena15-onibus");
  if (jo && jo.d) {
    var avo = $("#aviso-onibus"); avo.hidden = false;
    avo.textContent = "Já pedido neste celular: " + jo.d.nome + ". Se enviar de novo, o pedido é atualizado, não duplicado.";
    $("#o-nome").value = jo.d.nome || ""; $("#o-resp").value = jo.d.contatoResp || ""; $("#o-conv").value = jo.d.contatoConv || ""; $("#o-onibus").value = jo.d.onibus || "";
  }

  /* Quiz (da configuração). */
  if (C.quiz && C.quiz.length) {
    $("#quiz-sec").hidden = false; $("#quiz-intro").textContent = C.quiz.length + " perguntas. Sem cola.";
    var q = $("#quiz"), i = 0, acertos = 0;
    function pergunta() {
      var it = C.quiz[i], ops = [it.certa].concat(it.erradas || []).sort(function () { return Math.random() - .5; });
      q.innerHTML = "<div class=\"passo\">Pergunta " + (i + 1) + " de " + C.quiz.length + "</div><p class=\"q\">" + esc(it.p) + "</p><div class=\"ops\">" + ops.map(function (o) { return "<button type=\"button\" data-o=\"" + esc(o) + "\">" + esc(o) + "</button>"; }).join("") + "</div>";
      q.querySelectorAll(".ops button").forEach(function (b) {
        b.addEventListener("click", function () {
          var certo = b.dataset.o === it.certa; if (certo) acertos++;
          q.querySelectorAll(".ops button").forEach(function (x) { x.disabled = true; x.classList.add(x.dataset.o === it.certa ? "certa" : "errada"); });
          setTimeout(function () { i++; i < C.quiz.length ? pergunta() : fim(); }, 900);
        });
      });
    }
    function fim() {
      var n = C.quiz.length, r = acertos / n, tier = r < .45 ? "Precisa de mais tempo com ela." : r < .85 ? "Conhece bem." : "Amiga de verdade (ou mãe).";
      q.innerHTML = "<div class=\"fim\"><h3>" + acertos + " de " + n + "</h3><p class=\"q\">" + tier + "</p><div class=\"acoes\"><a class=\"btn solid\" target=\"_blank\" rel=\"noopener\" href=\"https://wa.me/?text=" + encodeURIComponent("Fiz " + acertos + "/" + n + " no quiz da Lorena. Quero ver você fazer melhor.") + "\">Desafiar no WhatsApp</a><button class=\"btn leve\" type=\"button\" id=\"quiz-denovo\">Jogar de novo</button></div></div>";
      $("#quiz-denovo").addEventListener("click", function () { i = 0; acertos = 0; pergunta(); });
    }
    pergunta();
  }

  /* Suas fotos: redimensiona no celular e manda para o Drive da família via Apps Script. */
  if (C.receberFotos) {
    $("#suasfotos").hidden = false; $("#nav-fotos").hidden = false;
    if (passou) $("#fotos-intro").textContent = "Manda as fotos da festa. Vão direto para o álbum da família, e as melhores entram aqui no site.";
    if (C.hashtag) { $("#hash-nota").hidden = false; $("#hash-nota").textContent = "Nas redes, usa " + C.hashtag + " e posta nos Close Friends."; }
    $("#fotos-zap").href = zap("Fotos para o álbum da Lorena");
    var ff = $("#form-fotos"), okf = $("#ok-fotos"), ef = $("#erro-fotos"), bf = $("#f-botao"), arq = $("#f-arquivos"), fl = $("#f-lista"), fs = $("#f-status");
    if (jr && jr.d && jr.d.nome) $("#f-nome").value = jr.d.nome;
    var MAX = 30, LADO = 2400;
    function listar() {
      var fs2 = Array.prototype.slice.call(arq.files || []);
      fl.hidden = !fs2.length; fs.textContent = fs2.length ? fs2.length + (fs2.length === 1 ? " foto escolhida." : " fotos escolhidas.") : "Nenhuma foto escolhida.";
      fl.innerHTML = fs2.map(function (f, i) { return "<div data-i=\"" + i + "\"><span>" + esc(f.name) + "</span><span class=\"st\">" + Math.round(f.size / 1024) + " KB</span></div>"; }).join("");
    }
    arq.addEventListener("change", listar);
    function reduzir(file) {
      return new Promise(function (res, rej) {
        var url = URL.createObjectURL(file), img = new Image();
        img.onload = function () {
          var w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, LADO / Math.max(w, h));
          var cv = document.createElement("canvas"); cv.width = Math.round(w * k); cv.height = Math.round(h * k);
          cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height); URL.revokeObjectURL(url);
          cv.toBlob(function (b) { b ? res(b) : rej(new Error("canvas")); }, "image/jpeg", 0.86);
        };
        img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("formato")); };
        img.src = url;
      });
    }
    function base64(blob) { return new Promise(function (res, rej) { var r = new FileReader(); r.onload = function () { res(String(r.result).split(",")[1]); }; r.onerror = rej; r.readAsDataURL(blob); }); }
    ff.addEventListener("submit", function (e) {
      e.preventDefault(); if (!valida(ff, ef)) return;
      var d = dados(ff); if (d.site_url) { mostraOk(ff, okf); return; }
      var files = Array.prototype.slice.call(arq.files || []).slice(0, MAX);
      if (!files.length) { mostraErro(ef, "Escolha pelo menos uma foto.", arq); return; }
      if (!C.formEndpoint) { mostraErro(ef, "O envio ainda não está ligado. Manda pelo WhatsApp."); return; }
      bf.disabled = true; var ok = 0, falhas = 0;
      files.reduce(function (p, f, i) {
        return p.then(function () {
          bf.textContent = "Enviando " + (i + 1) + " de " + files.length + "…";
          var linha = fl.querySelector("[data-i=\"" + i + "\"] .st");
          return reduzir(f).catch(function () { return f.size < 8e6 ? f : Promise.reject(new Error("grande")); })
            .then(base64)
            .then(function (b64) { return post({ tipo: "foto", site: "lorena15", nome: d.nome, arquivo: f.name, mime: "image/jpeg", dados: b64 }); })
            .then(function () { ok++; if (linha) { linha.textContent = "enviada"; linha.className = "st ok"; } })
            .catch(function () { falhas++; if (linha) { linha.textContent = "falhou"; linha.className = "st falhou"; } });
        });
      }, Promise.resolve()).then(function () {
        bf.disabled = false; bf.textContent = "Enviar fotos";
        if (ok) { $("#ok-fotos-txt").textContent = (ok === 1 ? "1 foto está" : ok + " fotos estão") + " no álbum da família." + (falhas ? " " + falhas + " não deu certo; tente de novo ou mande pelo WhatsApp." : "") + " Obrigada, " + primeiroNome(d.nome) + "!"; mostraOk(ff, okf); }
        else mostraErro(ef, "Não conseguimos enviar. Tente de novo ou <a href=\"" + zap("Fotos para o álbum da Lorena") + "\" target=\"_blank\" rel=\"noopener\">manda pelo WhatsApp</a>.");
      });
    });
    $("#f-mais").addEventListener("click", function () { okf.style.display = "none"; ff.hidden = false; arq.value = ""; listar(); arq.focus(); });
  }
})();
