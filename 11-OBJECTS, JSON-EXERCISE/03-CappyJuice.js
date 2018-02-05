function solution(strArr) {
    let juices={};
    let row=new Set();
    for (let i = 0; i < strArr.length; i++) {
        let [juiceName, quant]=strArr[i].split(/\s+=>\s+/g);
        quant=+quant;
        if (!juices.hasOwnProperty(juiceName)) {
            juices[juiceName]=quant;
        } else {
            juices[juiceName]+=quant;
        }
        if (Math.floor(juices[juiceName] / 1000)>0) {
            row.add(juiceName);
        }
    }
    for (let j of row.values()) {
        let bottles=Math.floor(juices[j] / 1000);
        if (bottles>0) {
            console.log(`${j} => ${bottles}`);
        }
    }
}

solution([
    'Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'
]);