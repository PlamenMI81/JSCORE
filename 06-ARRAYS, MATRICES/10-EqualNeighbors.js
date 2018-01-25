function equalNeighbors(matrix) {
    let equal=0;
    for (let rows = 0; rows < matrix.length; rows++) {
        for (let cols = 0; cols < matrix[rows].length; cols++) {
            if (cols<matrix[rows].length && matrix[rows][cols]===matrix[rows][cols+1]){
                equal++;
            }
            if(rows<matrix.length-1 && matrix[rows][cols]===matrix[rows+1][cols]){
                equal++;
            }
        }
    }
    return console.log(equal);

}

equalNeighbors([['2', '3', '4', '7', '0'],
                ['4', '0', '5', '3', '4'],
                ['2', '3', '5', '4', '2'],
                ['9', '8', '7', '5', '4']]);

equalNeighbors([['test', 'yes', 'yo', 'ho'],
                ['well', 'done', 'yo', '6'],
                ['not', 'done', 'yet', '5']]);
equalNeighbors([[1,1],
                [1,1]]);