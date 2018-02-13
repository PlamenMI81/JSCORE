function solution(strArr) {
    let stockArr=[];
    let sum=0;
    for (let i = 0; i < strArr.length; i++) {
        if (i % 2 === 0) {
            stockArr.push(strArr[i]);
        }else{
           sum+=Number(strArr[i]); 
        }
    }
    console.log(`You purchased ${stockArr.join(', ')} for a total sum of ${sum}`);

}

solution(['Beer Zagorka', '2.65', 'Tripe soup', '7.80','Lasagna', '5.69']);