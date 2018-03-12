class Stringer {
  constructor (innerString, innerLength) {
    this.innerString = innerString
    this.innerLength = innerLength
  }

  toString () {
    if (this.innerString.length <= this.innerLength) {
      return this.innerString
    }
    return this.innerString.substr(0, this.innerLength) + '...'
  }

  increase (len) {
    this.innerLength += len
  }

  decrease (len) {
    this.innerLength - len < 0 ? this.innerLength = 0 : this.innerLength -= len
  }

}

let test = new Stringer('Test', 5)
console.log(test.toString()) //Test

test.decrease(3)
console.log(test.toString()) //Te...

test.decrease(5)
console.log(test.toString()) //...

test.increase(4)
console.log(test.toString()) //Test

