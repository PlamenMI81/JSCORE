function solution(strArr) {
    let townsObj={};
    for (let i = 0; i < strArr.length; i++) {
        let [town, popul]=strArr[i].split(/\s+<->\s+/);
        if (townsObj.hasOwnProperty(town)) {
            townsObj[town]+=Number(popul);
        }else{
            townsObj[town]=Number(popul);
        }
    }

    for (let kvp in townsObj) {
        console.log(`${kvp} : ${townsObj[kvp]}`);
    }
}
solution([
    'Sofia <-> 1200000',
    'Montana <-> 20000',
    'New York <-> 10000000',
    'Washington <-> 2345000',
    'Sofia <-> 1000000'
]);