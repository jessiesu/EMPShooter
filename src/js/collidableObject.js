class CollidableObject {

  constructor(position, rectangle, moveable) {
    this.position = position
    this.rectangle = rectangle
    this.moveable = moveable

    this.mass = 1.5
    this.gravity = 980
    this.acc = { x: 0, y: 0 }
    this.velocity = { x: 0, y: 0 }
    this.maxVel = { x: 300, y: 500 }
    this.minVel = { x: -300, y: -500 }

    this.interactionDir = { x: 0, y: 0 }

    this.hasInteraction = false
    this.collisionOffset = ZERO_VECTOR

    this.debugColor = 'green'
  }

  update(dt) {
    if (this.moveable) {
      dt = dt / 1000
      this.applyGravity(dt)

      var newPos = this.position

      if (this.interactionDir.x == -1) {
        this.velocity.x = clamp(this.velocity.x, 0, this.maxVel.x)
        newPos.x += this.collisionOffset.x
      }
      else if (this.interactionDir.x == 1) {
        this.velocity.x = clamp(this.velocity.x, this.minVel.x, 0)
        newPos.x += this.collisionOffset.x
      }
      else {
        this.velocity.x = clamp(this.velocity.x, this.minVel.x, this.maxVel.x)
      }
      var dx = dt * this.velocity.x
      newPos.x += dx

      if (this.interactionDir.y == 1) {
        this.velocity.y = clamp(this.velocity.y, 0, this.maxVel.y)
        //this.interactionDir.y = 0
        newPos.y += this.collisionOffset.y
      }
      else if (this.interactionDir.y == -1) {
        this.velocity.y = clamp(this.velocity.y, this.minVel.y, 0)
        //this.interactionDir.y = 0
        newPos.y += this.collisionOffset.y
      }
      else {
        this.velocity.y = clamp(this.velocity.y, this.minVel.y, this.maxVel.y)
      }

      var dy = dt * this.velocity.y
      newPos.y += dy

      this.setPosition(newPos)
    }
  }

  setDebugColor(color) {
    this.debugColor = color
  }

  drawDebug() {
    if (ctx) {
      ctx.beginPath()
      ctx.lineWidth="1"
      ctx.rect(
        this.rectangle.left,
        this.rectangle.top,
        this.rectangle.width,
        this.rectangle.height
      )
      ctx.strokeStyle=this.debugColor;

      ctx.stroke();
    }
  }

  setPosition(position) {
    this.position = position
    this.rectangle.setPosition(position)
  }

  setXVel(vel) {
    this.velocity.x = vel
  }

  applyGravity(dt) {
    if (this.interactionDir.y != -1) {
      this.velocity.y += (this.gravity * this.mass) * dt
    }
  }

  setInteraction(direction) {
    this.interactionDir = direction
    // if (!isZero(this.interactionDir) && !this.hasInteraction) {
    //   this.collisionPosition = this.position
    //   this.hasInteraction = true
    // }
  }

  setXInteraction(dir, diff) {
    this.interactionDir.x = dir
    this.collisionOffset.x = diff
  }

  setYInteraction(dir, diff) {
    this.interactionDir.y = dir
    this.collisionOffset.y = diff
  }

  updateSprite(destination) {
    // var angleDeg = Math.atan2(destination.y - this.position.y, destination.x -this.position.x) * 180 / Math.PI
    // this.sprite = this.getSpriteTile(angleDeg)
  }

  getSpriteTile(degree) {
    // right
    if ((degree > -67.5 && degree <= 0) || (degree <= 67.5 && degree >= 0)) {
      return { x: 3 * TILE, y: 0 * TILE}
    }
    // bottom
    else if (degree > 67.5 && degree <= 157.5) {
      return { x: 1 * TILE, y:0 * TILE}
    }
    // left
    else if ((degree > 157.5 && degree <= 180) || (degree <= -112.5 && degree >= -180)) {
      return { x: 2 * TILE, y: 0 * TILE}
    }
    // top
    else if (degree > -112.5 && degree <= -22.5) {
      return { x: 0 * TILE, y: 0 * TILE}
    }

    // default
    return { x: 0 * TILE, y: 0 * TILE}
  }
}
