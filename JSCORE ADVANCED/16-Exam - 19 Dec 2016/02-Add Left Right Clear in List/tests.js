let makeList=require('./list-add-left-right-clear')
let expect=require('chai').expect

describe('Tests',function () {
  let list
  beforeEach(function () {
    list=new makeList()
  })

  it('should add left', function () {
    list.addLeft('str')
    list.addLeft({})
    list.addLeft([])
    expect(list.toString()).to.be.equal(', [object Object], str')
  })

  it('should add right', function () {
    list.addRight('str')
    list.addRight({})
    list.addRight([])
    expect(list.toString()).to.be.equal('str, [object Object], ')
  })

  it('should clear', function () {
    list.addRight('str')
    list.addRight({})
    list.addRight([])
    list.clear()
    expect(list.toString()).to.be.equal('')
  })

  it('should prit array', function () {
    list.addLeft(15)
    list.addLeft(11)
    expect(list.toString()).to.be.equal('11, 15')
  })
})