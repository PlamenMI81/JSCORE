let createCalculator=require('./AddSubtract').createCalculator
let expect = require('chai').expect

describe('test',()=>{
  let calc
  beforeEach(()=>{
    calc=createCalculator()
  })
  it('should have value "0"', function () {
    expect(calc.get()).to.equal(0)
  })

  it('should have value "5"', function () {
    calc.add(5)
    expect(calc.get()).to.equal(5)
  })

  it('should have value "-5"', function () {
    calc.subtract(5)
    expect(calc.get()).to.equal(-5)
  })

  it('should have value "10"', function () {
    calc.add('5')
    calc.add(5)
    expect(calc.get()).to.equal(10)
  })

  it('should have value "2.01"', function () {
    calc.add(3.14)
    calc.subtract(1.13)
    expect(calc.get()).to.be.closeTo(2.01,0.0001)
  })

})