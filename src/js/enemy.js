class Enemy extends CollidableObject {
  constructor(position) {
    this.position = position
    this.sprite = new Sprite(ctx, "assets/img/sprites.png")
  }

  spawn(position) {
    this.position = position
  }
}
