// script.js

// Obtém o canvas e o contexto 2D
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Propriedades do stickman
const stickman = {
  x: 50,
  y: 500,
  width: 20,
  height: 50,
  velocityX: 0,
  velocityY: 0,
  speed: 3,
  jumping: false
};

// Propriedades da gravidade
const gravity = 0.5;
const groundLevel = 550; // Posição Y que representa o chão

// Função do game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Atualiza a lógica do jogo
function update() {
  // Atualiza posição horizontal
  stickman.x += stickman.velocityX;

  // Aplica gravidade se o stickman não estiver no chão
  if (stickman.y < groundLevel) {
    stickman.velocityY += gravity;
  } else {
    stickman.velocityY = 0;
    stickman.y = groundLevel;
    stickman.jumping = false;
  }
  stickman.y += stickman.velocityY;

  // Limita o stickman dentro dos limites do canvas
  if (stickman.x < 0) stickman.x = 0;
  if (stickman.x + stickman.width > canvas.width) {
    stickman.x = canvas.width - stickman.width;
  }
}

// Renderiza o stickman e outros elementos
function draw() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha o stickman (representado por um retângulo)
  ctx.fillStyle = 'black';
  ctx.fillRect(stickman.x, stickman.y - stickman.height, stickman.width, stickman.height);
}

// Eventos de teclado para movimentação
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    stickman.velocityX = stickman.speed;
  } else if (e.key === 'ArrowLeft') {
    stickman.velocityX = -stickman.speed;
  } else if (e.key === 'ArrowUp' && !stickman.jumping) {
    stickman.velocityY = -10; // Valor do pulo
    stickman.jumping = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
    stickman.velocityX = 0;
  }
});

// Eventos de toque para os controles móveis
const btnLeft = document.getElementById('btn-left');
const btnRight = document.getElementById('btn-right');
const btnJump = document.getElementById('btn-jump');

// Mover para a esquerda
btnLeft.addEventListener('touchstart', (e) => {
  e.preventDefault();
  stickman.velocityX = -stickman.speed;
});
btnLeft.addEventListener('touchend', (e) => {
  e.preventDefault();
  stickman.velocityX = 0;
});

// Mover para a direita
btnRight.addEventListener('touchstart', (e) => {
  e.preventDefault();
  stickman.velocityX = stickman.speed;
});
btnRight.addEventListener('touchend', (e) => {
  e.preventDefault();
  stickman.velocityX = 0;
});

// Pular
btnJump.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!stickman.jumping) {
    stickman.velocityY = -10;
    stickman.jumping = true;
  }
});

// Inicia o game loop
gameLoop();
