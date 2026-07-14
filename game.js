(function () {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  var canvas = document.getElementById("snake-canvas");
  var scoreValue = document.getElementById("score-value");
  var bestScoreValue = document.getElementById("best-score-value");
  var gameState = document.getElementById("game-state");
  var actionButtons = document.querySelectorAll("[data-action]");
  var dirButtons = document.querySelectorAll("[data-dir]");
  var ctx;
  var game;
  var STORAGE_KEY = "idknowkim.snake.bestScore";
  var BOARD_SIZE = 20;
  var STEP_MS = 140;
  var swipeStart = null;

  if (!canvas || !scoreValue || !bestScoreValue || !gameState) {
    return;
  }

  if (window.__snakeGameInstance) {
    return;
  }

  ctx = canvas.getContext("2d", { alpha: false });
  game = {
    running: false,
    paused: false,
    gameOver: false,
    score: 0,
    bestScore: Number(localStorage.getItem(STORAGE_KEY) || 0),
    direction: { x: 1, y: 0 },
    nextDirection: { x: 1, y: 0 },
    snake: [],
    food: { x: 0, y: 0 },
    accumulator: 0,
    lastTimestamp: 0
  };

  window.__snakeGameInstance = game;
  bestScoreValue.textContent = String(game.bestScore);

  function setStateLabel(label) {
    gameState.textContent = label;
  }

  function syncStats() {
    scoreValue.textContent = String(game.score);
    bestScoreValue.textContent = String(game.bestScore);
  }

  function updateBestScore() {
    if (game.score > game.bestScore) {
      game.bestScore = game.score;
      localStorage.setItem(STORAGE_KEY, String(game.bestScore));
      syncStats();
    }
  }

  function resetSnake() {
    var startX = Math.floor(BOARD_SIZE / 2);
    var startY = Math.floor(BOARD_SIZE / 2);
    game.snake = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY }
    ];
    game.direction = { x: 1, y: 0 };
    game.nextDirection = { x: 1, y: 0 };
  }

  function spawnFood() {
    var food;
    var safe = false;

    while (!safe) {
      safe = true;
      food = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE)
      };

      game.snake.forEach(function (segment) {
        if (segment.x === food.x && segment.y === food.y) {
          safe = false;
        }
      });
    }

    game.food = food;
  }

  function resizeCanvas() {
    var displaySize = Math.min(canvas.getBoundingClientRect().width, 560);
    var scale = window.devicePixelRatio || 1;
    canvas.width = Math.floor(displaySize * scale);
    canvas.height = Math.floor(displaySize * scale);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
  }

  function setDirection(x, y) {
    var isReverse = game.direction.x + x === 0 && game.direction.y + y === 0;
    if (isReverse) {
      return;
    }

    game.nextDirection = { x: x, y: y };
    if (!game.running && !game.gameOver) {
      startGame();
    }
  }

  function startGame() {
    if (game.running && !game.paused) {
      return;
    }

    if (game.gameOver || game.snake.length === 0) {
      restartGame();
      return;
    }

    game.running = true;
    game.paused = false;
    setStateLabel("Running");
  }

  function pauseGame() {
    if (!game.running || game.gameOver) {
      return;
    }

    game.paused = !game.paused;
    setStateLabel(game.paused ? "Paused" : "Running");
  }

  function restartGame() {
    game.running = true;
    game.paused = false;
    game.gameOver = false;
    game.score = 0;
    game.accumulator = 0;
    game.lastTimestamp = 0;
    resetSnake();
    spawnFood();
    syncStats();
    setStateLabel("Running");
    resizeCanvas();
  }

  function gameOver() {
    game.running = false;
    game.paused = false;
    game.gameOver = true;
    updateBestScore();
    setStateLabel("Game Over");
  }

  function step() {
    var head = game.snake[0];
    var nextHead;
    var ateFood;
    var i;

    game.direction = game.nextDirection;
    nextHead = {
      x: head.x + game.direction.x,
      y: head.y + game.direction.y
    };

    if (
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.x >= BOARD_SIZE ||
      nextHead.y >= BOARD_SIZE
    ) {
      gameOver();
      return;
    }

    for (i = 0; i < game.snake.length; i += 1) {
      if (game.snake[i].x === nextHead.x && game.snake[i].y === nextHead.y) {
        gameOver();
        return;
      }
    }

    game.snake.unshift(nextHead);

    ateFood = nextHead.x === game.food.x && nextHead.y === game.food.y;
    if (ateFood) {
      game.score += 1;
      syncStats();
      spawnFood();
      updateBestScore();
    } else {
      game.snake.pop();
    }
  }

  function drawCell(x, y, color) {
    var size = canvas.getBoundingClientRect().width / BOARD_SIZE;
    var padding = Math.max(1, size * 0.12);
    ctx.fillStyle = color;
    ctx.fillRect(x * size + padding, y * size + padding, size - padding * 2, size - padding * 2);
  }

  function overlayMessage(message) {
    var size = canvas.getBoundingClientRect().width;
    ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#fff";
    ctx.font = "700 22px Segoe UI, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(message, size / 2, size / 2);
  }

  function draw() {
    var size = canvas.getBoundingClientRect().width;
    var i;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "#0f2f2d";
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (i = 0; i < BOARD_SIZE; i += 1) {
      ctx.fillRect((size / BOARD_SIZE) * i, 0, 1, size);
      ctx.fillRect(0, (size / BOARD_SIZE) * i, size, 1);
    }

    drawCell(game.food.x, game.food.y, "#ef6c57");

    for (i = 0; i < game.snake.length; i += 1) {
      drawCell(game.snake[i].x, game.snake[i].y, i === 0 ? "#8ce99a" : "#66d9c2");
    }

    if (!game.running && !game.gameOver) {
      overlayMessage("Press Start");
    } else if (game.paused) {
      overlayMessage("Paused");
    } else if (game.gameOver) {
      overlayMessage("Game Over");
    }
  }

  function loop(timestamp) {
    var delta;

    if (!game.lastTimestamp) {
      game.lastTimestamp = timestamp;
    }

    delta = timestamp - game.lastTimestamp;
    game.lastTimestamp = timestamp;

    if (game.running && !game.paused && !game.gameOver) {
      game.accumulator += delta;
      while (game.accumulator >= STEP_MS) {
        step();
        game.accumulator -= STEP_MS;
        if (game.gameOver) {
          break;
        }
      }
    }

    draw();
    window.requestAnimationFrame(loop);
  }

  function preventScrollForControlKeys(event) {
    var keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Spacebar"];
    if (keys.indexOf(event.key) !== -1) {
      event.preventDefault();
    }
  }

  function handleKeydown(event) {
    var key = String(event.key || "").toLowerCase();

    if (key === "arrowup" || key === "w") {
      preventScrollForControlKeys(event);
      setDirection(0, -1);
      return;
    }

    if (key === "arrowdown" || key === "s") {
      preventScrollForControlKeys(event);
      setDirection(0, 1);
      return;
    }

    if (key === "arrowleft" || key === "a") {
      preventScrollForControlKeys(event);
      setDirection(-1, 0);
      return;
    }

    if (key === "arrowright" || key === "d") {
      preventScrollForControlKeys(event);
      setDirection(1, 0);
      return;
    }

    if (key === " ") {
      preventScrollForControlKeys(event);
      pauseGame();
      return;
    }

    if (key === "enter") {
      startGame();
    }
  }

  var i;
  if (canvas.addEventListener) {
    canvas.addEventListener("touchstart", function (event) {
      var touch = event.touches[0];
      swipeStart = { x: touch.clientX, y: touch.clientY };
      event.preventDefault();
    }, { passive: false });

    canvas.addEventListener("touchend", function (event) {
      var touch;
      var dx;
      var dy;

      if (!swipeStart) {
        return;
      }

      touch = event.changedTouches[0];
      dx = touch.clientX - swipeStart.x;
      dy = touch.clientY - swipeStart.y;
      swipeStart = null;

      if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
        return;
      }

      if (Math.abs(dx) > Math.abs(dy)) {
        setDirection(dx > 0 ? 1 : -1, 0);
      } else {
        setDirection(0, dy > 0 ? 1 : -1);
      }
    }, { passive: true });

    canvas.addEventListener("touchmove", function (event) {
      event.preventDefault();
    }, { passive: false });
  }

  for (i = 0; i < dirButtons.length; i += 1) {
    (function (button) {
      button.addEventListener("click", function () {
        var dir = button.getAttribute("data-dir");
        if (dir === "up") setDirection(0, -1);
        if (dir === "down") setDirection(0, 1);
        if (dir === "left") setDirection(-1, 0);
        if (dir === "right") setDirection(1, 0);
      });
    }(dirButtons[i]));
  }

  for (i = 0; i < actionButtons.length; i += 1) {
    (function (button) {
      button.addEventListener("click", function () {
        var action = button.getAttribute("data-action");
        if (action === "start") startGame();
        if (action === "pause") pauseGame();
        if (action === "restart") restartGame();
      });
    }(actionButtons[i]));
  }

  window.addEventListener("keydown", handleKeydown, { passive: false });
  window.addEventListener("resize", resizeCanvas);

  resetSnake();
  spawnFood();
  resizeCanvas();
  syncStats();
  setStateLabel("Ready");
  window.requestAnimationFrame(loop);
}());
