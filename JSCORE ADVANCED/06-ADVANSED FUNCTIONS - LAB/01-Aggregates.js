function solve (arr) {
  let sum = arr.reduce((a, b) => a + b)
  let min=Math.min(...arr)
  let max=Math.max(...arr)
  let prod=arr.reduce((a,b)=>a*b)
  let join=[...arr].join('')
  console.log(`Sum = ${sum}`)
  console.log(`Min = ${min}`)
  console.log(`Max = ${max}`)
  console.log(`Product = ${prod}`)
  console.log(`Join = ${join}`)
}

solve([2, 3, 10, 5])