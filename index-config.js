/* ======================================================================
   CONFIGURAÇÃO. Tudo o que muda com frequência fica aqui.
   ====================================================================== */
window.CONFIG = {
  // Endereço do Apps Script que recebe as confirmações (ver apps-script/README.md).
  // Enquanto estiver vazio, o formulário manda a confirmação pelo WhatsApp.
  formEndpoint: "https://script.google.com/macros/s/AKfycby27Jd65hv6eyLpfoUbFxWeh5i3MwWbd3oUKDB-GSnNGfjY4DfjaOsXD_E6r2rTM1W8eA/exec",
  // WhatsApp que recebe o "confirmei!" e as dúvidas (DDI + DDD + número, só dígitos).
  whatsapp: "5519981174550",
  // Prazo para confirmar presença.
  prazo: "31 de dezembro de 2026",
  // Link do mapa.
  maps: "https://www.google.com/maps/search/?api=1&query=Casa+Quintal%2C+Av.+Ang%C3%A9lica+2278%2C+Consola%C3%A7%C3%A3o%2C+S%C3%A3o+Paulo",
  waze: "https://waze.com/ul?q=Av.%20Ang%C3%A9lica%202278%20Consola%C3%A7%C3%A3o%20S%C3%A3o%20Paulo&navigate=yes"
};
