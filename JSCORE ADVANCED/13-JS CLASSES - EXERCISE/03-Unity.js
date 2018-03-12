class Rat {
  constructor (name) {
    this.name = name
    this.unitedRats = []
  }

  toString () {
    let name = this.name
    let rats = this.unitedRats.map(function (e) {
      return '##' + e.name
    })
    return this.unitedRats.length !== 0
      ? name + '\n' + rats.join('\n')
      : name
  }

  unite (otherRat) {
    if (otherRat instanceof Rat) {
      this.unitedRats.push(otherRat)
    }
  }

  getRats () {
    return this.unitedRats

  }
}

let test = new Rat('Pesho')
console.log(test.toString()) //Pesho

console.log(test.getRats()) //[]

test.unite(new Rat('Gosho'))
test.unite(new Rat('Sasho'))
console.log(test.getRats())
//[ Rat { name: 'Gosho', unitedRats: [] },
//  Rat { name: 'Sasho', unitedRats: [] } ]

console.log(test.toString())
