let expect = require('chai').expect
let assert=require('chai').assert

function isOddOrEven (string) {
  if (typeof(string) !== 'string') {
    return undefined
  }
  if (string.length % 2 === 0) {
    return 'even'
  }

  return 'odd'
}

// console.log(isOddOrEven({}))

describe('tests', function () {
  it('should return undefined', function () {
    expect(isOddOrEven(10)).to.be.undefined
  })
  it('should return even', function () {
    expect(isOddOrEven('10')).to.be.equal('even')
  })
  it('should return odd', function () {
    expect(isOddOrEven('111')).to.be.equal('odd')
  })



})