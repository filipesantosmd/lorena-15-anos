# Os 15 da Lorena

Site da festa de 15 anos da Lorena de Siqueira Santos. sábado, 13 de fevereiro de 2027, 19h30,
Casa Quintal, São Paulo.

No ar em https://15anosdalorena.com.br. Site estático (HTML, CSS, um pouco de
JS), sem build, publicado pelo GitHub Pages a partir do branch `main`. Nada aqui
é compartilhado com outros projetos.

- `index.html` é a página. `index-config.js` guarda tudo o que a família
  decide (traje, programação, WhatsApp, hashtag, legendas das fotos, quiz...):
  campo vazio = a parte não aparece.
- `lista.html` é a página com senha onde a família vê confirmações, ônibus,
  músicas, recados e as respostas do questionário.
- `perguntas.html` é o questionário que a Lorena e os pais respondem; as
  respostas vão para a aba "Perguntas" da planilha.
- `assets/` guarda fotos otimizadas (e versões pequenas em `fotos/sm/`), o
  CSS, o JS, a imagem de prévia do WhatsApp, os ícones, o story "Eu vou", o
  mapa estático e o arquivo de agenda.
- `tools/fotos.py` prepara fotos novas; `tools/build_assets.py` regenera
  prévia, ícones, story, agenda e versões pequenas.
- `apps-script/` tem o código e as instruções do backend.
- `conteudo/` guarda o inventário do conteúdo e as capturas do site antigo
  (Google Sites), para conferência.
