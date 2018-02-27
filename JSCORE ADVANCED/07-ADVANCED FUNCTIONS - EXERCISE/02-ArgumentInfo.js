function solve () {
  let summary={}
  for (let arg of arguments) {
    let type=typeof arg
    console.log(`${type}: ${arg}`)
    if (!summary[type]) {
      summary[type]=0
    }
    summary[type]++
  }
  let sorted=Object.keys(summary)
    .sort((a,b)=>summary[b]-summary[a])
    .forEach((e)=>{
      console.log(`${e} = ${summary[e]}`)
  })
  
}
solve('cat', 42, 18,function () { console.log('Hello world!'); })