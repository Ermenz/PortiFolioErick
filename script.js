// ======================
// FUNÇÕES DE MENU E DESCRIÇÃO
// ======================

// Alterna o menu principal (aberto / fechado)
function toggleMainMenu() {
  const menu = document.getElementById('menu');
  if (menu.classList.contains('menu-aberto')) {
    menu.classList.remove('menu-aberto');
    menu.classList.add('menu-fechado');
  } else {
    menu.classList.remove('menu-fechado');
    menu.classList.add('menu-aberto');
  }
}

// Alterna menu de navegação (nav ul)
function toggleNavMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("show");
}
