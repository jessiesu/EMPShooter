class Hud {
  constructor(maxLives, canvasWidth, canvasHeight) {
    this.maxLives = maxLives
    this.lives = maxLives
    this.scale = 0.5

    this.sprite = new Sprite(ctx, "assets/img/hud.png")
    this.sprite.scale = this.scale

    this.lifeBarRect = new Rectangle(2, 2, TILE * this.maxLives * this.scale, TILE * this.scale)
  }

  draw() {
    var life = this.getTileImage('life')
    var emptyLife = this.getTileImage('emptyLife')
    var lifeBarPos = this.getLifeBarPos()
    for (var i = 0; i < this.maxLives; i++) {
      if (i < this.lives) {
        this.sprite.setTile(life)
      }
      else {
        this.sprite.setTile(emptyLife)
      }
      this.sprite.setPosition({x: lifeBarPos.x + (i * TILE * this.scale), y: lifeBarPos.y})
      this.sprite.draw()
    }
  }

  setLives(lives) {
    this.lives = lives
  }

  getLifeBarPos() {
    return { x: this.lifeBarRect.left, y: this.lifeBarRect.top }
  }

  getTileImage(tileName) {
    switch (tileName) {
      case 'life':
        return { x: 0*TILE, y: 0*TILE, width: TILE, height: TILE }
      case 'emptyLife':
        return { x: 1*TILE, y: 0*TILE, width: TILE, height: TILE }
      default:
        return { x: 0*TILE, y: 0*TILE, width: TILE, height: TILE }
    }
  }
}
