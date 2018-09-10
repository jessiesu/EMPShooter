class Player extends CollidableObject {
  constructor(position, life, speed) {
    var rect = new Rectangle(position.x - (PLAYER_HITBOX / 2), position.y - (PLAYER_HITBOX / 2), PLAYER_HITBOX, PLAYER_HITBOX)
    super(position, rect, PLAYER, true)

    this.startPos = position
    this.state = PLAYER_FALLING
    this.initialSpeed = 200
    this.maxLife = life
    this.life = life
    this.speed = speed
    this.jumpSpeed = -350
    this.moving = false
    this.destination = position

    this.sprite = new Sprite(ctx, 'assets/img/sprites.png')
    this.sprite.setTile(this.getSprite())

    this.isRecovering = false
    this.recoverTimer = 1000 // ms
    this.recovered = 0

    this.setDebugColor('blue')
  }

  takeDamage() {
    if (this.life > 0) {
      this.life--
    }
    this.isRecovering = true
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

    if (this.isRecovering) {
      this.recovered += dt
      if (this.recovered >= this.recoverTimer) {
        this.isRecovering = false
        this.recovered = 0
      }
    }

    this.updateSprite()
  }

  draw() {
    var position = {}
    position.x = player.position.x - HALF_TILE
    position.y = player.position.y - HALF_TILE
    position = camera.getWorldToScreenPos(position.x, position.y)

    this.sprite.setPosition(position)
    this.sprite.draw()
  }

  setInteractedWith(type) {
    super.setInteractedWith(type)
    if (this.interactedWith == ENEMY && !this.isRecovering) {
      this.takeDamage()
    }
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
    this.sprite.setTile(this.getSprite())
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
