let Person=require('./01-PersonAndTeacher')
function extendClass (classToExtend) {
  classToExtend.prototype.species='Human'
  classToExtend.prototype.toSpeciesString=function () {
    return `I am a ${this.species}. ${this.toString()}`
  }
}

extendClass(Person)
let p=new Person('Ivan','mail')
console.log(p.species)
console.log(p.toSpeciesString())