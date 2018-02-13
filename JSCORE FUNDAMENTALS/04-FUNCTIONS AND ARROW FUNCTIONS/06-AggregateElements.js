function aggregate(arr) {
    let sum=arr.reduce((a,b)=>a+b,0);
    console.log(sum);

    let sumInversvalue=arr.reduce((a,b)=>a+1/b,0);
    console.log(sumInversvalue);

    let concat=arr.reduce((a,b)=>a+""+b);
    console.log(concat);
}
aggregate([2, 4, 8, 16]);