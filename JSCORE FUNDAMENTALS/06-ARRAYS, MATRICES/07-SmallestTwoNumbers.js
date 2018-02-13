function smallestTwoNumbers(numArr) {
    numArr.sort((a,b)=>a-b);
    return console.log(numArr.slice(0,2).join(" "));
}

smallestTwoNumbers([30, 15, 50, 5]);
smallestTwoNumbers([3, 0, 10, 4, 7, 3]);