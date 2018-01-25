function processOddNumbers(numArr) {
    let resArr=[];
    for (let i = 0; i < numArr.length; i++) {
        if(i%2!==0){
            resArr[i]=numArr[i];
        }
    }
    resArr=resArr.map(e=>e*2).reverse().join(" ");
    return console.log(resArr);
}

// processOddNumbers([10, 15, 20, 25]);
processOddNumbers([3, 0, 10, 4, 7, 3]);