class Enemy extends CollidableObject {
  constructor(position) {
    var rect = new Rectangle(position.x - (TILE / 2), position.y - (TILE / 2), TILE, TILE)
    super(position, rect, ENEMY, false)

    this.position = position
    this.screenPos = position
    this.sprite = new Sprite(ctx, "assets/img/sprites.png")
    this.sprite.setTile({x: 2*TILE, y: 0})
    this.sprite.setPosition(position)
    this.setPosition(position)

    this.setDebugColor('yellow')

    this.target = null

    this.shootTimer = 0
    this.shootCooldown = 1000
    this.bulletPool = []
  }

  draw() {
    var position = {}
    position.x = this.position.x - HALF_TILE
    position.y = this.position.y - HALF_TILE
    position = camera.getWorldToScreenPos(position.x, position.y)

    this.sprite.setPosition(position)

    this.sprite.draw()
  }

  update(dt) {
    super.update(dt)

    if (this.target) {
      this.shootTimer += dt
      if (this.shootTimer >= this.shootCooldown) {
        this.shootTimer = 0
        this.shootTarget()
      }
    }

    var i = this.bulletPool.length
    while (i--) {
      if (this.bulletPool[i].interactedWith == WALL) {
        this.bulletPool.splice(i, 1)
      }
    }
  }

  setTarget(target) {
    this.target = target
  }

  shootTarget() {
    if (this.target) {
      var pos = camera.getWorldToScreenPos(this.position.x, this.position.y)
      var targetPos = camera.getWorldToScreenPos(this.target.position.x, this.target.position.y)

      var bullet = new Bullet(pos)

      var dir = subtract(targetPos, pos)
      var norm = normalize(dir)

      bullet.setAcc(norm.x * 200, norm.y * 200)
      this.bulletPool.push(bullet)
    }
  }



  // spawn(position) {
  //   this.position = position
  // }

}
