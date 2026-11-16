/**
 * Inicializa o roteador para que a aplicação possa funciona como um SPA
 * Alteração nesse arquivo deve ser feita com cuidado para não desconfigurar
 */

import { router } from "./core/router.js";
import { initHeader } from "./components/header/header.js";

document.addEventListener('DOMContentLoaded', () => {
  // Lida com a carga inicial da página (F5 ou digitação direta na URL)
  router.navigateTo(window.location.pathname, true);

  initHeader({name: 'Dragneel Natsu', picture: 'https://freepngimg.com/thumb/fairy_tail/25267-8-fairy-tail-clipart.png'});
});

