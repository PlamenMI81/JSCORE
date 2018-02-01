function solution(json) {
    function escapeing(string) {
        return string
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    let data = JSON.parse(json);
    let keys=Object.keys(data[0]);
    let html = '<table>\n';
    html += `  <tr><th>${keys[0]}</th><th>${keys[1]}</th></tr>\n`;
    for (let obj of data) {
        html += `  <tr><td>${escapeing(obj['name'].toString())}</td><td>${escapeing(obj['score'].toString())}</td></tr>\n`;
    }
    html += '</table>';
    console.log(html);

}

solution('[{"name":"Pesho","score":479},{"name":"Gosho","score":205}]');