function chessboard(size) {
    let color = function (i) {
        if (i % 2 != 0)
            return 'black';
        else
            return 'white';
    };

    let blackOrWhite = "";
    console.log('<div class="chessboard">');
    for (let i = 1; i <= size; i++) {
        console.log('\t<div>');
        blackOrWhite = color(i);
        for (let j = 1; j <= size; j++) {
            console.log(`\t\t<span class="${blackOrWhite}"></span>`);
            if(blackOrWhite=='black')
                blackOrWhite='white';
            else
                blackOrWhite='black';
        }
        console.log('\t</div>');
    }
    console.log('</div>');
}

chessboard(5);