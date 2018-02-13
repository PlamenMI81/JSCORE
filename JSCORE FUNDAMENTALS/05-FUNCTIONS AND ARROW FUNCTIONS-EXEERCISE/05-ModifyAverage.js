function modify(num) {
    function average() {
        let numAsArr = num.toString().split("");
        let sumDigit = numAsArr.reduce((a, b) => Number(a) + Number(b), 0);
        return sumDigit/numAsArr.length;
    }

    function modifyNum(num) {
        let numAsArr = num.toString().split("");
        numAsArr.push(9);
        return numAsArr.join("");
    }

    while (average(num) <= 5)
        num = modifyNum(num);
    return num;
}

console.log(modify(5835));