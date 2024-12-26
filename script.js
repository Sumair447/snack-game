// Get canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const gridSize = 20;
const canvasSize = 400;
canvas.width = canvas.height = canvasSize;

// Snake and food initial position
let snake = [{x: 100, y: 100}];
let food = {x: 200, y: 200};
let direction = 'RIGHT';
let score = 0;

// Movement controls
let dx = gridSize;
let dy = 0;

// Draw the snake and food on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    // Draw the snake
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Update the score
    document.getElementById("score").textContent = score;
}

// Update snake position based on direction
function updateSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head); // Add new head to the snake

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        spawnFood();
    } else {
        snake.pop(); // Remove last segment of the snake if no food is eaten
    }
}

// Check if the snake hits the wall or itself
function checkCollision() {
    const head = snake[0];

    // Check wall collision
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        return true;
    }

    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

// Generate random food position
function spawnFood() {
    food = {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

// Handle keyboard input
function changeDirection(event) {
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        dx = 0;
        dy = -gridSize;
        direction = "UP";
    } else if (event.key === "ArrowDown" && direction !== "UP") {
        dx = 0;
        dy = gridSize;
        direction = "DOWN";
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        dx = -gridSize;
        dy = 0;
        direction = "LEFT";
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {
        dx = gridSize;
        dy = 0;
        direction = "RIGHT";
    }
}

// Game over and restart
function gameOver() {
    alert("Game Over! Your Score: " + score);
    score = 0;
    snake = [{x: 100, y: 100}];
    direction = 'RIGHT';
    dx = gridSize;
    dy = 0;
    spawnFood();
    draw();
}

// Main game loop
function gameLoop() {
    updateSnake();
    if (checkCollision()) {
        gameOver();
        return;
    }
    draw();
    setTimeout(gameLoop, 100);
}

// Start the game
document.getElementById("restartBtn").addEventListener("click", () => {
    score = 0;
    snake = [{x: 100, y: 100}];
    direction = 'RIGHT';
    dx = gridSize;
    dy = 0;
    spawnFood();
    gameLoop();
});

// Event listener for arrow keys
document.addEventListener("keydown", changeDirection);

// Initialize the game
spawnFood();
gameLoop();
