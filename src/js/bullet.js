class Bullet extends CollidableObject {
  constructor(position) {
    var rect = new Rectangle(position.x - (BULLET_SIZE / 2), position.y - (BULLET_SIZE / 2), BULLET_SIZE, BULLET_SIZE)
    super(position, rect, BULLET, true)
    this.disableGravity()
    this.setPosition(position)
    this.setDebugColor('yellow')
  }

  draw() {
    super.draw()

    var position = {}
    position.x = this.position.x - HALF_TILE
    position.y = this.position.y - HALF_TILE
    position = camera.getWorldToScreenPos(position.x, position.y)

    ctx.beginPath();
    ctx.arc(100, 75, BULLET_SIZE, 0, 2 * Math.PI)
    ctx.fillStyle = 'white'
    ctx.fill()
    ctx.stroke()
  }
}
