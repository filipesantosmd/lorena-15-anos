/* Os 15 da Lorena: abertura, links de WhatsApp e mapa, e os dois formulários. */
(function () {
  var C = window.CONFIG || {};
  var $ = function (s) { return document.querySelector(s); };
  var zap = function (texto) {
    return "https://wa.me/" + C.whatsapp + (texto ? "?text=" + encodeURIComponent(texto) : "");
  };

  /* Abertura: uma vez por visita. */
  var ab = $("#abertura");
  var jaAbriu = false;
  try { jaAbriu = sessionStorage.getItem("lorena15-aberto") === "1"; } catch (e) {}
  function abrir() {
    document.body.classList.add("aberta");
    ab.classList.add("fechar");
    try { sessionStorage.setItem("lorena15-aberto", "1"); } catch (e) {}
    setTimeout(function () { ab.hidden = true; }, 1000);
  }
  if (jaAbriu) { ab.hidden = true; document.body.classList.add("aberta"); }
  $("#abrir").addEventListener("click", abrir);

  /* Links. */
  $("#btn-maps").href = C.maps;
  $("#btn-waze").href = C.waze;
  $("#zap-1").href = "https://wa.me/5519981174550";
  $("#zap-2").href = "https://wa.me/5519996544550";
  document.querySelectorAll(".js-prazo").forEach(function (el) { el.textContent = C.prazo; });

  /* Acompanhantes aparecem quando vem mais de uma pessoa. */
  var pessoas = $("#r-pessoas"), acompLabel = $("#r-acomp-label");
  function mostraAcomp() { acompLabel.hidden = pessoas.value === "1"; }
  pessoas.addEventListener("change", mostraAcomp); mostraAcomp();

  /* Envio. Com endpoint: POST para o Apps Script. Sem endpoint: abre o WhatsApp com o texto pronto. */
  function dados(form) {
    var d = {}; new FormData(form).forEach(function (v, k) { d[k] = String(v).trim(); }); return d;
  }
  function valida(form, erro) {
    var falta = Array.prototype.filter.call(form.querySelectorAll("[required]"), function (i) { return !i.value.trim(); });
    if (falta.length) {
      erro.textContent = "Falta preencher: " + falta.map(function (i) { return i.closest("label").firstChild.textContent.trim().toLowerCase(); }).join(", ") + ".";
      erro.style.display = "block"; falta[0].focus(); return false;
    }
    erro.style.display = "none"; return true;
  }
  function enviar(tipo, d, form, ok, botao, erro, resumo) {
    if (d.site_url) { form.hidden = true; ok.style.display = "block"; return; } /* robô: finge que deu certo */
    d.tipo = tipo; d.site = "lorena15"; delete d.site_url;
    if (!C.formEndpoint) {
      /* Sem backend ainda: a confirmação vai pelo WhatsApp. */
      window.open(zap(resumo), "_blank", "noopener");
      form.hidden = true; ok.style.display = "block"; return;
    }
    botao.disabled = true; botao.textContent = "Enviando…";
    fetch(C.formEndpoint, { method: "POST", body: JSON.stringify(d) })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        if (!j || !j.ok) throw new Error("resposta");
        form.hidden = true; ok.style.display = "block";
        ok.scrollIntoView({ behavior: "smooth", block: "center" });
      })
      .catch(function () {
        botao.disabled = false; botao.textContent = botao.dataset.rotulo;
        erro.innerHTML = 'Não conseguimos enviar agora. Tente de novo ou <a href="' + zap(resumo) + '" target="_blank" rel="noopener">confirme pelo WhatsApp</a>.';
        erro.style.display = "block";
      });
  }

  var fr = $("#form-rsvp"), okr = $("#ok-rsvp"), er = $("#erro-rsvp");
  var br = fr.querySelector("button[type=submit]"); br.dataset.rotulo = br.textContent;
  fr.addEventListener("submit", function (e) {
    e.preventDefault(); if (!valida(fr, er)) return;
    var d = dados(fr);
    var resumo = "Confirmei! " + d.nome + (d.pessoas !== "1" ? " (" + d.pessoas + " pessoas: " + (d.acompanhantes || "") + ")" : "") + (d.onibus !== "Não" ? ". Ônibus: " + d.onibus : "");
    $("#ok-rsvp-zap").href = zap(resumo);
    enviar("rsvp", d, fr, okr, br, er, resumo);
  });

  var fo = $("#form-onibus"), oko = $("#ok-onibus"), eo = $("#erro-onibus");
  var bo = fo.querySelector("button[type=submit]"); bo.dataset.rotulo = bo.textContent;
  fo.addEventListener("submit", function (e) {
    e.preventDefault(); if (!valida(fo, eo)) return;
    var d = dados(fo);
    var resumo = "Quero um lugar no ônibus (" + d.onibus + "): " + d.nome + ". Responsáveis: " + d.contatoResp + ". Meu contato: " + d.contatoConv;
    $("#ok-onibus-zap").href = zap(resumo);
    enviar("onibus", d, fo, oko, bo, eo, resumo);
  });
})();
