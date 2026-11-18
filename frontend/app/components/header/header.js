import { router } from "../../core/router.js";

function renderGuestNav() {
  return `
    <a href="/login" class="login btn solid secondary">
      Entrar
    </a>
  `;
}

function renderUserNav(user) {
  return `
    <div class="user-menu"> 
      <button type="button" class="dropdown-trigger" aria-expanded="false" aria-haspopup="true">
        <img class="user-avatar" alt="Foto do perfil" src="${user.picture || '/assets/avatar-placeholder.png'}">
        <span class="user-name">${user.nome}</span>
      </button>
      
      <ul class="dropdown-menu">
        <li><a href="/home" class="menu-link" data-page>Meus cursos</a></li>
        <li><a href="/perfil" class="menu-link" data-page>Meu perfil</a></li>
        <li>
          <button type="button" id="btn-logout" class="menu-link">
            Sair
          </button>
        </li>
      </ul>
    </div> 
  `;
}

function setupUserMenuEvents() {
  const logoutBtn = document.getElementById('btn-logout');

  if(logoutBtn) {
    logoutBtn.addEventListener('click', e =>{
      //função de logout para limpar os dados e voltar para login ou home pública
      localStorage.removeItem('usuario');
      initHeader();
      router.navigateTo('/');
    });
  }
}



export function initHeader(user = null) {
  const navContainer = document.getElementById('user-nav');
  if (!navContainer) return;

  navContainer.innerHTML = user ? renderUserNav(user) : renderGuestNav();

  //configura os eventos necessários
  setupUserMenuEvents();
}


