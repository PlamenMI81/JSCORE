function solution(strArr) {
    let townsObj = {};
    for (let i = 0; i < strArr.length; i += 2) {
        let town = strArr[i];
        let income = Number(strArr[i + 1]);
        if (townsObj.hasOwnProperty(town)) {
            townsObj[town] += income;
        } else
            townsObj[town] = income;
    }
    console.log(JSON.stringify(townsObj));
}

solution([
    'Sofia',
    '20',
    'Varna',
    '3',
    'Sofia',
    '5',
    'Varna',
    '4'
]);

solution([
    'Sofia',
    '20',
    'Varna',
    '3',
    'sofia',
    '5',
    'varna',
    '4'
]);