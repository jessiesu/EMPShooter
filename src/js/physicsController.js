class PhysicsController {
  constructor() {
    this.physicsPool = {}
    this.interactions = {}
  }

  addToPool(type, physicsObject) {
    if (this.physicsPool[type]) {
      this.physicsPool[type].push(physicsObject)
    }
    else {
      this.physicsPool = {
        ...this.physicsPool,
        [type]: [physicsObject]
      }
    }
  }

  setInteraction(type, interactsWith) {
    if (this.interactions[type]) {
      this.interactions[type].push(interactsWith)
    }
    else {
      this.interactions = {
        ...this.interactions,
        [type]: [interactsWith]
      }
    }
  }

  draw() {
    if (DEBUG) {
      for (var key in this.physicsPool) {
        this.physicsPool[key].forEach(obj => {
          obj.drawDebug()
        })
      }
    }
  }

  update() {
    for (var key in this.physicsPool) {
      if (this.interactions[key]) {
        this.interactions[key].forEach(interaction => {
          if (this.physicsPool[interaction]) {
            this.physicsPool[key].forEach(physicsObject => {
              var vCollision = false
              var hCollision = false
              this.physicsPool[interaction].forEach(interactableObject => {
                if(physicsObject.rectangle.intersectsWith(interactableObject.rectangle)) {
                  var r1 = physicsObject.rectangle
                  var r2 = interactableObject.rectangle

                  var w = 0.5 * (r1.width + r2.width)
                  var h = 0.5 * (r1.height + r2.height)
                  var dx = r1.center.x - r2.center.x
                  var dy = r1.center.y - r2.center.y

                  var wy = w * dy;
                  var hx = h * dx;

                  if (wy > hx) {
                    if (wy > -hx) {
                      var diff = (r2.bottom - r1.top) + 0.01
                      physicsObject.setYInteraction(1, diff)
                      vCollision = true
                    }
                    else {
                      var diff = (r2.left - r1.right) + 0.01
                      physicsObject.setXInteraction(1, diff)
                      hCollision = true
                    }
                  }
                  else {

                    if (wy > -hx) {
                      var diff = (r2.right - r1.left) + 0.01
                      physicsObject.setXInteraction(-1, diff)
                      hCollision = true
                    }
                    else {
                      var diff = (r2.top - r1.bottom) + 0.01
                      physicsObject.setYInteraction(-1, diff)
                      vCollision = true
                    }
                  }
                }
              })
              if (!hCollision) {
                physicsObject.setXInteraction(0, 0)
              }
              if (!vCollision) {
                physicsObject.setYInteraction(0, 0)
              }
              physicsObject.update(2)
            })
          }
        })
      }
    }
  }
}
