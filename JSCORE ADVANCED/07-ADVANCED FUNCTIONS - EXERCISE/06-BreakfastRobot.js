let manager = (() => {
  let microelements = {protein: 0, carbohydrate: 0, fat: 0, flavour: 0}
  const RECIPE = {
    apple: {carbohydrate: 1, flavour: 2},
    coke: {carbohydrate: 10, flavour: 20},
    burger: {carbohydrate: 5, fat: 7, flavour: 3},
    omelet: {protein: 5, fat: 1, flavour: 1},
    cheverme: {protein: 10, carbohydrate: 10, fat: 10, flavour: 10}
  }

  function restock (command) {
    let element = command[1]
    let quantity = Number(command[2])
    microelements[element] += quantity
    return 'Success'
  }

  function prepare (command) {
    let currentRecipe = command[1].toLowerCase()
    let quantity = Number(command[2])
    let recipe = RECIPE[currentRecipe]
    for (let el in recipe) {
      if (!(recipe[el] * quantity <= microelements[el])) {
        return `Error: not enough ${el} in stock`
      }
    }
    for (let el in recipe) {
      microelements[el] -= recipe[el] * quantity
    }
    return 'Success'

  }

  function report () {
    return `protein=${microelements.protein} carbohydrate=${microelements.carbohydrate} fat=${microelements.fat} flavour=${microelements.flavour}`
  }

  return function (args) {
    let command = args.split(' ')
    switch (command[0]) {
      case 'restock':
        return restock(command)
      case 'prepare':
        return prepare(command)
      case 'report':
        return report()
    }
  }

})()

console.log(manager('prepare cheverme 1'))
console.log(manager('restock protein 10'))
console.log(manager('prepare cheverme 1'))
console.log(manager('restock carbohydrate 10'))
console.log(manager('prepare cheverme 1'))
console.log(manager('restock fat 10'))
console.log(manager('prepare cheverme 1'))
console.log(manager('restock flavour 10'))
console.log(manager('prepare cheverme 1'))
console.log(manager('report'))