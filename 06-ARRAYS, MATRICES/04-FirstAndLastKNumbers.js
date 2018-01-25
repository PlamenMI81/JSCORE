function firstAndLastKNumbers(numArr) {
    let count=numArr.shift();
    console.log(numArr.slice(0,count).join(" "));
    console.log(numArr.slice(numArr.length-count).join(" "));
}
// firstAndLastKNumbers([2, 7, 8, 9]);
firstAndLastKNumbers([3, 6, 7, 8, 9]);
