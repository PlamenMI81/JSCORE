let PaymentPackage=require('./objectToTest')
let expect=require('chai').expect

describe('Test Class PaymentPackage',function () {

  it('initialization does throw', function () {
    let initParam = () => instance = new PaymentPackage('hello');
    expect(initParam).to.throw(Error);
    let initParam1 = () => instance = new PaymentPackage('hello','test');
    expect(initParam1).to.throw(Error);
    let initParam2 = () => instance = new PaymentPackage('hello',12);
    expect(initParam2).to.not.throw();
    let initParam3 = () => instance = new PaymentPackage('',12);
    expect(initParam3).to.throw(Error);
    let initParam4 = () => instance = new PaymentPackage(12,12);
    expect(initParam4).to.throw(Error);
  });

  describe('Test accessors',function () {
    it('should set name with string parameter ', function () {
      let instance = new PaymentPackage('hello',12);
      expect(instance.name).to.equal('hello')
    })

    it('should set value with number parameter ', function () {
      let instance = new PaymentPackage('hello',12);
      expect(instance.value).to.equal(12)
    })

    it('should set VAT with positiv number parameter ', function () {
      let instance = new PaymentPackage('hello',12);
      instance.VAT=0
      expect(instance.VAT).to.equal(0)
    })

    it('should trow for VAT not a number ', function () {
      let instance = new PaymentPackage('hello',12);
      expect(()=>instance.VAT="test").to.throw(Error)
    })

    it('should trow for VAT smaller than 0 ', function () {
      let instance = new PaymentPackage('hello',12);
      expect(()=>instance.VAT=-1).to.throw(Error)
    })

    it('should trow for active != boolean', function () {
      let instance = new PaymentPackage('hello',12);
      expect(()=>instance.active="bool").to.throw(Error)
    })
    it('should set active to boolean', function () {
      let instance = new PaymentPackage('hello',12);
      instance.active=true
      expect(instance.active).to.equal(true)
    })
    it('should set active to boolean', function () {
      let instance = new PaymentPackage('hello',12);
      instance.active=false
      expect(instance.active).to.equal(false)
    })
  })
  describe('Test toString', function () {
    it('should ', function () {
      let instance = new PaymentPackage('hello',1500);
      instance.active=true
      result='Package: hello\n' +
        '- Value (excl. VAT): 1500\n' +
        '- Value (VAT 20%): 1800'
      expect(instance.toString()).to.equal(result)
    })
    it('should ', function () {
      let instance = new PaymentPackage('hello',1500);
      instance.active=false
      result='Package: hello (inactive)\n' +
        '- Value (excl. VAT): 1500\n' +
        '- Value (VAT 20%): 1800'
      expect(instance.toString()).to.equal(result)
    })
  })

})