class Sprite {
  constructor(ctx, src) {
    this.ctx = ctx

    this.spriteAsset = new Image()
    this.spriteAsset.src = src
    this.spriteAsset.ctx = ctx
    this.spriteAsset.width = TILE
    this.spriteAsset.height = TILE

    this.offset = ZERO_VECTOR
    this.position = OFFSCREEN

    this.scale = 1
  }

  setTile(offset) {
    this.offset = offset
  }

  setScale(scale) {
    this.scale = scale
  }

  setPosition(position) {
    this.position = position
  }

  draw() {
    this.ctx.drawImage(
      this.spriteAsset,
      this.offset.x,
      this.offset.y,
      TILE,
      TILE,
      this.position.x,
      this.position.y,
      TILE * this.scale,
      TILE * this.scale)
  }
}
