/**
 * Arquivo de rotas da aplicação.
 * Deve ser configurado para adição de novas páginas
 */

export const routes = [
  {
    path: '/',
    page: '/pages/landing/landing', //a extensão específica será adicionada em tempo de execução
    title: 'Codevideos'
  },
  {
    path: '/sucesso',
    page: '/pages/sucesso/sucesso',
    title: 'Sucesso'
  },
  {
    path: '/home',
    page: '/pages/home/home',
    title: 'Área do Aluno | CodeVideos'
  },
  {
    path: '/404',
    page: '/pages/404/404',
    title: 'Not Found'
  }
];
