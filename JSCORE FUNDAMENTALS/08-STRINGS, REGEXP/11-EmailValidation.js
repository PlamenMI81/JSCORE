function solution(str) {
    let regx=/^[a-zA-Z0-9]+@[a-z]+\.[a-z]+$/g;
    console.log(regx.test(str)?'Valid':'Invalid');
}

solution('Valid1@emai.bg.');