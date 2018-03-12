function solve () {
  class Person {
    constructor (name, email){
      this.name=name
      this.email=email
    }
    toString(){
      let className=this.constructor.name
      return `${className} (name: ${this.name}, email: ${this.email})`
    }
  }
  class Teacher extends Person{
    constructor (name, email,subject){
      super(name, email)
      this.subject=subject
    }
    toString(){
      let baseStr=super.toString().slice(0,-1)
      return baseStr+`, subject: ${this.subject})`
    }
  }
  class Student extends Person{
    constructor (name, email, course){
      super (name, email)
      this.course=course
    }
    toString(){
      let baseStr=super.toString().slice(0,-1)
      return baseStr+`, course: ${this.course})`
    }
  }
  return {Person, Teacher,Student}
}
let Person=solve().Person
let p=new Person('ivan','ivan@abv.bg')
console.log(p+'')

let Teacher=solve().Teacher
let t=new Teacher('petyr','petyr@dfr.com','Java')
console.log(t+'')

let Student=solve().Student
let s=new Student('sasho','sasho@vfr.jp','JS')
console.log(s+'')



