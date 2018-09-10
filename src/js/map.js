var WALL_TILE = 2
var PLAYER_START = 5
var WIN_TILE = 4

class Map {
  constructor(level) {
    this.level = level
    this.mapSprite = new Sprite(ctx, "assets/img/sprites.png")

    this.data = level_1

    this.height = this.data.length
    this.width = this.data[0].length
    this.playerPos = null

    this.initialize()
  }

  draw() {
    var wall = { x: 0, y: TILE }
    var sky = { x: TILE, y: TILE }

    var viewport = camera.getViewport()
    // draw only visible tiles
    var startCol = clamp(Math.floor(viewport.left / TILE) - 1, 0, map.width)
    var startRow = clamp(Math.floor(viewport.top / TILE) - 1, 0, map.height)
    var endCol = clamp(Math.ceil(viewport.right / TILE) + 1, 0, map.width)
    var endRow = clamp(Math.ceil(viewport.bottom / TILE) + 1, 0, map.height)

    for(var i = startRow; i < endRow; i++) {
      for(var j = startCol; j < endCol; j++) {
        if (map.data[i][j] != WALL_TILE) {
          this.mapSprite.setTile(sky)
        }
        else {
          this.mapSprite.setTile(wall)
        }
        this.mapSprite.setPosition({x: (j*TILE) - viewport.left, y: (i*TILE) - viewport.top})
        this.mapSprite.draw()
      }
    }
  }

  getTileFromCoordinates(x, y) {
    if (x < 0 || y < 0 ||
      x > this.width * TILE || y > this.height * TILE) {
      return WALL_TILE
    }
    // returns the tile type on the given coordinate
    var colIndex = Math.floor(x / TILE)
    var rowIndex = Math.floor(y / TILE)
    return this.data[rowIndex][colIndex]
  }

  initialize() {
    for(var i = 0; i < this.height; i++) {
      for(var j = 0; j < this.width; j++) {
        if (this.data[i][j] == PLAYER_START && this.playerPos == null) {
          this.playerPos = { x: j*TILE, y: i*TILE }
        }
        if (this.data[i][j] == WALL_TILE) {
          var position = { x: j*TILE, y: i*TILE }
          var rect = new Rectangle(position.x, position.y, TILE, TILE)
          var collidable = new CollidableObject(
             position,
             rect,
             WALL,
             false
          )
          collidable.setDebugColor('red')
          physicsController.addToPool(WALL, collidable)
        }
      }
    }
  }
}
