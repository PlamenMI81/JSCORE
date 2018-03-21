class Repository {
  constructor (props) {
    this.props = props
    this.data = new Map()
    let id = 0;
    this.nextId = function () {
      return id++;
    }
  }

  get count () {
    return this.data.size
  }

  add (entity) {
    this._validateEntity(entity)
    let id=this.nextId()
    this.data.set(id,entity)
    return id
  }

  get (id) {
    this._checkId(id)
    return this.data.get(id)
  }

  update (id, newEntity) {
    this._checkId(id)
    this._validateEntity(newEntity)
    this.data.delete(id)
    this.data.set(id,newEntity)
  }

  del (id) {
    this._checkId(id)
    this.data.delete(id)
  }
  _validateEntity(entity){
    for (let key in entity) {
      if (!this.props.hasOwnProperty(key)) {
        throw new Error(`Property ${key} is missing from the entity!`)
      }
      if (!(typeof entity[key]===this.props[key])) {
        throw new TypeError(`Property ${key} is of incorrect type!`)
      }
    }
  }

  _checkId(id){
    if (!this.data.has(id)) {
      throw new Error(`Entity with id: ${id} does not exist!`)
    }
  }
}


//---------------------------------------------------
let repo1 = new Repository(props = {color: "string", length: "number"});
let repo2 = new Repository(props = {name: "string", counter: "number", someArr: "object"});
let id1 = repo1.add({color: 'yellow', length: 5});
let id2 = repo2.add({name: "vasil", counter: 3, someArr: [1, 2, 3]});

expect(id1).to.equal(id2, "IDs must increment independently");
repo1.add({color: 'blue', length: 15});
repo1.add({color: 'orange', length: 4});
id1 = repo1.add({color: 'red', length: 32});
expect(id1).to.equal(3, "First ID not incremented correctly");
repo2.add({name: "ivan", counter: 8, someArr: [4, 5, 6]});
id2 = repo2.add({name: "maria", counter: 1, someArr: ['a', 'b']});
expect(id2).to.equal(2, "Second ID not incremented correctly");
