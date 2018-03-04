class Circle {
  constructor (r) {
    this.radius = r
  }

  get diameter () {
    return this.radius*2
  }

  set diameter (newD) {
    this.radius = newD/2
  }

  get area(){
    return Math.PI*this.radius*this.radius
  }
}

let c = new Circle(10)

console.log(c.area)


