let createList=require('./function')
let expect=require('chai').expect

describe('Tests',function () {
  let list
  beforeEach(function () {
    list=createList()
  })

  describe('Test add function',function () {
    it('should add at end of list', function () {
      list.add(3)
      list.add('three')
      list.add([1,2])
      expect(list.toString()).to.be.equal('3, three, 1,2')
    })
  })

  describe('Test shiftLeft function',function () {
    it('should shiftLeft list', function () {
      list.add(3)
      list.add('three')
      list.add([1,2])
      list.shiftLeft()
      expect(list.toString()).to.be.equal('three, 1,2, 3')
    })
  })

  describe('Test shiftRight function',function () {
    it('should shiftRight list', function () {
      list.add(3)
      list.add('three')
      list.add([1,2])
      list.shiftRight()
      expect(list.toString()).to.be.equal('1,2, 3, three')
    })
  })

  describe('Test swap function',function () {
    it('should swap in valid indexes', function () {
      list.add(3)
      list.add('three')
      list.add(-15)
      expect(list.swap(0, 2)).to.be.true
      expect(list.toString()).to.be.equal('-15, three, 3')

    })
    it('should false in invalid indexes', function () {
      list.add(3)
      list.add('three')
      list.add(-15)
      expect(list.swap(-1, 2)).to.be.false
      expect(list.swap(1.5, 2)).to.be.false
      expect(list.toString()).to.be.equal('3, three, -15')
      expect(list.swap(1, 0)).to.be.true
      expect(list.toString()).to.be.equal('three, 3, -15')
    })
    it('should false in invalid indexes', function () {
      list.add(3)
      list.add('three')
      list.add(-15)
      expect(list.swap(0, 3)).to.be.false
      expect(list.swap(0, 1.5)).to.be.false
      expect(list.toString()).to.be.equal('3, three, -15')

    })
    it('should false in equal indexes', function () {
      list.add(3)
      list.add('three')
      list.add(-15)
      expect(list.swap(0, 0)).to.be.false
      expect(list.toString()).to.be.equal('3, three, -15')

    })
  })
})