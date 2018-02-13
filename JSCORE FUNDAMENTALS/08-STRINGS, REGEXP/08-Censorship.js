function solution(str, strArr) {
    for (let i = 0; i < strArr.length; i++) {

        while (string.includes(strArr[i])) {
            string = string.replace(strArr[i], '-'.repeat(strArr[i].length));
        }
    }
    console.log(string);
}

solution('roses are red, violets are blue', [', violets are', 'red']);