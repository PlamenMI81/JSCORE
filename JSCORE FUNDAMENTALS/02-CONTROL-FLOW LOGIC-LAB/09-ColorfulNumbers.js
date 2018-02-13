function colorfulNum(lines) {
    let htmlStr="";
    let color="";
    let newRow="\r\n";
    console.log('<ul>');
    for (let i = 1; i <= lines; i++) {
        if(i%2==0)
            color='blue';
        else
            color='green';
        if(i==lines)
            newRow="";
        htmlStr+=`\t<li><span style='color:${color}'>${i}</span></li>${newRow}`;
    }
    console.log(htmlStr);
    console.log('</ul>');
}

colorfulNum(10);