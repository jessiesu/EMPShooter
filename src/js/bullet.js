class Bullet extends CollidableObject {
  constructor(position) {
    var rect = new Rectangle(position.x - (BULLET_SIZE / 2), position.y - (BULLET_SIZE / 2), BULLET_SIZE, BULLET_SIZE)
    super(position, rect, BULLET, true)
    this.disableGravity()
    this.setPosition(position)
    this.setDebugColor('yellow')
  }

  draw() {
    var position = camera.getWorldToScreenPos(this.position.x, this.position.y)

    ctx.beginPath();
    ctx.arc(position.x, position.y, BULLET_SIZE, 0, 2 * Math.PI)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.stroke()
  }

  setInteractedWith(type) {
    super.setInteractedWith(type)
    if (this.interactedWith == WALL) {
      this.deleted = true
    }
  }
}
