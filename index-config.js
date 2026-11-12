/* ======================================================================
   CONFIGURAÇÃO DO SITE. Tudo o que a família decide fica aqui.
   Campo vazio ("" ou []) = a parte correspondente não aparece no site.
   ====================================================================== */
window.CONFIG = {
  // Backend das confirmações (Google Apps Script, ver apps-script/README.md).
  formEndpoint: "https://script.google.com/macros/s/AKfycby27Jd65hv6eyLpfoUbFxWeh5i3MwWbd3oUKDB-GSnNGfjY4DfjaOsXD_E6r2rTM1W8eA/exec",

  // WhatsApp que recebe o "oi" depois da confirmação e as dúvidas.
  // Só dígitos: DDI + DDD + número. E como chamar esse número no site.
  whatsapp: "5519981174550",            // mãe da Lorena (questionário, 2026-11-07)
  whatsapp2: "5519999264551",           // segundo número que também recebe (Filipe)
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
  traje: "Esporte fino",     // pai da Lorena, questionário de 2026-11-07
  trajeNota: "",             // ex.: "Vestido midi ou longo; camisa social, com ou sem blazer."
  programacao: [],           // ex.: [{ hora: "19h30", o: "Recepção" }, { hora: "21h", o: "Entrada da Lorena" }]
  paraOsPais: "Saída prevista: 17h15 da escola, 17h15 de Campinas (Bonfim) e 18h de Jundiaí. O horário da volta, o ponto de encontro e o contato do adulto responsável por cada ônibus são enviados aos pais pelo WhatsApp. Se o seu filho ou filha tiver alguma necessidade (remédio, restrição alimentar), avise pelo WhatsApp.",
  vindoDeFora: "A Casa Quintal não tem estacionamento: venha de Uber ou 99, que deixam na porta, ou estacione na rua.",
  pixPorWhatsapp: true,      // chave só pelo WhatsApp, nunca no site; haverá mesa de presentes na festa
  hashtag: "",               // Lorena não quer hashtag (2026-11-09)
  mensagem: "",              // recado da Lorena acima da galeria
  fraseSelo: "",             // sem selo "15" na abertura (Lorena, 2026-11-09); campo sem efeito

  // Recursos ligáveis.
  mostrarContagem: true, minimoContagem: 10,   // "Já confirmaram N pessoas" a partir de N
  perguntarMusica: true,     // campo "uma música que não pode faltar"
  perguntarRecado: true,     // campo "deixa um recado pra Lorena"
  storyTemplate: true,       // botão "Baixar o 'Eu vou'" depois de confirmar
  receberFotos: true,        // seção "Suas fotos": envio direto para o Drive da família
  pastaFotosUrl: "https://drive.google.com/drive/folders/1P4C0AD3an4C7x4LhyApF6Y4UApuXAxbt", // pasta das fotos dos convidados

  // Galeria: ordem cronológica. w e h = tamanho do arquivo (tools/fotos.py imprime);
  // ano e legenda vazios = sem capítulos e sem legenda.
  fotos: [
    { src: "01", w: 783, h: 1313, ano: "", legenda: "" }, { src: "02", w: 787, h: 1400, ano: "", legenda: "" }, { src: "03", w: 993, h: 1400, ano: "", legenda: "" },
    { src: "04", w: 1081, h: 899, ano: "", legenda: "" }, { src: "05", w: 787, h: 1400, ano: "", legenda: "" }, { src: "06", w: 787, h: 1400, ano: "", legenda: "" },
    { src: "07", w: 1400, h: 1051, ano: "", legenda: "" }, { src: "08", w: 1154, h: 956, ano: "", legenda: "" }, { src: "09", w: 939, h: 1302, ano: "", legenda: "" },
    { src: "10", w: 1050, h: 1400, ano: "", legenda: "" }, { src: "11", w: 1050, h: 1400, ano: "", legenda: "" }, { src: "12", w: 1050, h: 1400, ano: "", legenda: "" },
    { src: "13", w: 1400, h: 1050, ano: "", legenda: "" }, { src: "14", w: 1400, h: 1050, ano: "", legenda: "" }, { src: "15", w: 1050, h: 1400, ano: "", legenda: "" },
    { src: "16", w: 1280, h: 960, ano: "", legenda: "" }, { src: "17", w: 1400, h: 933, ano: "", legenda: "" }, { src: "18", w: 1050, h: 1400, ano: "", legenda: "" },
    { src: "19", w: 1050, h: 1400, ano: "", legenda: "" }, { src: "20", w: 1050, h: 1400, ano: "", legenda: "" }, { src: "21", w: 828, h: 1202, ano: "", legenda: "" },
    { src: "22", w: 1400, h: 933, ano: "", legenda: "" }, { src: "23", w: 1400, h: 933, ano: "", legenda: "" }, { src: "24", w: 1400, h: 1050, ano: "", legenda: "" },
    { src: "25", w: 1400, h: 933, ano: "", legenda: "" }, { src: "26", w: 1400, h: 1050, ano: "", legenda: "" }, { src: "27", w: 1400, h: 933, ano: "", legenda: "" }
  ],
  capaAtras: "01",           // a foto pequena atrás da capa ("" = só a capa)
  fotosFesta: [],            // depois da festa: [{ src: "f01", legenda: "" }]

  // Quiz "Quanto você conhece a Lorena?" (vazio = não aparece).
  // ex.: [{ p: "Qual é a cor preferida dela?", certa: "Rosa", erradas: ["Azul", "Verde"] }]
  quiz: []
};
