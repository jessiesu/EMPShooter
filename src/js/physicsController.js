class PhysicsController {
  constructor() {
    this.physicsPool = {}
    this.interactions = {}
    this.interactionsPool = {}
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

    this.updateInterationPools()
  }

  updateInterationPools() {
    this.interactionsPool = {}
    for (var key in this.interactions) {
      this.interactions[key].forEach(interaction => {
        var pool = [...this.physicsPool[interaction]]
        if (pool) {
          if (this.interactionsPool[key]) {
            pool.forEach(obj => {
              this.interactionsPool[key].push(obj)
            })

          }
          else {
            this.interactionsPool = {
              ...this.interactionsPool,
              [key]: pool
            }
          }
        }
      })
    }
  }

  raycastIntersection(source, target, blockingType) {
    var hasIntersection = false
    for (var key in this.physicsPool) {
      if (key == source.type) {
        continue
      }
      this.physicsPool[key].forEach(obj => {
        if (obj.rectangle.intersectsLine(source.rectangle.center, target.rectangle.center)) {
          if (obj.type == target.type) {
            hasIntersection = true
          }
          else if (obj.type == blockingType) {
            hasIntersection = false
          }
        }
      })
    }
    return hasIntersection
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
    for (var key in this.interactionsPool) {
      this.physicsPool[key].forEach(physicsObject => {
        var vCollision = false
        var hCollision = false
        this.interactionsPool[key].forEach(interaction => {
          if(physicsObject.rectangle.intersectsWith(interaction.rectangle)) {
            var r1 = physicsObject.rectangle
            var r2 = interaction.rectangle

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

            physicsObject.setInteractedWith(interaction.type)
          }
        })
        if (!hCollision) {
          physicsObject.setXInteraction(0, 0)
        }
        if (!vCollision) {
          physicsObject.setYInteraction(0, 0)
        }
        if (!hCollision && !vCollision) {
          physicsObject.setInteractedWith(NONE)
        }
      })
    }

    for (var key in this.physicsPool) {
      this.physicsPool[key].forEach(obj => {
        obj.update(3)
      })
    }
  }
}
