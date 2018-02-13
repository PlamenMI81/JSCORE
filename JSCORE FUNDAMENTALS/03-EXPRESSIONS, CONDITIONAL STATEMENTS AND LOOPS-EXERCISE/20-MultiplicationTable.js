function multiplication(input) {
    let html='<table border="1">\n';
    html+=`\t<tr>`;
    for (let i = 0; i <= input; i++) {
        if (i===0)
            html+=`<th>x</th>`;
        else
            html+=`<th>${i}</th>`;
    }
    html+=`</tr>\n`;
    
    for (let i = 1; i <= input; i++) {
        html+=`\t<tr><th>${i}</th>`;
        for (let j = 1; j <= input; j++) {
            html+=`<td>${j*i}</td>`;
        }
        html+=`</tr>\n`;
    }
    html+='</table>';
    return html;
}

multiplication(5);