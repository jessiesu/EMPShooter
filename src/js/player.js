class Player extends CollidableObject {
  constructor(position, life, speed) {
    var rect = new Rectangle(position.x - (PLAYER_HITBOX / 2), position.y - (PLAYER_HITBOX / 2), PLAYER_HITBOX, PLAYER_HITBOX)
    super(position, rect, true)

    this.startPos = position
    this.state = PLAYER_FALLING
    this.initialSpeed = 200
    this.maxLife = life
    this.life = life
    this.speed = speed
    this.jumpSpeed = -350
    this.moving = false
    this.destination = position

    this.spriteAsset = createSprite("assets/img/sprites.png")
    this.sprite = this.getSprite()
  }

  takeDamage() {
    if (this.life > 0) {
      this.life--
    }
  }

  update(dt) {
    super.update(dt)

    if (this.velocity.y) {
      this.state = PLAYER_FALLING
    }
    if (this.state != PLAYER_FALLING) {
      this.canJump = true
    }

    if (this.state == PLAYER_FALLING && this.interactionDir.y == -1) {
      this.state = PLAYER_STATIC
    }

    this.updateSprite()
  }

  jump() {
    this.state = PLAYER_JUMPING
    this.canJump = false
    this.velocity.y += this.jumpSpeed
  }

  stop() {
    this.setXAcc(0)
    this.setXVel(this.velocity.x / 4)
  }

  updateSprite() {
    this.sprite = this.getSprite()
  }

  getSprite() {
    if (this.state == PLAYER_JUMPING) {

    }

    // right
    if (this.velocity.x > 0) {
      return { x: 0 * TILE, y: 0 * TILE}
    }
    // left
    else if (this.velocity.x < 0) {
      return { x: 1 * TILE, y: 0 * TILE}
    }

    // default
    return { x: 0 * TILE, y: 0 * TILE}

  }
}
