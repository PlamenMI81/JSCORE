function figure(num) {
    function firstMiddleLastRow(cols) {
        let middle = num;
        let str = "";
        for (let i = 1; i <= cols; i++) {
            if (i === 1 || i === middle || i === cols)
                str += "+";
            else
                str += "-";
        }
        return str + "\n";
    }

    function innerRow(cols) {
        let middle = num;
        let str = "";
        for (let i = 1; i <= cols; i++) {
            if (i === 1 || i === middle || i === cols)
                str += "|";
            else
                str += " ";
        }
        return str + "\n";

    }

    let figure = "";
    let rows = num % 2 === 0 ? num - 1 : num;
    let middleRow = num % 2 === 0 ? num / 2 : Math.ceil(num / 2);


    for (let i = 1; i <= rows; i++) {
        if (i === 1 || i === middleRow || i === rows)
            figure += firstMiddleLastRow(2 * num - 1);
        else
            figure += innerRow(2 * num - 1);
    }
    console.log(figure);
}

figure(6);