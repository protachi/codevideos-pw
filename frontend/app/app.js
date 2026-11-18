/**
 * Inicializa o roteador para que a aplicação possa funciona como um SPA
 * Alteração nesse arquivo deve ser feita com cuidado para não desconfigurar
 */

import { router } from "./core/router.js";
import { initHeader } from "./components/header/header.js";

document.addEventListener('DOMContentLoaded', () => {
  // Lida com a carga inicial da página (F5 ou digitação direta na URL)
  router.navigateTo(window.location.pathname, true);

  const user = getUsuario();

  initHeader(user);
});

function getUsuario() {

  console.log('bebe');

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if(usuario) {
    return usuario;
  }

  return null;  
}
