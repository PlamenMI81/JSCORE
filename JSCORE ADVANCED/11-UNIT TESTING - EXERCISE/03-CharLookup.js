let expect = require('chai').expect

function lookupChar(string, index) {
  if (typeof(string) !== 'string' || !Number.isInteger(index)) {
    return undefined;
  }
  if (string.length <= index || index < 0) {
    return "Incorrect index";
  }

  return string.charAt(index);
}

describe('tests', function () {
  it('should', function () {
    expect(lookupChar(5,5.5)).to.be.undefined
    expect(lookupChar(5,5)).to.be.undefined
    expect(lookupChar('string',5.5)).to.be.undefined
  })
  it('should', function () {
    expect(lookupChar('string',-1)).to.equal('Incorrect index')
    expect(lookupChar('string',6)).to.equal('Incorrect index')
  })
  it('should', function () {
    expect(lookupChar('string',0)).to.equal('s')
    expect(lookupChar('string',5)).to.equal('g')
  })
})