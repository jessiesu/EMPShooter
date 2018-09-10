class Enemy extends CollidableObject {
  constructor(position) {
    var rect = new Rectangle(position.x - (TILE / 2), position.y - (TILE / 2), TILE, TILE)
    super(position, rect, ENEMY, false)

    this.position = position
    this.sprite = new Sprite(ctx, "assets/img/sprites.png")
    this.sprite.setTile({x: 2*TILE, y: 0})
    this.sprite.setPosition(position)
    this.setPosition(position)

    this.setDebugColor('yellow')

  //  this.target = target
  }

  draw() {
    var position = {}
    position.x = this.position.x - HALF_TILE
    position.y = this.position.y - HALF_TILE
    position = camera.getWorldToScreenPos(position.x, position.y)

    this.sprite.setPosition(position)

    this.sprite.draw()
  }

  // spawn(position) {
  //   this.position = position
  // }

}
