const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

// constants
const size = 15 //square size

// snake game variables
var game_over = false
var score = 0
var snake_size = 0
var snake_speed_x = 1
var snake_speed_y = 0
var snake_position_x = Math.floor(canvas.width / 2 / size)
var snake_position_y = Math.floor(canvas.height / 2 / size)
var  snake_speed = 160
var snake = [ //snake starts off with 2 pieces
  {x:snake_position_x, y:snake_position_y},
  {x:snake_position_x-1, y:snake_position_y}
] 

var food_position_x = Math.floor(Math.random() * canvas.width / size)
var food_position_y = Math.floor(Math.random() * canvas.height / size)

// key press
document.addEventListener("keydown", keyPress)
function keyPress(event) {
  switch(event.key) {
    case "ArrowLeft":
      snake_speed_x = -1
      snake_speed_y = 0
      break;
    case "ArrowRight":
      snake_speed_x = 1
      snake_speed_y = 0
      break;
    case "ArrowUp":
      snake_speed_x = 0
      snake_speed_y = -1
      break;
    case "ArrowDown":
      snake_speed_x = 0
      snake_speed_y = 1
      break;
  }
}

// our game loop'
var gameloop = setInterval(game, snake_speed)

var blink = true
function endscreen() {
  context.fillStyle = "#65754b"
  context.fillRect(canvas.width/2-80, canvas.height/2-50, 200, 60)
  context.font = "40px Pixeboy"
  if (blink == true) {
    context.fillStyle = "black"
    context.fillText("Game Over!", canvas.width/2-80, canvas.height/2)
    blink = false
  } else {
  
    blink = true
  }
}

function game() {
  // fill entire background with green
  context.fillStyle = "#65754b"
  context.fillRect(0,0, canvas.width,   canvas.height)

  if (game_over) {
    clearInterval(gameloop)
    setInterval(endscreen, 1000)
  }
  
  // draw the fruit
  context.fillStyle = "black"
  context.fillRect(food_position_x * size, food_position_y * size, size-1, size-1)
  
  // draw the snake
  context.fillStyle = "black"
  for(let i = 0; i < snake.length; i++) {
    context.fillRect(snake[i].x * size, snake[i].y * size, size-1, size-1)
  }

  // draw the score
  context.font = "40px Pixeboy"
  context.fillText("Score: " + score, 10, 30)

  // add a new piece to the snake at the current position
  snake.push({
    x:snake_position_x,
    y:snake_position_y,
  })

  // if the snake is in the same place as the food then you eat the food
  if (snake_position_x == food_position_x && snake_position_y == food_position_y) {
    score = score + 10
    // move fruit to another location
    food_position_x = Math.floor(Math.random() * canvas.width / size)
    food_position_y = Math.floor(Math.random() * canvas.height / size)
    console.log("ate the fruit")
  } else {
    //
    snake.shift()
  }

  // move the snake
  snake_position_x += snake_speed_x
  snake_position_y += snake_speed_y

  // make snake loop around the screen
  if (snake_position_x > (canvas.width / size)) {
    snake_position_x = 0
  }
  if (snake_position_x < 0) {
    snake_position_x = Math.floor((canvas.width / size))
  }
  
  if (snake_position_y > (canvas.height / size)){
    snake_position_y = 0
  }
  if (snake_position_y < 0) {
    snake_position_y = Math.floor((canvas.height / size))
  }

  for (let i = 0; i < snake.length; i++) {
    if (snake_position_x == snake[i].x && snake_position_y == snake[i].y) {
      game_over = true
    }
  }
}

