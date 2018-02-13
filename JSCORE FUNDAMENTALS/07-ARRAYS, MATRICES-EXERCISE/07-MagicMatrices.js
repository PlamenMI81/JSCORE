function solution(matrice) {
    let sumRow=0;
    let result=[];
    for (let row = 0; row < matrice.length; row++) {
        sumRow=matrice[row].reduce((a,b)=>a+b);
        result.push(sumRow);
    }
    for (let col = 0; col < matrice.length; col++) {
        let sumCol=0;
        for (let row = 0; row < matrice[col].length; row++) {
            sumCol+=matrice[row][col];
        }
        result.push(sumCol);
    }
    console.log(result.every(v => v === result[0]));
}

// solution([
//     [4, 5, 6],
//     [6, 5, 4],
//     [5, 5, 5]
//     ]);

// solution([
//     [11, 32, 45],
//     [21, 0, 1],
//     [21, 1, 1]
// ]);

solution([
    [-1, -0],
    [0, -1],
    ]);