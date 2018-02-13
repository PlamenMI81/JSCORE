function solution(strArr) {
    let words = strArr[0].match(/\w+/g).map(w=>w.toLowerCase());
    let countWordsMap = new Map();
    for (let kvp of words) {
        if (countWordsMap.has(kvp)) {
            countWordsMap.set(kvp, countWordsMap.get(kvp)+1);
        } else
            countWordsMap.set(kvp,1);
    }

    let allwords=[...countWordsMap.keys()].sort();
    allwords.forEach(w=>console.log(`'${w}' -> ${countWordsMap.get(w)} times`));
}


solution([
    'Far too slow, you\'re far too slow.'
]);