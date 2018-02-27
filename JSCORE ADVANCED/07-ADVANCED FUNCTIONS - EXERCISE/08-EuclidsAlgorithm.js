function solve (a, b) {
  while (b !== 0){
    let t = b;
    b = a % b;
    a = t;
  }
  return a;
}

console.log(solve(252, 105))