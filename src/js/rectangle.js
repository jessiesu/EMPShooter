class Rectangle {
  constructor(left = 0, top = 0, width = 0, height = 0) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height

    this.right = this.left + this.width
    this.bottom = this.top + this.height

    this.center = {
      x: this.right - (this.width / 2 ),
      y: this.bottom - (this.height / 2 ),
    }
  }

  set(left, top, width, height) {
    this.left = left
    this.top = top
    this.width = width || this.width
    this.height = height || this.height

    this.right = this.left + this.width
    this.bottom = this.top + this.height

    this.center = {
      x: this.right - (this.width / 2 ),
      y: this.bottom - (this.height / 2 ),
    }
  }

  intersectsWith(other) {
    return (other.left < this.right &&
            this.left < other.right &&
            other.top < this.bottom &&
            this.top < other.bottom)
  }

  within(other) {
    // returns true of this rect is within the other rect
    return (other.left <= this.left &&
            other.right >= this.right &&
            other.top <= this.top &&
            other.bottom >= this.bottom)
  }

  containsPoint(p) {
    return this.left <= p.x && this.right >= p.x &&
      this.bottom >= p.y && this.top <= p.y
  }

  setPosition(position) {
    this.set(
      position.x - this.width / 2,
      position.y - this.height / 2,
      this.width,
      this.height,
    )
  }
}
