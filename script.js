function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('menu-aberto')) {
      menu.classList.remove('menu-aberto');
      menu.classList.add('menu-fechado');
    } else {
      menu.classList.remove('menu-fechado');
      menu.classList.add('menu-aberto');
    }
  }
  