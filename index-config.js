/* ======================================================================
   CONFIGURAÇÃO DO SITE. Tudo o que a família decide fica aqui.
   Campo vazio ("" ou []) = a parte correspondente não aparece no site.
   ====================================================================== */
window.CONFIG = {
  // Backend das confirmações (Google Apps Script, ver apps-script/README.md).
  formEndpoint: "https://script.google.com/macros/s/AKfycby27Jd65hv6eyLpfoUbFxWeh5i3MwWbd3oUKDB-GSnNGfjY4DfjaOsXD_E6r2rTM1W8eA/exec",

  // WhatsApp que recebe o "oi" depois da confirmação e as dúvidas.
  // Só dígitos: DDI + DDD + número. E como chamar esse número no site.
  whatsapp: "5519999264551",            // Filipe, 2026-11-06: confirmações e dúvidas
  whatsapp2: "5519981174550",           // segundo número que também recebe
  whatsappPara: "pra família da Lorena",   // ou "pra Lorena", se for o dela

  // A festa.
  dataFesta: "2027-02-13T19:30:00-03:00",
  fimFesta: "",                          // ex.: "2027-02-14T02:00:00-03:00"; vazio = o site diz só "a partir das 19h30"
  prazo: "31 de dezembro de 2026",
  prazoISO: "2026-12-31",
  lugar: "Casa Quintal",
  endereco: "Av. Angélica, 2278 - Consolação, São Paulo - SP, 01228-200",
  lat: -23.5521113, lon: -46.6610456,

  // Decididos pela família (vazio = não aparece).
  traje: "",                 // ex.: "Esporte fino"
  trajeNota: "",             // ex.: "Vestido midi ou longo; camisa social, com ou sem blazer."
  programacao: [],           // ex.: [{ hora: "19h30", o: "Recepção" }, { hora: "21h", o: "Entrada da Lorena" }]
  paraOsPais: "",            // texto do quadro "Para os pais" na seção do ônibus
  vindoDeFora: "",           // estacionamento, metrô, hotel (seção do local)
  pixPorWhatsapp: false,     // true = mostra "peça a chave Pix pelo WhatsApp"
  hashtag: "#LorenaSiqueira15", // única: "#15daLorena" já é de outra Lorena famosa (Irmãs Pina)
  mensagem: "",              // recado da Lorena acima da galeria
  fraseSelo: "",             // surpresa ao tocar 3 vezes no selo "15"

  // Música do site: começa ao abrir o convite, com botão ♪ para pausar.
  // Só músicas livres podem ser tocadas; a favorita dela vai como link.
  musica: { src: "assets/musica.mp3?v=2", titulo: "Life of Riley, Kevin MacLeod", credito: "incompetech.com, CC BY 4.0", volume: 0.4, spotify: "" },

  // Recursos ligáveis.
  mostrarContagem: true, minimoContagem: 10,   // "Já confirmaram N pessoas" a partir de N
  perguntarMusica: true,     // campo "uma música que não pode faltar"
  perguntarRecado: true,     // campo "deixa um recado pra Lorena"
  storyTemplate: true,       // botão "Baixar o 'Eu vou'" depois de confirmar
  receberFotos: true,        // seção "Suas fotos": envio direto para o Drive da família
  pastaFotosUrl: "https://drive.google.com/drive/folders/1P4C0AD3an4C7x4LhyApF6Y4UApuXAxbt", // pasta das fotos dos convidados

  // Galeria: ordem cronológica. ano e legenda vazios = sem capítulos e sem legenda.
  fotos: [
    { src: "01", ano: "", legenda: "" }, { src: "02", ano: "", legenda: "" }, { src: "03", ano: "", legenda: "" },
    { src: "04", ano: "", legenda: "" }, { src: "05", ano: "", legenda: "" }, { src: "06", ano: "", legenda: "" },
    { src: "07", ano: "", legenda: "" }, { src: "08", ano: "", legenda: "" }, { src: "09", ano: "", legenda: "" },
    { src: "10", ano: "", legenda: "" }, { src: "11", ano: "", legenda: "" }, { src: "12", ano: "", legenda: "" },
    { src: "13", ano: "", legenda: "" }, { src: "14", ano: "", legenda: "" }, { src: "15", ano: "", legenda: "" },
    { src: "16", ano: "", legenda: "" }, { src: "17", ano: "", legenda: "" }, { src: "18", ano: "", legenda: "" },
    { src: "19", ano: "", legenda: "" }, { src: "20", ano: "", legenda: "" }, { src: "21", ano: "", legenda: "" },
    { src: "22", ano: "", legenda: "" }, { src: "23", ano: "", legenda: "" }, { src: "24", ano: "", legenda: "" },
    { src: "25", ano: "", legenda: "" }, { src: "26", ano: "", legenda: "" }, { src: "27", ano: "", legenda: "" }
  ],
  capaAtras: "01",           // a foto pequena atrás da capa ("" = só a capa)
  fotosFesta: [],            // depois da festa: [{ src: "f01", legenda: "" }]

  // Quiz "Quanto você conhece a Lorena?" (vazio = não aparece).
  // ex.: [{ p: "Qual é a cor preferida dela?", certa: "Rosa", erradas: ["Azul", "Verde"] }]
  quiz: []
};
