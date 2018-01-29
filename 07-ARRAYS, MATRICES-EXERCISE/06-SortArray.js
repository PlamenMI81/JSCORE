function solution(strArr) {
    let sortedArr = strArr
        // .sort((s1,s2)=>s1.localeCompare(s2,{sensitivity:"base"}))
        .sort()
        .sort((s1, s2) => s1.length > s2.length);
    console.log(sortedArr.join("\n"));
}

solution([
    "test",
    "Deny",
    "Dumy",
    "omen",
    "Default",
    "Dafault"
]);

// solution([
//     "alpha",
//     "beta",
//     "gamma"
// ]);
//
// solution([
//     "Isacc",
//     "Theodor",
//     "Jack",
//     "Harrison",
//     "George"
// ]);