function solution(numArr) {
    let resArr=[];
    let biggest=Number.NEGATIVE_INFINITY;
    for (let i = 0; i < numArr.length; i++) {
        if (numArr[i] >= biggest) {
            biggest=numArr[i];
            resArr.push(biggest);
        }
    }
    console.log(resArr.join("\n"));
}

// solution([
//     1,
//     3,
//     8,
//     4,
//     10,
//     12,
//     3,
//     2,
//     24
// ]);

solution([
    20,
    20,
    2,
    15,
    6,
    1
]);