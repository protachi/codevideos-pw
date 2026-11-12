/**
 * Código de exemplo do funcionamento do fetch para pegar o html separado e atualizar o index.html
 * é necessário configurar o router para fazer isso para as páginas a partir da url
 */

const routes = [
  {
    path: '/',
    page: '/pages/home.html',
    title: 'Home'
  },
  {
    path: '/sobre',
    page: './pages/sobre.html',
    title: 'Sobre'
  },
  {
    path: '/404',
    page: './pages/404.html',
    title: 'Not Found'
  }
];

document.addEventListener('click', event => {
  // Pega o elemento ou ancestral mais próximo que bata o seletor
  const pageLink = event.target.closest('a[data-page]');

  if(pageLink) {
    event.preventDefault();
    const url = pageLink.getAttribute('href');
    navigateTo(url);
  }

});

window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname, true);
})

navigateTo(window.location.pathname, true);

//pega a página desejada
async function navigateTo(path, skipHistory=false) {
  // Seleciona o elemento raiz do index.html (#app-page)
  let appRoot = document.querySelector('#app-page');
  let html;
  
  let route = routes.find(route => route.path === path);
  console.log(route);
  

  try {
    if (!route) {
      route = routes.find(r => r.path === '/404');

      if(!route) {
        const err = new Error(`A rota "${path}" não existe e a página 404 padrão não foi configurada.`);
        err.name = 'Erro404';
        throw err;
      }
    }
    

    if (route.title) {
      document.title = route.title;
    }

    console.log('navigateTo: page:', route.page)
    updateHistory(route.path, skipHistory);


    //chama a função para tentar obter a página html
    html = await getPage(route.page);
  } catch (err) {

    //tenta buscar a página 404 se a página não foi encontrada
    if (err.name === 'Erro404' && route && route.path != '/404' && routes.some(r => r.path === '/404')) {
      console.warn(`Página não encontrada: ${route.page}. Redirecionando para a página 404.`);
      return navigateTo('/404');
    }

    console.error('FALHA CRÍTICA:', err.message);
    html = `<h1>${err.message}</h1>`;
  } finally {
    // insere o HTML dentro do elemento raiz (podendo ser a página ou msg de erro)
    appRoot.innerHTML = html;
  }
}

async function getPage(page) {

  if (!page) {
    page = route.page;
    const err = new Error(`Caminho da página inválido ou não fornecido.`);
    err.name = 'Erro404';
    throw err;
  }

  // 1. Faz o fetch do arquivo
  const response = await fetch(page);

  if (!response.ok) {
    
    // Para um 404 REAL
    if(response.status == '404') {
      const error404 = new Error(`O arquivo "${page}" não foi encontrado (Status 404).`);
      error404.name = 'Erro404';
      throw error404;
    }
    
    // Para demais erros
    throw new Error(`Erro HTTP no servidor: Status ${response.status}`);
  }

  // 2. Converte o objeto Response em uma string de texto HTML
  const html = await response.text();
  
  // Para erro 404 que retorna o index.html
  if (html.toLowerCase().trim().startsWith('<!doctype html>') && page !== '/') {
    console.error("ERRO 404")
    const error404 = new Error(`A rota está mapeada, mas o arquivo "${page}" não foi encontrado.`);
    error404.name = 'Erro404';
    throw error404;
  }

  // 3. Retorna o html encontrado
  return html;
}

// Função auxiliar para gerenciar o histórico do navegador
function updateHistory(path, skipHistory = false) {
  console.log('windows location', window.location.pathname)
  console.log('path', path)
  if (skipHistory || !path || window.location.pathname === path) return;

  if (path === '/404') {
    history.replaceState(null, '', path);
  } else {
    history.pushState(null, '', path);
  }
}