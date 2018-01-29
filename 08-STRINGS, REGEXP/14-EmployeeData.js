function solution(strArr) {
    let rx = /^([A-Z][a-zA-Z]*) - ([1-9][0-9]*) - ([a-zA-Z0-9 -]+)$/;
    for (let i = 0; i < strArr.length; i++) {
        let match = rx.exec(strArr[i]);
        if (match) {
            console.log(`Name: ${match[1]}`);
            console.log(`Position: ${match[3]}`);
            console.log(`Salary: ${match[2]}`);
        }

    }
}

// solution([
//     'Isacc - 1000 - CEO',
//     'Ivan - 500 - Employee',
//     'Peter - 500 - Employee',
// ]);

solution([
    'Jonathan - 2000 - Manager',
    'Peter- 1000- Chuck',
    'George - 1000 - Team Leader'
]);