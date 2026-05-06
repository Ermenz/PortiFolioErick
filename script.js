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



document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    const section = document.querySelector(id);
    const offset = section.offsetTop - (window.innerHeight / 2) + (section.offsetHeight / 2);

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  });
});


// ===== THREE.JS =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 750);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('yellow'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: "orange" });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 3;

// 👇 ISSO QUE FALTAVA
renderer.render(scene, camera);

// ===== ESTRELAS =====
const canvasStars = document.getElementById("stars");
const ctx = canvasStars.getContext("2d");

canvasStars.width = window.innerWidth;
canvasStars.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 120; i++) {
  stars.push({
    x: Math.random() * canvasStars.width,
    y: Math.random() * canvasStars.height,
    size: Math.random() * 2,
    speed: Math.random() * 2 + 0.5
  });
}


// ===== ANIMAÇÃO ÚNICA =====
function animate() {
  requestAnimationFrame(animate);

  // 🎮 Cubo 3D
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);

  // ⭐ Estrelas (horizontal)
  ctx.clearRect(0, 0, canvasStars.width, canvasStars.height);

  stars.forEach(star => {
    star.x -= star.speed;

    if (star.x < 0) {
      star.x = canvasStars.width;
    }

    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();


    const gradient = ctx.createRadialGradient(
      star.x, star.y, 0,
      star.x, star.y, star.size * 3
    );

    gradient.addColorStop(0, "white");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
    ctx.fill();
  });
}

animate();