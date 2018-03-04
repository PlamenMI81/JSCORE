let expect = require('chai').expect

let mathEnforcer = {
  addFive: function (num) {
    if (typeof(num) !== 'number') {
      return undefined;
    }
    return num + 5;
  },
  subtractTen: function (num) {
    if (typeof(num) !== 'number') {
      return undefined;
    }
    return num - 10;
  },
  sum: function (num1, num2) {
    if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
      return undefined;
    }
    return num1 + num2;
  }
};
// console.log(mathEnforcer.addFive())
// console.log(mathEnforcer.subtractTen(10))
// console.log(mathEnforcer.sum(15, 10))

describe('mathEnforcer', function () {
  describe('addFive',function () {
    it('should', function () {
      expect(mathEnforcer.addFive('')).to.be.undefined
      expect(mathEnforcer.addFive(0)).to.be.closeTo(5,0.01)
      expect(mathEnforcer.addFive(-6)).to.be.closeTo(-1,0.01)
      expect(mathEnforcer.addFive(1.5)).to.be.closeTo(6.5,0.01)
    })
  })
  describe('subtractTen',function () {
    it('should', function () {
      expect(mathEnforcer.subtractTen('')).to.be.undefined
      expect(mathEnforcer.subtractTen(22)).to.be.closeTo(12,0.01)
      expect(mathEnforcer.subtractTen(-6)).to.be.closeTo(-16,0.01)
      expect(mathEnforcer.subtractTen(-6.55)).to.be.closeTo(-16.55,0.01)
    })
  })
  describe('sum',function () {
    it('should', function () {
      expect(mathEnforcer.sum('','')).to.be.undefined
      expect(mathEnforcer.sum(1,'')).to.be.undefined
      expect(mathEnforcer.sum('',1)).to.be.undefined
      expect(mathEnforcer.sum(5,6)).to.be.closeTo(11,0.01)
      expect(mathEnforcer.sum(-5,-6)).to.be.closeTo(-11,0.01)
      expect(mathEnforcer.sum(-5.5,6.6)).to.be.closeTo(1.1,0.01)
    })
  })
})