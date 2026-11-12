/**
 * Configuração do roteador para gerenciamento das rotas da aplicação SPA
 * Alteração nesse arquivo deve ser feita com cuidado
 */

import { routes } from "../routes.js";

export class Router {
  constructor() {
    this.init();
  }

  // Função privada auxiliar para gerenciar o histórico do navegador
  #updateHistory(path, skipHistory = false) {
    console.log('windows location', window.location.pathname)
    console.log('path', path)
    if (skipHistory || !path || window.location.pathname === path) return;

    if (path === '/404') {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }
  }

  // Função privada para fazer o fetch da página
  async #getPage(page) {
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
      if (response.status == '404') {
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

  // Navega para a rota desejada
  async navigateTo(path, skipHistory = false) {
    // Seleciona o elemento raiz do index.html (#app-page)
    let appRoot = document.querySelector('#app-page');
    let html;

    let route = routes.find(route => route.path === path);
    console.log(route);


    try {
      if (!route) {
        route = routes.find(r => r.path === '/404');

        if (!route) {
          const err = new Error(`A rota "${path}" não existe e a página 404 padrão não foi configurada.`);
          err.name = 'Erro404';
          throw err;
        }
      }


      if (route.title) {
        document.title = route.title;
      }

      console.log('navigateTo: page:', route.page)
      this.#updateHistory(route.path, skipHistory);


      //chama a função para tentar obter a página html
      html = await this.#getPage(route.page);
    } catch (err) {

      //tenta buscar a página 404 se a página não foi encontrada
      if (err.name === 'Erro404' && route && route.path != '/404' && routes.some(r => r.path === '/404')) {
        console.warn(`Página não encontrada: ${route.page}. Redirecionando para a página 404.`);
        return this.navigateTo('/404');
      }

      console.error('FALHA CRÍTICA:', err.message);
      html = `<h1>${err.message}</h1>`;
    } finally {
      // insere o HTML dentro do elemento raiz (podendo ser a página ou msg de erro)
      appRoot.innerHTML = html;
    }
  }

  // Inicializa os listeners para os eventos de rotas
  init() {
    // Adiciona listener de clique dos links com data-page
    document.addEventListener('click', event => {
      // Pega o elemento ou ancestral mais próximo que bata o seletor
      const pageLink = event.target.closest('a[data-page]');

      if (pageLink) {
        event.preventDefault();
        const url = pageLink.getAttribute('href');
        this.navigateTo(url);
      }

    });

    // Cuida do evento do histórico (setas Avançar/Voltar do navegador)
    window.addEventListener('popstate', () => {
      this.navigateTo(window.location.pathname, true);
    })

    // Lida com a carga inicial da página (F5 ou digitação direta na URL)
    document.addEventListener('DOMContentLoaded', () => {
      this.navigateTo(window.location.pathname, true);
    });
  }
}