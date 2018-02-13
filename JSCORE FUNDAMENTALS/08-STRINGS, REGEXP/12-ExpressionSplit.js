function solution(str) {
    let result=str.split(/[(),;.\s]/g).filter(s=>s.length!==0);
    console.log(result.join('\n'));
}
solution('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}');