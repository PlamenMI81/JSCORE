function solution(strArr) {
    let rotations=strArr[strArr.length-1];
    strArr.pop();
    rotations=rotations%strArr.length;
    for (let i = 0; i < rotations; i++) {
        let lastElement=strArr[strArr.length-1];
        strArr.pop();
        strArr.unshift(lastElement);
    }
    console.log(strArr.join(" "));
}

solution([
    "1",
    "2",
    "3",
    "4",
    "4"
]);

solution([
    "Banana",
    "Orange",
    "Coconut",
    "Apple",
    "15"
]);