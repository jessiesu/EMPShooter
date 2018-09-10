var canvas
var ctx
var player
var enemy
var map
var camera
var hud
var sfxLoopId = null
var inputLocked = false
var gameState = STATE_PLAY

document.addEventListener("mousedown", mouseDown)
document.addEventListener("mouseup", mouseUp)
document.addEventListener("mousemove", mouseMove)

document.addEventListener("keypress", keyPress)
document.addEventListener("keydown", keyDown)
document.addEventListener("keyup", keyUp)

var physicsController = new PhysicsController()

function startGame() {
  // Canvas
  canvas = document.getElementById('gameCanvas')
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  ctx = canvas.getContext('2d')
  ctx.scale(SCALE,SCALE)
  ctx.mozImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false

  map = new Map(1)
  player = new Player({...map.playerPos} || { x: 190, y: 60 }, 3, 2.5 / SCALE)
  enemy = new Enemy({ x: 60, y: 300 })
  camera = new Camera(0, 0, CANVAS_W, CANVAS_H, map.width * TILE, map.height * TILE, SCALE)
  camera.setDeadZone(CANVAS_W / 2, CANVAS_H / 2)
  camera.follow(player)
  hud = new Hud(player.maxLife, CANVAS_W, CANVAS_H)

  setInterval(update, 10)

  physicsController.addToPool(PLAYER, player)
  physicsController.addToPool(ENEMY, enemy)
  physicsController.setInteraction(PLAYER, WALL)
  physicsController.setInteraction(PLAYER, ENEMY)

  setInterval(updatePhysics, 2)

  lockInput(true)
}

function update() {
  camera.update()
  draw()
}

function updatePhysics() {
  physicsController.update()
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

  this.map.draw()
  player.draw()
  enemy.draw()
  this.hud.draw()
  physicsController.draw()

  if (gameState == STATE_INTRO) {
  }
  else if (gameState == STATE_TUTORIAL) {
  }
  else if (gameState == STATE_OUTRO) {
  }
}

function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num
}

function keyPress(event) {
  if (event.key == ' ' && player.canJump) {
    player.jump()
  }
}

function keyDown(event) {
  switch (event.key) {
    case 'a':
      player.setXAcc(-300)
      break;
    case 'd':
      player.setXAcc(300)
      break;
  }
}

function keyUp(event) {
  switch (event.key) {
    case 'a':
      player.stop()
      console.log('stop')
      break;
    case 'd':
      player.stop()
      console.log('stop')
      break;
  }
}

function mouseDown(event) {
  if (!inputLocked) {
    player.moving = true
    player.destination = getMousePos(canvas, event)
  }

  if (gameState == STATE_INTRO) {
    gameState = STATE_TUTORIAL
  }
  else if (gameState == STATE_TUTORIAL) {
    gameState = STATE_PLAY
    lockInput(false)
  }
}

function mouseUp(event) {

}

function mouseMove(event) {
  if (gameState != STATE_PLAY)
    return
}

function getMousePos(canvas, event) {
  var rect = canvas.getBoundingClientRect()
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

function createSprite(src) {
  var sprite = new Image()
  sprite.src = src
  sprite.context = ctx
  sprite.width = TILE
  sprite.height = TILE

  return sprite
}

function createSFX(soundURL) {
  var audio = new Audio()
  audio.src = jsfxr(soundURL)
  return audio
}

function gameEnd(success) {
  lockInput(true)

  gameState = STATE_END
}

function restartGame() {
  player.life = player.maxLife

  lockInput(false)
  gameState = STATE_PLAY
}

function lockInput(lock) {
  inputLocked = lock
}
