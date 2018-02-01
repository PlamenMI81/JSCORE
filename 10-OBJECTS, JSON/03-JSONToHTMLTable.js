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
    let html='<table>\n  <tr>';
    for (let i = 0; i < keys.length; i++) {
        html+=`<th>${escapeing(keys[i].toString())}</th>`;
    }
    html+='</tr>\n';
    for (let i = 0; i < data.length; i++) {
        html+='  <tr>';
        for (let j = 0; j < keys.length; j++) {
            html+=`<td>${escapeing(data[i][keys[j]].toString())}</td>`;
        }
        html+='</tr>\n';
    }
    html+='</table>';


    return html;
}