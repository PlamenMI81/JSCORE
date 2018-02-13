function solution(str) {
    let regex=/\w+/g;
    let result=str.match(regex);
    console.log(result.join('|'));
}

solution('_(Underscores) are also word characters');