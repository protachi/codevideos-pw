## Todo: explicar os passos para utilizar json-server para manter e resetar o banco de dados

## Como executar na minha máquina?

Para subir a aplicação você precisará de um servidor, para evitar o problema de CORS ao tentar buscar os arquivos HTML e também para fazer o redirecionamento da URL para o arquivo `index.html`.


### Utilizando scripts do package.json

**Utilizando o Serve**

Você pode subir a aplicação com o comando abaixo (na raiz do projeto):

> npm run dev:serve

Ele irá executar o comando `npx serve -s` por trás dos panos. A flag `-s` ou `--single` indica que é uma aplicação SPA e já cuida do redirecionamento para o `index.html`. Há uma dependência do arquivo `serve.json`, que configura o **serve** para não limpar as urls e manter as extensões.

**Utilizando o BrowserSync**

Você pode também subir a aplicação com o seguinte comando (na raiz do projeto):

> npm run dev:browser-sync

Ele irá executar o comando `npx browser-sync start --server --files '**/*' --single`, que irá subir um servidor usando o **BrowserSync**, que não limpa url por padrão e também recebe uma flag `--single` para fazer o redirecionamento para o `index.html` para rotas inexistentes. Ele utiliza a flag `--files` para saber quais arquivos ele considerar no seu *live-reloading*.


## Utilizando a extensão Live-server do VSCODE

Você pode preferir utilizar a extensão live-server do Visual Studio Code por gosto ou por não possuir o node.js instalado na máquina.
Para subir a aplicação de forma funcional com essa extensão você deve adicionar a seguinte configuração no arquivo `.vscode/settings.json`:

```json
TODO: TESTAR COM A EXTENSÃO PARA SABER SE É ISSO MESMO!!!
{
  "liveServer.settings.proxy": {
    "enable": true,
    "baseUri": "/",
    "proxyUri": "http://127.0.0"
  }
}
```

### Limpando caches da página

Pode ser que durante o desenvolvimento você enfrente problemas de buscar a página ou algo do tipo devido a alguma requisição que ficou com a resposta armazenada como cache no navegador e retorna essa resposta antiga nas novas requisições. Para limpar o cache você pode:

**Limpar da forma fácil:**

Utilize o atalho `CTRL + F5`, isso irá recarregar a página e limpar os caches leves. Para os caches pesados é mais trabalhoso.

**Limpar da forma difícil:**

1. Mantenha a janela do seu site aberta no navegador.
2. Abra o DevTools (F12).
3. Vá para a aba Network (Rede).
4. Certifique-se de que a caixinha Disable cache (Desativar cache) está marcada.
5. Deixe o DevTools aberto, clique e segure o botão de recarregar a página do navegador (a setinha circular no topo esquerdo) até abrir um menu suspenso.
6. Escolha a opção "Esvaziar cache e reinicialização forçada" (ou Empty cache and hard reload).

