function solution(strArr) {
    let n=strArr[strArr.length-1]*1;
    for (let i = 0; i < strArr.length-1; i+=n) {
        console.log(strArr[i]);
    }
}

// solution([
//     "5",
//     "20",
//     "31",
//     "4",
//     "20",
//     "2"
// ]);

solution([
    "dsa",
    "asd",
    "test",
    "tset",
    "2"
]);