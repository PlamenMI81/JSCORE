function sortArray (arr, method) {
  let asc=(a,b)=>a-b;
  let desc=(a,b)=>b-a;
  let strategy={
    'asc':asc,
    'desc':desc
  }
  return arr.sort(strategy[method])
}

console.log(sortArray([14, 7, 17, 6, 8], 'desc'))