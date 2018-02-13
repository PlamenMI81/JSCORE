function negativePositiveNumbers(numArr) {
    let res=[];
    for (let i = 0; i < numArr.length; i++) {
        if(numArr[i]<0){
            res.unshift(numArr[i])
        }else{
            res.push(numArr[i]);
        }
    }
    return res.join("\n");
}

console.log(negativePositiveNumbers([3, -2, 0, -1]));