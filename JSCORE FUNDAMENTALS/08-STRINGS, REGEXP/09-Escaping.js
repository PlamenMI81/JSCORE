function solution(strArr) {
    let html = "<ul>\n";

    function escapeing(string) {
        string = string.replace(/&/g, "&amp;");
        string = string.replace(/</g, "&lt;");
        string = string.replace(/>/g, "&gt;");
        string = string.replace(/"/g, "&quot;");

        return string;
    }

    for (let i = 0; i < strArr.length; i++) {
        html += "  <li>";
        html += escapeing(strArr[i]);
        html += "</li>\n";
    }
    return html += "</ul>";

}

console.log(solution(['<b>unescaped text</b>', 'normal text']));
;