function solution(strArr) {
    let towns=[];
    let sum=0;
    for (let i = 0; i < strArr.length; i++) {
        let token=strArr[i].split('|').filter(s=>s!=='');
        towns[i]=token[0].trim();
        sum+=Number(token[1].trim());
    }
    console.log(towns.join(', '));
    console.log(sum);
}

solution([
    '| Sofia           | 300',
    '| Veliko Tarnovo  | 500',
    '| Yambol          | 275']
);