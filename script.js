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
  

  function toggleDescription(id) {
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




function toggleMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("show");
}

function toggleDescription(id) {
  const pergunta = document.getElementById(`descricao-${id}`).parentElement;
  pergunta.classList.toggle("open");
}






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
