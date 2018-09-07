var canvas
var ctx
var player
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
  map = new Map(1)
  player = new Player(map.playerPos || { x: 190, y: 60 }, 3, 2.5 / SCALE)
  camera = new Camera(0, 0, CANVAS_W, CANVAS_H, map.width * TILE, map.height * TILE, SCALE)
  camera.setDeadZone(CANVAS_W / 2, CANVAS_H / 2)
  camera.follow(player)
  hud = new Hud(player.life, CANVAS_W, CANVAS_H)

  canvas = document.getElementById('gameCanvas')
  canvas.width = CANVAS_W
  canvas.height = CANVAS_H
  ctx = canvas.getContext('2d')
  ctx.scale(SCALE,SCALE)
  ctx.mozImageSmoothingEnabled = false
  ctx.imageSmoothingEnabled = false

  setInterval(update, 10)

  physicsController.addToPool(PLAYER, player)
  physicsController.setInteraction(PLAYER, WALL)

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

  drawMap(WALL_TILE)
  drawPlayer()
  drawHUD()

  if (gameState == STATE_INTRO) {
  }
  else if (gameState == STATE_TUTORIAL) {
  }
  else if (gameState == STATE_OUTRO) {
  }

  physicsController.draw()
}

function drawPlayer() {
  var position = {}
  position.x = player.position.x - HALF_TILE
  position.y = player.position.y - HALF_TILE
  position = camera.getWorldToScreenPos(position.x, position.y)

  ctx.drawImage(player.spriteAsset, player.sprite.x, player.sprite.y, TILE, TILE, position.x, position.y, TILE, TILE)
}

function drawMap(tileType) {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H)

  var wall = { x: 3*TILE, y: 0*TILE }
  var win = { x: 1*TILE, y: 1*TILE }

  var viewport = camera.getViewport()
  // draw only visible tiles
  var startCol = clamp(Math.floor(viewport.left / TILE) - 1, 0, map.width)
  var startRow = clamp(Math.floor(viewport.top / TILE) - 1, 0, map.height)
  var endCol = clamp(Math.ceil(viewport.right / TILE) + 1, 0, map.width)
  var endRow = clamp(Math.ceil(viewport.bottom / TILE) + 1, 0, map.height)

  for(var i = startRow; i < endRow; i++) {
    for(var j = startCol; j < endCol; j++) {
      if (map.data[i][j] != WALL_TILE) {
        ctx.drawImage(map.mapAsset, TILE, TILE, TILE, TILE, (j*TILE) - viewport.left, (i*TILE) - viewport.top, TILE, TILE)
      }
      else {
        ctx.drawImage(map.mapAsset, 0, TILE, TILE, TILE, (j*TILE) - viewport.left, (i*TILE) - viewport.top, TILE, TILE)
      }
    }
  }
}

function drawHUD() {
  var life = hud.getTileImage('life')
  var emptyLife = hud.getTileImage('emptyLife')
  var lifeBarPos = hud.getLifeBarPos()
  for (var i = 0; i < player.maxLife; i++) {
    if (i < player.life) {
      ctx.drawImage(hud.spriteAsset, life.x, life.y, life.width, life.height, lifeBarPos.x + (i * TILE / 2), lifeBarPos.y, life.width / 2, life.height / 2)
    }
    else {
      ctx.drawImage(hud.spriteAsset, emptyLife.x, emptyLife.y, emptyLife.width, emptyLife.height, lifeBarPos.x + (i * TILE / 2), lifeBarPos.y, emptyLife.width / 2, emptyLife.height / 2)
    }
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
