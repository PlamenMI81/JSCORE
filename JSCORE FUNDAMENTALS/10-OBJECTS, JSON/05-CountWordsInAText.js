function solution(strArr) {
    let words = strArr[0].match(/\w+/g);
    let countWordsObj = {};
    for (let kvp of words) {
        if (countWordsObj.hasOwnProperty(kvp)) {
            countWordsObj[kvp] = countWordsObj[kvp]+1;
        } else
            countWordsObj[kvp] = 1;
    }
    console.log(JSON.stringify(countWordsObj));
}


solution([
    'JS devs use Node.js for server-side JS.-- JS for devs'
]);