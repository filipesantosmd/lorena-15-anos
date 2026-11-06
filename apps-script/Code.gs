/**
 * Os 15 da Lorena: recebe as confirmações de presença e os pedidos de ônibus
 * do site e guarda numa planilha do Google. Também devolve a lista para a
 * página lista.html, mediante a senha guardada em TOKEN (Script Properties).
 *
 * Sem duplicados: se a mesma pessoa enviar de novo (mesmo WhatsApp, ou mesmo
 * nome quando não há telefone para comparar), a linha existente é atualizada
 * em vez de criar outra.
 *
 * Instalação e atualização: ver README.md nesta pasta.
 */
var ABA_RSVP = "Confirmações";
var ABA_ONIBUS = "Ônibus";

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents || "{}");
    if (d.site !== "lorena15") return resposta({ ok: false, error: "origem" });
    if (d.site_url) return resposta({ ok: true }); // robô caiu na armadilha
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var atualizado;
    if (d.tipo === "onibus") {
      var s = aba(ss, ABA_ONIBUS, ["Data", "Nome", "Contato responsáveis", "Contato convidado", "Ônibus"]);
      atualizado = gravar(s, [new Date(), d.nome || "", d.contatoResp || "", d.contatoConv || "", d.onibus || ""], 1, 3);
    } else {
      var r = aba(ss, ABA_RSVP, ["Data", "Nome", "WhatsApp", "Pessoas", "Acompanhantes", "Ônibus"]);
      atualizado = gravar(r, [new Date(), d.nome || "", d.whatsapp || "", d.pessoas || "1", d.acompanhantes || "", d.onibus || "Não"], 1, 2);
    }
    return resposta({ ok: true, atualizado: atualizado });
  } catch (err) {
    return resposta({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var p = (e && e.parameter) || {};
  if (!p.lista) return resposta({ ok: true, servico: "lorena15" });
  var token = PropertiesService.getScriptProperties().getProperty("TOKEN");
  if (!token || p.token !== token) return resposta({ ok: false, error: "senha" });
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return resposta({
    ok: true,
    rsvp: linhas(ss, ABA_RSVP, ["data", "nome", "whatsapp", "pessoas", "acompanhantes", "onibus"]),
    onibus: linhas(ss, ABA_ONIBUS, ["data", "nome", "contatoResp", "contatoConv", "onibus"])
  });
}

/**
 * Grava a linha. Se já existe uma linha da mesma pessoa, substitui.
 * colNome e colTel são os índices (base 0) das colunas de nome e telefone.
 * Mesma pessoa: telefones iguais quando os dois existem; senão, nomes iguais.
 */
function gravar(sheet, linha, colNome, colTel) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var n = sheet.getLastRow();
    if (n >= 2) {
      var vals = sheet.getRange(2, 1, n - 1, linha.length).getValues();
      var telNovo = digitos(linha[colTel]), nomeNovo = chave(linha[colNome]);
      for (var i = 0; i < vals.length; i++) {
        var telVelho = digitos(vals[i][colTel]), nomeVelho = chave(vals[i][colNome]);
        var mesma = (telNovo && telVelho) ? telNovo === telVelho : (nomeNovo && nomeNovo === nomeVelho);
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
  return String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]/g, "");
}

function digitos(s) {
  var d = String(s || "").replace(/\D/g, "");
  if (d.length > 11 && d.indexOf("55") === 0) d = d.slice(2); // tira o +55
  return d.length >= 8 ? d.slice(-9) : d; // compara os últimos 9 dígitos
}

function aba(ss, nome, cabecalho) {
  var s = ss.getSheetByName(nome);
  if (!s) { s = ss.insertSheet(nome); s.appendRow(cabecalho); s.setFrozenRows(1); }
  return s;
}

function linhas(ss, nome, chaves) {
  var s = ss.getSheetByName(nome);
  if (!s || s.getLastRow() < 2) return [];
  return s.getRange(2, 1, s.getLastRow() - 1, chaves.length).getValues().map(function (r) {
    var o = {};
    chaves.forEach(function (k, i) { o[k] = r[i] instanceof Date ? r[i].toISOString() : r[i]; });
    return o;
  }).reverse();
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
