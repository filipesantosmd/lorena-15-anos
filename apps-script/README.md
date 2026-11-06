# Backend das confirmações (Google Apps Script)

As confirmações de presença e os pedidos de ônibus do site vão para uma
planilha do Google. Nada passa por e-mail. A página `lista.html` do site mostra
a lista para a família, protegida por senha.

Custo: zero. Nada pausa, nada expira. Quem faz a instalação precisa de uma
conta Google (pode ser a do Filipe ou a dos pais da Lorena).

## Instalar (uma vez, uns 10 minutos)

1. Em https://sheets.new crie uma planilha e dê o nome "15 anos da Lorena".
2. Menu **Extensões → Apps Script**. Apague o conteúdo do editor e cole o
   arquivo `Code.gs` desta pasta. Salve (ícone de disquete).
3. No menu da esquerda, **Configurações do projeto** (ícone de engrenagem)
   → **Propriedades do script** → **Adicionar propriedade**:
   nome `TOKEN`, valor = a senha que a família vai usar em `lista.html`.
   Escolha uma senha boa (uma frase curta serve). Salve.
4. Botão azul **Implantar → Nova implantação**. Tipo: **App da Web**.
   Executar como: **Eu**. Quem pode acessar: **Qualquer pessoa**. Implantar.
   Na primeira vez o Google pede autorização: Avançado → Acessar (não seguro)
   → Permitir. É o aviso padrão para scripts próprios.
5. Copie a **URL do app da Web** (termina em `/exec`).
6. Cole essa URL em `index-config.js` no site, no campo `formEndpoint`.
   Faça commit. O site passa a gravar na planilha em cerca de um minuto.

## Testar

Abra o site, confirme presença com um nome de teste. A linha aparece na aba
"Confirmações" da planilha. Abra `lista.html`, digite a senha, a linha aparece.
Apague a linha de teste na planilha.

## Sem duplicados

O script compara cada envio com as linhas que já existem: mesmo WhatsApp (ou
mesmo nome, quando não há telefone para comparar) significa a mesma pessoa, e a
linha existente é substituída. O site também lembra, no aparelho da pessoa, o
que ela já enviou, avisa e preenche o formulário de novo. Duas pessoas com o
mesmo nome e telefones diferentes continuam sendo duas linhas.

## Mudar o código depois

Editou `Code.gs`? Cole de novo no editor, salve e faça
**Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova versão →
Implantar**. A URL continua a mesma.
