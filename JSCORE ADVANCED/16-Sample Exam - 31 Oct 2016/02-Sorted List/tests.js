const SortedList=require('./sorted-list')
const expect=require('chai').expect

describe('Test SortedList Class', function () {
  let list
  beforeEach(function () {
    list=new SortedList()
  })
  describe('Test add function', function () {
    it('should add func exist', function () {
      expect(SortedList.prototype.hasOwnProperty('add')).to.equal(true)
    })

    it('should add element', function () {
      list.add(15)
      list.add(0)
      list.add(-5)
      expect(list.get(0)).to.equal(-5)
      expect(list.get(1)).to.equal(0)
      expect(list.get(2)).to.equal(15)
    })
  })

  describe('Test remove function',function () {
    it('should remove func exist', function () {
      expect(SortedList.prototype.hasOwnProperty('remove')).to.equal(true)
    })

    it('should remove element at index', function () {
      list.add(15)
      list.add(0)
      list.add(-10)
      list.remove(1)
      expect(list.get(0)).to.equal(-10)
      expect(list.get(1)).to.equal(15)
    })

    it('should throw Error in invalid index', function () {
      list.add(15)
      list.add(0)
      expect(()=>{list.remove(-1)}).to.throw(Error)
      expect(()=>{list.remove(2)}).to.throw(Error)
    })

    it('should throw Error in empty list', function () {
      expect(()=>{list.remove(0)}).to.throw(Error)
    })
  })

  describe('Test get function',function () {
    it('should get func exist', function () {
      expect(SortedList.prototype.hasOwnProperty('get')).to.equal(true)
    })

    it('should get element at index', function () {
      list.add(0)
      expect(list.get(0)).to.equal(0)
    })

    it('should throw error in invalid index', function () {
      list.add(15)
      list.add(0)
      expect(()=>{list.get(-1)}).to.throw(Error)
      expect(()=>{list.get(2)}).to.throw(Error)
    })
  })

  describe('Test size property', function () {
    it('should size prop exist', function () {
      expect(SortedList.prototype.hasOwnProperty('size')).to.equal(true)
      expect(typeof list.size).to.not.equal('function', "Property size should not be a function.");
    })

    it('should return size of list', function () {
      list.add(15)
      list.remove(0)
      list.add(0)
      list.add(-15)
      expect(list.size).to.be.equal(2)
    })
  })
})