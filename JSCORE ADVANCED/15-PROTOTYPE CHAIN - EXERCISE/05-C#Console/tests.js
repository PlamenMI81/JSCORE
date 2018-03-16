let Console = require('./specialConsole')
let expect = require('chai').expect

describe('Test class Console', function () {

  it('has functions attached to prototype', function () {
    expect(Console.hasOwnProperty('writeLine')).to.equal(true, 'Missing writeLine function')
  })

  it('must return string', function () {
    expect(Console.writeLine('test')).to.be.equal('test')
  })

  it('must return object', function () {
    expect(Console.writeLine({name:'test'})).to.be.equal(JSON.stringify({name:'test'}))
  })

  it('throw typeError', function () {
    expect(()=>{Console.writeLine([],5,5)}).to.throw(TypeError)
  })

  it('throw rangeError', function () {
    expect(()=>{Console.writeLine('{0}{1}{2}',15)}).to.throw(RangeError)
  })

  it('throw rangeError', function () {
    expect(()=>{Console.writeLine('{15}',15,16)}).to.throw(RangeError)
  })

  it('correct replacement', function () {
    expect(Console.writeLine('{0}{1}{2}',15,16,17)).to.be.equal('151617')
  })

})