function solution(strArr) {
    let html='<table>\n'
    for (let i = 0; i < strArr.length; i++) {
        let obj = JSON.parse(strArr[i]);
        html+='\t<tr>\n';
        html+=`\t\t<td>${obj['name']}</td>\n`;
        html+=`\t\t<td>${obj['position']}</td>\n`;
        html+=`\t\t<td>${obj['salary']}</td>\n`;
        html+='\t<tr>\n';
    }
    html+='</table>';
    console.log(html);
}

solution([
    '{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}'
]);