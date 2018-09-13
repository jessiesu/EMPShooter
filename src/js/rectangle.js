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

    this.topLeft = { x: this.left, y: this.top }
    this.topRight = { x: this.right, y: this.top }
    this.bottomLeft = { x: this.left, y: this.bottom }
    this.bottomRight = { x: this.right, y: this.bottom }
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

  intersectsLine(p1, p2) {
    var top = this.isIntersecting(p1, p2, this.topLeft, this.topRight)
    var bottom = this.isIntersecting(p1, p2, this.bottomLeft, this.bottomRight)
    var left = this.isIntersecting(p1, p2, this.topLeft, this.bottomLeft)
    var right = this.isIntersecting(p1, p2, this.topRight, this.bottomRight)

    return top || bottom || left || right
  }

  //bool intersection(double start1[2], double end1[2],
  //                double start2[2], double end2[2])

  isIntersecting(p1, p2, q1, q2) {
    var ax = p2.x - p1.x     // direction of line a
    var ay = p2.y - p1.y     // ax and ay as above

    var bx = q1.x - q2.x     // direction of line b, reversed
    var by = q1.y - q2.y     // really -by and -by as above

    var dx = q1.x - p1.x   // right-hand side
    var dy = q1.y - p1.y

    var det = ax * by - ay * bx;

    if (det == 0) return false;

    var r = (dx * by - dy * bx) / det;
    var s = (ax * dy - ay * dx) / det;

    return !(r < 0 || r > 1 || s < 0 || s > 1)
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
