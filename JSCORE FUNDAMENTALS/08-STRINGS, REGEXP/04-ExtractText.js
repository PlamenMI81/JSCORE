function solution(str) {
    let arr=[];
    let betweenPar;
    while (true){
        let startPar=string.indexOf('(');
        let endPar=string.indexOf(')');
        betweenPar=string.substring(startPar+1,endPar);
        if (startPar < endPar) {
            arr.push(betweenPar);
            string=string.substr(endPar+1);
        }else{
            break;
        }
    }
    console.log(arr.join(', '));
}

solution('Rakiya )Bulgarian brandy( is self-made liquor )alcoholic drink(');