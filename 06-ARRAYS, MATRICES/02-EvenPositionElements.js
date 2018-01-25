function evenPositionElements(strArr) {
    let strOdd="";
    for (let i = 0; i < strArr.length; i++) {

        if(i%2===0){
            strOdd+=strArr[i]+" ";
        }
    }
    return strOdd;
}

console.log(evenPositionElements(['20', '30', '40']));