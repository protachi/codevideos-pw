/**
 * Código de exemplo do funcionamento do fetch para pegar o html separado e atualizar o index.html
 * é necessário configurar o router para fazer isso para as páginas a partir da url
 */

import {initHome} from './pages/home.js';
 
const routes = [
    {
        path: '/',
        page: './pages/home.html',
        title: 'Home'
    },
    {
        path: '/sobre',
        page: './pages/sobre.html',
        title: 'Sobre'
    }
];

document.querySelectorAll('a[data-page]').forEach(link => {
  link.addEventListener('click', handleLocation);
})


window.addEventListener('popstate', e => {
  
})

//previne o carregamento, altera a url e título
function handleLocation(event) {
  event.preventDefault();

  const url = event.currentTarget.getAttribute('href');

  let route = routes.find(route => route.path === url);

  console.log(route);

  if(route) {
    history.pushState(null, '', url);

    if(route.title) {
      document.title = route.title;
    }else {
      document.title = event.currentTarget.innerHTML;
    }

  }else {
    history.pushState(null, '', '/');
    route = routes.find(r => r.path === '/');
  }
  
  navigateTo(route.page);
}

//pega a página desejada
async function navigateTo(page) {
  console.log('navigateTo: page:',page)

  // Seleciona o elemento raiz do index.html (#app-page)
  let appRoot = document.querySelector('#app-page');

  try {
    // 1. Faz o fetch do arquivo
    const response = await fetch(page);
        
    if(!response.ok)
      throw Error('Erro ao buscar a página');

    // 2. Converte o objeto Response em uma string de texto HTML
    const html = await response.text();
    
    // 3. Insere o HTML dentro do elemento raiz
    appRoot.innerHTML = html;
  }catch(err) {
    console.error(err);

    appRoot.innerHTML = `<h1>${err.message}</h1>`;
  }
}