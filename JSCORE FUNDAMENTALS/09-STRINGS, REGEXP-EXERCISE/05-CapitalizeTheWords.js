function solution(str) {
    let result = str.toLowerCase()
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.substr(1))
        .join(' ');
    console.log(result);
}

solution('Was that Easy? tRY thIs onE for ,SiZe!');