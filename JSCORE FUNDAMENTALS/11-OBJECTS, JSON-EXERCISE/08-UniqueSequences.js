function solve(input) {
    let uniqueArrays=new Map();
    for (let obj of input) {
        let original=JSON.parse(obj);
        let sorted=original.sort((a,b)=>a-b);
        let sortedAsStr=JSON.stringify(sorted);
        if (!uniqueArrays.has(sortedAsStr)) {
            uniqueArrays.set(sortedAsStr,original);
        }
    }
    let sortedByLen=[...uniqueArrays.entries()].sort(function (a, b) {
        let aLen=a[1].length;
        let bLen=b[1].length;
        let firstCrit=aLen-bLen;
        if (firstCrit !==0) {
            return firstCrit;
        }
        else {
            return 0;
    }});

    for (let [k, v] of sortedByLen) {
        console.log('['+(v.sort((a,b)=>a-b).reverse()).join(', ')+']');
    }
}
// solve([
//     '[-3, -2, -1, 0, 1, 2, 3, 4]',
//     '[10, 1, -17, 0, 2, 13]',
//     '[4, -3, 3, -2, 2, -1, 1, 0]'
// ]);

solve([
    '[7.14, 7.180, 7.339, 80.099]',
    '[7.339, 80.0990, 7.140000, 7.18]',
    '[7.339, 7.180, 7.14, 80.099]'
]);
