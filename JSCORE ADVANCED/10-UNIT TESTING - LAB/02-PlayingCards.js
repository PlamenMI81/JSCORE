function makeCard (face, suite) {
  let faces=Array.of(2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A')
  let suiteObj={
    S:'\u2660',
    H:'\u2665',
    D:'\u2666',
    C:'\u2663'
  }

  if (!faces.includes(face)) {
    throw new Error('Error')
  }
  if (!suiteObj.hasOwnProperty(suite)) {
    throw new Error('Error')
  }

  let Card={
    face,
    suite:suiteObj[suite],
    toString:()=>{
      return Card.face+''+Card.suite
    }
  }
  return Card
}

console.log('' + makeCard('A', 'S'));
console.log('' + makeCard('1', 'C'));