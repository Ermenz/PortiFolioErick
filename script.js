// ======================
// FUNÇÕES DE MENU E DESCRIÇÃO
// ======================

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

function toggleNavMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("show");
}

function toggleDescriptionBlock(id) {
  const descricao = document.getElementById(`descricao-${id}`);
  const button = descricao.previousElementSibling.querySelector('.toggle-btn');

  if (descricao.style.display === 'none' || descricao.style.display === '') {
    descricao.style.display = 'block';
    button.textContent = '-';
  } else {
    descricao.style.display = 'none';
    button.textContent = '+';
  }
}

function toggleDescriptionParent(id) {
  const pergunta = document.getElementById(`descricao-${id}`).parentElement;
  pergunta.classList.toggle("open");
}

// ======================
// JOGO DA COBRINHA
// ======================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20; // Tamanho dos quadrados
let snake = [{ x: 9 * box, y: 10 * box }];
let direction = "RIGHT"; // Direção inicial
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box
};

function draw() {
  // Fundo
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cobra
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#0a0";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Comida
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, box, box);

  // Nova posição da cabeça
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "RIGHT") snakeX += box;
  else if (direction === "LEFT") snakeX -= box;
  else if (direction === "UP") snakeY -= box;
  else if (direction === "DOWN") snakeY += box;

  // Se comer a comida
  if (snakeX === food.x && snakeY === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box
    };
  } else {
    snake.pop();
  }

  const newHead = { x: snakeX, y: snakeY };

  // Verifica colisão com borda ou corpo
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over 😢");
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

const game = setInterval(draw, 150);

// ======================
// THREE.JS – ESTRELA 3D
// ======================

// IMPORTS (funciona apenas se script.js for type="module")
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('star-container');

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Luzes
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(3, 3, 3);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);

// Controles de rotação
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Carregar modelo GLB
const loader = new GLTFLoader();
loader.load(
  './star.glb', // Caminho do seu arquivo
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    scene.add(model);
  },
  function (xhr) {
    console.log(`Carregando estrela: ${(xhr.loaded / xhr.total * 100).toFixed(0)}%`);
  },
  function (error) {
    console.error('Erro ao carregar estrela:', error);
  }
);

// Responsividade
window.addEventListener('resize', () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});

// Loop de animação
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
