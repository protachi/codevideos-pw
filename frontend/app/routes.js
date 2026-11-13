/**
 * Arquivo de rotas da aplicação.
 * Deve ser configurado para adição de novas páginas
 */

export const routes = [
  {
    path: '/',
    page: '/pages/home/home', //a extensão específica será adicionada em tempo de execução
    title: 'Home'
  },
  {
    path: '/404',
    page: '/pages/404/404',
    title: 'Not Found'
  }
];
