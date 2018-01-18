function calendar(arr) {
    [day, month, year] = arr;
    let date = new Date(year, month - 1, day);
    let currentDate = new Date(year, month, day).getDate();
    let daysInMonth = new Date(year, month, 0).getDate();

    let html = "<table>\n";
    html += "  <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n";
    let cnt = 1;
    while (cnt<=daysInMonth) {
        html += "  <tr>";
        for (let i = 1; i <= 7; i++) {
            html += cnt === currentDate ? `<td class="today">${cnt}</td>` : `<td>${cnt}</td>`;
            cnt++;
            if (cnt > daysInMonth)
                break;
        }
        html += "</tr>\n";
    }
    html += "</table>";
    return html;
}

// calendar([18, 1, 2018]);
calendar([24, 12, 2012]);