function solve () {
  class Melon{
    constructor (weight,melonSort){
      if (new.target===Melon) {
        throw new TypeError("Abstract class cannot be instantiated directly");
      }
      this.weight=Number(weight)
      this.melonSort=melonSort
      this.element=''
    }
    toString(){
      return `Element: ${this.element}\nSort: ${this.melonSort}\nElement Index: ${this.elementIndex}`
    }
  }
  class Watermelon extends Melon{
    constructor (weight,melonSort){
      super(weight,melonSort)
      this.element='Water'
    }

    get elementIndex(){
      return this.weight*this.melonSort.length
    }

  }
  class Firemelon extends Melon{
    constructor (weight,melonSort){
      super(weight,melonSort)
      this.element='Fire'
    }

    get elementIndex(){
      return this.weight*this.melonSort.length
    }
  }
  class Earthmelon extends Melon{
    constructor (weight,melonSort){
      super(weight,melonSort)
      this.element='Earth'
    }

    get elementIndex(){
      return this.weight*this.melonSort.length
    }
  }
  class Airmelon extends Melon{
    constructor (weight,melonSort){
      super(weight,melonSort)
      this.element='Air'
    }

    get elementIndex(){
      return this.weight*this.melonSort.length
    }
  }
  class Melolemonmelon extends Watermelon {
    constructor(weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Water';
      this.elements = ['Fire', 'Earth', 'Air', 'Water'];
      this.eIndex = 0;
    }

    morph() {
      this.element = this.elements[this.eIndex++ % 4];
    }
  }

  return{Melon,
    Earthmelon,
    Firemelon,
    Airmelon,
    Watermelon,
    Melolemonmelon}
}

let classes = solve();

let test=new classes.Firemelon(15,'bgty')
console.log(test.toString())
// let test = new classes.Melolemonmelon(150, "Melo");
// console.log(test.toString())
// test.morph();
// test.morph();
// console.log(test.toString())