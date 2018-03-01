function solve (obj) {
  let objPower = {}

  if (obj.power <= 90) {    
    objPower.power = 90
    objPower.volume = 1800
  }else if (obj.power > 90 && obj.power <= 120) {
    objPower.power = 120
    objPower.volume = 2400
  }else if (obj.power > 120 && obj.power <= 200) {
    objPower.power = 200
    objPower.volume = 3500
  }

  let wheel=obj.wheelsize
  if (wheel % 2 === 0) {
    wheel--
  }
  let wheels=Array.of(wheel,wheel,wheel,wheel)

  let car = {
    model: obj.model,
    engine: {
      power: objPower.power,
      volume: objPower.volume
    },
    carriage: {
      type: obj.carriage,
      color: obj.color
    },
    wheels
  }

  return car
}

// console.log(solve({
//     model: 'VW Golf II',
//     power: 90,
//     color: 'blue',
//     carriage: 'hatchback',
//     wheelsize: 14
//   }
// ))

console.log(solve({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
  }
))