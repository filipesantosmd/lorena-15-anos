/**
 * Os 15 da Lorena: recebe do site as confirmações de presença, os pedidos de
 * ônibus e as respostas do questionário, e guarda tudo numa planilha do
 * Google. Devolve a lista para lista.html (com a senha TOKEN) e uma contagem
 * pública (só números) para o site.
 *
 * Sem duplicados: a mesma pessoa que envia de novo atualiza a linha dela.
 * Confirmação: mesmo WhatsApp (ou mesmo nome, quando falta telefone).
 * Ônibus: mesmo nome, desde que o telefone não contradiga.
 *
 * Fotos dos convidados: o site manda cada foto (já reduzida) e o script grava
 * na pasta do Drive cuja ID está em PASTA_FOTOS (Script Properties), numa
 * subpasta com o nome de quem mandou.
 *
 * Instalação e atualização: ver README.md nesta pasta.
 */
var ABA_RSVP = "Confirmações";
var ABA_ONIBUS = "Ônibus";
var ABA_PERGUNTAS = "Perguntas";
var ABA_FOTOS = "Fotos";
var CAB_RSVP = ["Data", "Nome", "WhatsApp", "Pessoas", "Acompanhantes", "Ônibus", "Música", "Recado"];
var CAB_ONIBUS = ["Data", "Nome", "Contato responsáveis", "Contato convidado", "Ônibus", "Confirmado por"];

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents || "{}");
    if (d.site !== "lorena15") return resposta({ ok: false, error: "origem" });
    if (d.site_url) return resposta({ ok: true }); // robô caiu na armadilha
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var atualizado = false;
    if (d.tipo === "onibus") {
      var s = aba(ss, ABA_ONIBUS, CAB_ONIBUS);
      atualizado = gravar(s, [new Date(), d.nome || "", d.contatoResp || "", d.contatoConv || "", d.onibus || "", d.confirmadoPor || ""], "nome", 1, 3);
    } else if (d.tipo === "foto") {
      var idPasta = PropertiesService.getScriptProperties().getProperty("PASTA_FOTOS");
      if (!idPasta) return resposta({ ok: false, error: "pasta" });
      var nome = String(d.nome || "convidado").replace(/[\\/:*?"<>|]/g, " ").trim();
      var pasta = DriveApp.getFolderById(idPasta);
      var sub = pasta.getFoldersByName(nome); sub = sub.hasNext() ? sub.next() : pasta.createFolder(nome);
      var blob = Utilities.newBlob(Utilities.base64Decode(d.dados || ""), d.mime || "image/jpeg", Utilities.formatDate(new Date(), "America/Sao_Paulo", "yyyyMMdd-HHmmss") + " " + String(d.arquivo || "foto.jpg").replace(/\.[^.]+$/, "") + ".jpg");
      var f = sub.createFile(blob);
      aba(ss, ABA_FOTOS, ["Data", "Quem", "Arquivo", "Link"]).appendRow([new Date(), nome, f.getName(), f.getUrl()]);
    } else if (d.tipo === "perguntas") {
      aba(ss, ABA_PERGUNTAS, ["Data", "Quem", "Respostas (JSON)"]).appendRow([new Date(), d.quem || "", JSON.stringify(d.respostas || {})]);
    } else {
      var r = aba(ss, ABA_RSVP, CAB_RSVP);
      atualizado = gravar(r, [new Date(), d.nome || "", d.whatsapp || "", d.pessoas || "1", d.acompanhantes || "", d.onibus || "Não", d.musica || "", d.recado || ""], "tel", 1, 2);
    }
    return resposta({ ok: true, atualizado: atualizado });
  } catch (err) {
    return resposta({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (p.contagem) {
    var rs = linhas(ss, ABA_RSVP, CAB_RSVP.length);
    var pessoas = rs.reduce(function (a, r) { return a + (parseInt(r[3], 10) || 1); }, 0);
    return resposta({ ok: true, confirmacoes: rs.length, pessoas: pessoas });
  }
  if (!p.lista) return resposta({ ok: true, servico: "lorena15" });
  var token = PropertiesService.getScriptProperties().getProperty("TOKEN");
  if (!token || p.token !== token) return resposta({ ok: false, error: "senha" });
  return resposta({
    ok: true,
    rsvp: objetos(ss, ABA_RSVP, ["data", "nome", "whatsapp", "pessoas", "acompanhantes", "onibus", "musica", "recado"]),
    onibus: objetos(ss, ABA_ONIBUS, ["data", "nome", "contatoResp", "contatoConv", "onibus", "confirmadoPor"]),
    perguntas: objetos(ss, ABA_PERGUNTAS, ["data", "quem", "json"]),
    fotos: objetos(ss, ABA_FOTOS, ["data", "quem", "arquivo", "link"])
  });
}

/** Grava a linha; substitui a linha da mesma pessoa, se existir. */
function gravar(sheet, linha, modo, colNome, colTel) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var n = sheet.getLastRow();
    if (n >= 2) {
      var vals = sheet.getRange(2, 1, n - 1, linha.length).getValues();
      var telNovo = digitos(linha[colTel]), nomeNovo = chave(linha[colNome]);
      for (var i = 0; i < vals.length; i++) {
        var telVelho = digitos(vals[i][colTel]), nomeVelho = chave(vals[i][colNome]);
        var mesma;
        if (modo === "tel") mesma = (telNovo && telVelho) ? telNovo === telVelho : (nomeNovo && nomeNovo === nomeVelho);
        else mesma = nomeNovo && nomeNovo === nomeVelho && (!telNovo || !telVelho || telNovo === telVelho);
        if (mesma) {
          sheet.getRange(i + 2, 1, 1, linha.length).setValues([linha]);
          return true;
        }
      }
    }
    sheet.appendRow(linha);
    return false;
  } finally {
    lock.releaseLock();
  }
}

function chave(s) {
  return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "");
}

function digitos(s) {
  var d = String(s || "").replace(/\D/g, "");
  if (d.length > 11 && d.indexOf("55") === 0) d = d.slice(2); // tira o +55
  return d.length >= 8 ? d.slice(-9) : d;                       // compara os últimos 9 dígitos
}

/** Abre a aba; cria com cabeçalho se não existir; completa o cabeçalho se faltar coluna. */
function aba(ss, nome, cabecalho) {
  var s = ss.getSheetByName(nome);
  if (!s) { s = ss.insertSheet(nome); s.appendRow(cabecalho); s.setFrozenRows(1); return s; }
  if (s.getLastColumn() < cabecalho.length) s.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]);
  return s;
}

function linhas(ss, nome, ncols) {
  var s = ss.getSheetByName(nome);
  if (!s || s.getLastRow() < 2) return [];
  return s.getRange(2, 1, s.getLastRow() - 1, ncols).getValues();
}

function objetos(ss, nome, chaves) {
  return linhas(ss, nome, chaves.length).map(function (r) {
    var o = {};
    chaves.forEach(function (k, i) { o[k] = r[i] instanceof Date ? r[i].toISOString() : r[i]; });
    return o;
  }).reverse();
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
