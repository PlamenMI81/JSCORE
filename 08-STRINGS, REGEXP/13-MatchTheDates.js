function solution(str) {
    let rx = /(\b[0-9]{1,2})-([A-Z][a-z]{2})-([1-9][0-9]{3})/g;
    let match = rx.exec(str);
    while (match) {
        console.log(`${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`);
        match = rx.exec(str);
    }
}

solution(
    '1-Jan-1999 is a valid date.\n'+
    'So is 01-July-2000.\n'+
    'I am an awful liar, by the way – Ivo, 28-Sep-2016.'
);