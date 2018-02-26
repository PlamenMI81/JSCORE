function solve () {
  let first=0
  let second=1
  return function () {
    let next=first+second
    first=second
    second=next
   return first
  }
}
let fib=solve()
console.log(fib())
console.log(fib())
console.log(fib())
console.log(fib())
console.log(fib())
console.log(fib())