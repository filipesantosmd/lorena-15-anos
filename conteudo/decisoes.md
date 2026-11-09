# Decisões da Lorena (recebidas pelo Filipe em 2026-11-05)

Texto copiado da página de escolhas, mais as notas dela.

- Paleta: as cores da própria página de escolhas (fundo #FFF7F6, rosa #E8899A,
  rosa escuro #B84C66, texto #3A2A30, cinza #7D6670, linha #F0D7DA, dourado
  #C9A24B).
- Letras: Italiana (títulos) + Jost (textos).
- Endereço: 15anosdalorena.com.br.
- Estilo que gostou: Sarah & Daniel (https://the-union-template.webflow.io/):
  letras grandes, fotos tipo polaroid, faixa rolante, ar de revista.
- Seções: capa com foto grande e a data; galeria de fotos; local com mapa;
  ônibus e formulário do ônibus; lista de presentes; confirmação de presença;
  animação de abertura.
- Não quis: contagem regressiva, texto sobre ela, programação, dress code,
  corte, Pix, música, mural, hashtag, álbum, FAQ, versão em inglês, botão de
  tela inicial.

## Confirmação de presença

- Quem confirma: os dois jeitos (cada convidado, ou um pela família com os nomes).
- Perguntar: nome completo; quantas pessoas vêm; nomes dos acompanhantes;
  vai de ônibus? qual; WhatsApp.
- Quem não puder ir não responde (só quem vai).
- Sem acompanhante extra: só quem está convidado.
- Prazo: 31 de dezembro de 2026.
- Depois de confirmar: mensagem de obrigada na tela + botão "confirmei!" para o
  WhatsApp.
- Pedido dela: os dados ficam só com a família, sem e-mail; contato pelo
  WhatsApp.

## Como foi implementado

- Formulário dentro do site, sem login, com armadilha anti-robô.
- Dados gravados numa planilha do Google via Apps Script (apps-script/).
- `lista.html`: página com senha, dentro do site, que mostra as confirmações.
- Enquanto o Apps Script não estiver configurado, o botão de confirmar abre o
  WhatsApp com o texto pronto.

## Domínio

15anosdalorena.com.br registrado no Registro.br em 2026-11-05 (vence em
2027-11-05, renovar antes se o site continuar no ar). DNS no próprio
Registro.br: quatro A para os IPs do GitHub Pages e CNAME www. No ar com HTTPS
em 2026-11-06.

## Questionário (2026-11-06)

`perguntas.html` pergunta à Lorena e aos pais: traje, horários da noite,
momentos (valsa, velas, corte), estacionamento/metrô/hotel, horários e adulto
do ônibus, Pix e mesa de presentes, WhatsApp do "oi", hashtag, mensagem dela,
frase do selo, recursos a ligar, ideias, quiz (até 8 perguntas), ano e legenda
de cada foto, foto de capa. As respostas chegam na aba "Perguntas" da planilha
e viram edições em `index-config.js`.

## Backend ligado (2026-11-07)

Planilha "15 anos da Lorena" na conta filipenadir@gmail.com, com as abas
Confirmações, Ônibus, Fotos, Perguntas. Script publicado com acesso ao Drive;
fotos dos convidados vão para a pasta 1P4C0AD3an4C7x4LhyApF6Y4UApuXAxbt
(subpasta por remetente). Tudo testado de ponta a ponta em 2026-11-07.

## Respostas do pai da Lorena (questionário, 2026-11-07)

- Traje: esporte fino.
- Momentos da noite: entrada da debutante, valsa com a família, troca de
  vestido, open bar de drinks sem álcool, lembrancinha. Sem horários ainda, e a
  seção "Programação" não foi marcada: não aparece.
- Estacionamento: não há; rua ou app. Vira o quadro "Vindo de fora".
- Ônibus: saída 18h de Jundiaí, 17h15 de Campinas (Bonfim), 17h15 da escola.
  Volta e adulto responsável: pelo WhatsApp. Vira o quadro "Para os pais".
- Pix: sim, chave só pelo WhatsApp. Mesa de presentes na festa.
- WhatsApp principal: o da mãe, (19) 98117-4550; o segundo é (19) 99926-4551.
- Música no site: não. Player, arquivo e página de escolha removidos.
- Recursos ligados: música na confirmação, recado, contador de confirmados,
  story "Eu vou", álbum depois da festa. Não marcados: quiz, legendas,
  capítulos, "A turma".
- Não respondidos: hashtag (fica #LorenaSiqueira15), mensagem dela, frase do
  selo, legendas das fotos, foto de capa.

## Respostas da Lorena (WhatsApp ao Filipe, 2026-11-09)

- Lista de presentes: fica como está (lista de ideias).
- Hashtag: não quer. Removida do site.
- Mensagem dela: não. Frase secreta: não; prefere sem o selo "15". Selo
  removido da abertura, da prévia, dos ícones e do story.
- Capa: vai pensar em outra foto; por enquanto fica a atual.
- Legendas nas fotos: não. Programação: não (decisão do pai). Quiz: não.
- Código de convite: acha desnecessário; vai ver com os pais.

## Pendente

- (feito 2026-11-06) WhatsApp do "oi" e das dúvidas: (19) 99926-4551, e
  também (19) 98117-4550 (Filipe).
- Tudo o que depende das respostas do questionário (ver acima).
- Fotos: já vêm da pasta "15 anos" do Drive da Lorena (2026-11-06); quando ela mudar a pasta, refazer a galeria.
- (feito 2026-11-06) Apps Script instalado na conta do Filipe; planilha "15 anos da Lorena".
