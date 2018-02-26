function solve (arr) {
  let commands=(function () {
    let arr=[]
    function add (str) {
      arr.push(str)
    }
    function remove (str) {
      arr=arr.filter(w=>w!==str)
    }
    function print () {
      console.log(arr.join(','))
    }
    return {add,remove,print}
  })()

  for (let str of arr) {
    let[command,value]=str.split(' ')
    commands[command](value)
  }

}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print'])