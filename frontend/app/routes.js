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
    path: '/perfil',
    page: '/pages/perfil/perfil',
    title: 'Meu Perfil'
  },
  {
    path: '/curso',
    page: '/pages/curso/curso',
    title: 'Curso'
  },
  {
    path: '/aula',
    page: '/pages/aula/aula',
    title: 'Curso'
  },
  {
    path: '/404',
    page: '/pages/404/404',
    title: 'Not Found'
  }
];
