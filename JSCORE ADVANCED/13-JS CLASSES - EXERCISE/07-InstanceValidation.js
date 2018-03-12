class CheckingAccount {
  constructor (clientId, email, firstName, lastName) {
    this.clientId = clientId
    this.products=[]
    this.email = email
    this.firstName = firstName
    this.lastName = lastName
  }
  set clientId(val) {
    if (/^\d{6}$/.test(val)) {
      return this._clientId=val
    }
    throw TypeError('Client ID must be a 6-digit number')
  }

  get clientId(){
    return this._clientId
  }

  get email () {
    return this._email
  }

  set email (value) {
    if (/^[a-zA-Z0-9]+@[a-zA-Z.]+$/.test(value)) {
      return this._email = value
    }
    throw new TypeError('Invalid e-mail')
  }

  get firstName () {
    return this._firstName
  }

  set firstName (value) {
    if (value.length < 3 || value.length > 20) {
      throw new TypeError('First name must be between 3 and 20 characters long')
    }
    if (/^[a-zA-Z]+$/.test(value)) {
      return this._firstName = value
    }
      throw new TypeError('First name must contain only Latin characters')
  }

  get lastName () {
    return this._lastName
  }

  set lastName (value) {
    if (value.length < 3 || value.length > 20) {
      throw new TypeError('Last name must be between 3 and 20 characters long')
    }
    if (/^[a-zA-Z]+$/.test(value)) {
      return this._firstName = value
    }
    throw new TypeError('Last name must contain only Latin characters')
  }
}

let acc = new CheckingAccount('131456', 'ivan@some.com', 'Ivan', 'Petrov')
//console.log(acc.clientId)