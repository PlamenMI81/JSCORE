function solution(strArr) {
    let resultArr=[];
    for (let i = 0; i < strArr.length; i++) {
        let command=strArr[i];
        if (command==="add") {
            resultArr.push(i+1);
        }else if (command === "remove") {
            resultArr.pop();
        }
    }
    console.log(resultArr.length>0?resultArr.join("\n"):"Empty");
}

// solution([
//     "add",
//     "add",
//     "add",
//     "add"
// ]);

// solution([
//     "add",
//     "add",
//     "remove",
//     "add",
//     "add"
// ]);

solution([
    "remove",
    "remove",
    "remove"
]);