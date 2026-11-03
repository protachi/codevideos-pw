/**
 * Código de exemplo do funcionamento do fetch para pegar o html separado e atualizar o index.html
 * é necessário configurar o router para fazer isso para as páginas a partir da url
 */


import {initHome} from './pages/home.js'

window.addEventListener('DOMContentLoaded', async () => {

  // 1. Faz o fetch do arquivo
  const response = await fetch('./pages/home.html');
      
  // 2. Converte o objeto Response em uma string de texto HTML
  const htmlHome = await response.text();
  
  // 3. Seleciona o elemento correto do seu index.html (#app-page)
  let appRoot = document.querySelector('#app-page');
  
  // 4. Insere o HTML dentro da tag main
  appRoot.innerHTML = htmlHome;

  initHome();
});