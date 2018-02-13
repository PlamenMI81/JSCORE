function lastKNumbersSequence(n, k) {
    let arr=[1];
    for (let i = 1; i < n; i++) {
        arr[i]=arr.slice((Math.max(i-k,0))).reduce((a,b)=>a+b);
    }
    return arr;
}

// console.log(lastKNumbersSequence(6,3));
console.log(lastKNumbersSequence(8,2));