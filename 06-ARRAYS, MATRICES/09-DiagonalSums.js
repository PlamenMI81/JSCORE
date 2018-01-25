function diagonalSums(matrix) {
    let sumDiag1=0, sumDiag2=0;
    for (let i = 0; i < matrix.length; i++) {
        sumDiag1+=matrix[i][i];
        sumDiag2+=matrix[i][matrix.length-1-i];

    }
    return console.log(sumDiag1+" "+sumDiag2);
}

diagonalSums([[20, 40],
              [10, 60]]);

diagonalSums([[3, 5, 17],
              [-1, 7, 14],
              [1, -8, 89]]);