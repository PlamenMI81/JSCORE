function printDeckOfCards (arr) {
  let faces = Array.of('2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A')
  let suiteObj = {
    S: '\u2660',
    H: '\u2665',
    D: '\u2666',
    C: '\u2663'
  }
  let res = []
  for (let hand of arr) {
    let face = hand.slice(0, hand.length - 1)
    let suite = hand.slice(-1)

    try {
      if (!faces.includes(face) || !suiteObj.hasOwnProperty(suite)) {
        throw new Error('Invalid card: ' + hand)
      }
    } catch (ex) {
      console.log(ex.message)
      return
    }
    el = face + suiteObj[suite]
    res.push(el)
  }
  console.log(res.join(' '))
}

// printDeckOfCards(['AS', '10D', 'KH', '2C']);
printDeckOfCards(['5S', '3D', 'QD', '1C'])