class CollidableObject {
  constructor(position, rectangle, type, moveable) {
    this.position = position
    this.rectangle = rectangle
    this.moveable = moveable
    this.type = type

    this.initialSpeed = 0
    this.mass = 1.5
    this.gravity = 980
    this.xAcc = 0
    this.yAcc = 0
    this.friction = 500
    this.velocity = { x: 0, y: 0 }
    this.maxVel = { x: 300, y: 500 }
    this.minVel = { x: -300, y: -500 }
    this.hasGravity = true

    this.interactionDir = { x: 0, y: 0 }
    this.collisionOffset = ZERO_VECTOR

    this.debugColor = 'green'

    this.interactedWith = 'NONE'
  }

  update(dt) {
    if (this.moveable) {
      dt = dt / 1000
      if (this.hasGravity) {
        this.applyGravity(dt)
      }
      this.applyFriction(dt)

      var newPos = this.position
      this.velocity.x += (this.xAcc * this.mass) * dt
      this.velocity.y += (this.yAcc * this.mass) * dt

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
        newPos.y += this.collisionOffset.y
      }
      else if (this.interactionDir.y == -1) {
        this.velocity.y = clamp(this.velocity.y, this.minVel.y, 0)
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
      var viewport = camera.getViewport()
      ctx.beginPath()
      ctx.lineWidth="1"
      ctx.rect(
        this.rectangle.left - viewport.left,
        this.rectangle.top - viewport.top,
        this.rectangle.width,
        this.rectangle.height
      )
      ctx.strokeStyle=this.debugColor;

      ctx.stroke();
    }
  }

  enableGravity() {
    this.hasGravity = true
  }

  disableGravity() {
    this.hasGravity = false
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

  applyFriction(dt) {
    if (this.xAcc == 0) {
      if (this.velocity.x > 0) {
        this.velocity.x -= (this.friction * this.mass) * dt
        if (this.velocity < 0) {
          this.velocity.x = 0
        }
      }
      else if (this.velocity.x < 0) {
        this.velocity.x += (this.friction * this.mass) * dt
        if (this.velocity.x > 0) {
          this.velocity.x = 0
        }
      }
    }
  }

  setAcc(x, y) {
    this.xAcc = x
    this.yAcc = y
  }

  setXAcc(xAcc) {
    this.xAcc = xAcc
    if (this.velocity.x == 0) {
      this.velocity.x = this.initialSpeed * Math.sign(xAcc)
    }
  }

  setInteraction(direction) {
    this.interactionDir = direction
  }

  setXInteraction(dir, diff) {
    this.interactionDir.x = dir
    this.collisionOffset.x = diff
  }

  setYInteraction(dir, diff) {
    this.interactionDir.y = dir
    this.collisionOffset.y = diff
  }

  setInteractedWith(type) {
    this.interactedWith = type
  }
}
