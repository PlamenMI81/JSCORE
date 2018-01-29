function solution(strArr) {
    let result = [];
    for (let i = 0; i < strArr.length; i++) {
        let token = strArr[i].split('@');
        let user = token[0] + '.';
        let domainToken = token[1].split('.');
        let domain = domainToken.reduce((prev, curr, idx) => idx === 0 ? curr.charAt(0) : prev + curr.charAt(0), '');
        let userName = user.concat(domain);
        result.push(userName);
    }
    console.log(result.join(', '));
}

solution(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);
