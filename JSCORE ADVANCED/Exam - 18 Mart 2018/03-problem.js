class PaymentProcessor {
  constructor (option) {
    this.option = option
    this.payments = new Map()
  }

  set option (val) {
    this._option = {
      types: ['service', 'product', 'other'],
      precision: 2
    }
    if (val !== undefined) {

      for (let key in val) {
        if (this._option.hasOwnProperty(key)) {
          this._option[key] = val[key]
        }
      }
    }
  }

  get option () {
    return this._option
  }

  registerPayment (id, name, type, value) {

    if (id === '' || name === '' || typeof value !== 'number' || !this.option.types.includes(type)) {
      throw new Error()
    }
    if (this.payments.has(id)) {
      throw new Error()
    }
    let data = {
      name: name,
      type: type,
      value: Number(value)
    }
    this.payments.set(id, data)
  }

  deletePayment (id) {
    if (this.payments.has(id)) {
      this.payments.delete(id)
    }
  }

  get (id) {
    if (!this.payments.has(id)) {
      throw new Error()
    }
    let result = `Details about payment ID: ${id}\n`
    result += `- Name: ${this.payments.get(id).name}\n- Type: ${this.payments.get(id).type}\n- Value: ${(this.payments.get(id).value).toFixed(this.option.precision)}`

    return result

  }

  setOptions (options) {

    for (let key in options) {
      if (this._option.hasOwnProperty(key)) {
        this._option[key] = options[key]
      }
    }
  }

  toString () {
    let balance = 0
    for (let key of this.payments) {
      balance += this.payments.get(key[0]).value
    }
    balance = balance.toFixed(this.option.precision)
    return `Summary:\n- Payments: ${this.payments.size}\n- Balance: ${balance}`
  }

}

// Initialize processor with default options
const generalPayments = new PaymentProcessor()
// generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
// generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
// console.log(generalPayments.toString());

// // Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);
//
generalPayments.setOptions({types: ['product', 'material']});
generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
console.log(generalPayments.get('E028'));
generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);
//
// // Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
// // Should throw an error (ID not found)
// generalPayments.get('E027');
//
// generalPayments.deletePayment('E028');
// console.log(generalPayments.toString());
//
// // Initialize processor with custom types
// const servicePyaments = new PaymentProcessor({types: ['service']});
// servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
// servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
// console.log(servicePyaments.toString());
//
// // Initialize processor with custom precision
// const transactionLog = new PaymentProcessor({precision: 5});
// transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
// console.log(transactionLog.toString());
