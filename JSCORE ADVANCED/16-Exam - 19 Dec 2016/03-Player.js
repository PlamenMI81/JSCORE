class Player {
  constructor (nickName) {
    this.nickName = nickName
    this.scores = []
  }

  addScore (val) {
    if (typeof val === 'number') {
      this.scores.push(val)
    }
    return this
  }

  get scoreCount () {
    return this.scores.length
  }

  get highestScore () {
    if (this.scores.length > 0) {
      return Math.max(...this.scores)
    }
    return 'undefined'
  }

  get topFiveScore () {
    return this.scores.sort((a, b) => b - a).slice(0, 5)
  }

  toString () {
    let scr = this.scores.sort((a, b) => b - a)
    return `${this.nickName}: [${scr}]`
  }
}

let p = new Player('Trotro');

// expect(p.toString()).to.equal('Trotro: []','Function toString() does not return proper string!');
// expect(p.highestScore).to.equal(undefined, 'Invalid high score!');
// expect(p.topFiveScore.length).to.equal(0, 'Invalid top five score!');
// expect(p.scoreCount).to.equal(0, 'Invalid score count!');

p.addScore(undefined);
console.log(p.toString())
console.log(p.highestScore)
// expect(p.toString()).to.equal('Trotro: []','Function toString() does not return proper string!');
// expect(p.highestScore).to.equal(undefined, 'Invalid high score!');
// expect(p.topFiveScore.length).to.equal(0, 'Invalid top five score!');
// expect(p.scoreCount).to.equal(0, 'Invalid score count!');

p.addScore(null);
console.log(p.toString())
console.log(p.highestScore)
// expect(p.toString()).to.equal('Trotro: []','Function toString() does not return proper string!');
// expect(p.topFiveScore.length).to.equal(0, 'Invalid top five score!');
// expect(p.highestScore).to.equal(undefined, 'Invalid high score!');
// expect(p.scoreCount).to.equal(0, 'Invalid score count!');
