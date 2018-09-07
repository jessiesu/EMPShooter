var WALL_TILE = 2
var PLAYER_START = 5
var WIN_TILE = 4

class Map {
  constructor(level) {
    this.level = level
    this.mapAsset = createSprite("assets/img/sprites.png")

    this.data = level_1

    this.height = this.data.length
    this.width = this.data[0].length
    this.playerPos = null

    this.initialize()
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
             false
          )
          collidable.setDebugColor('red')
          physicsController.addToPool(WALL, collidable)
        }
      }
    }
  }
}
