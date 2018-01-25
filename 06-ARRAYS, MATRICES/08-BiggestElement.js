function biggestElement(arr) {
    let biggest=Number.NEGATIVE_INFINITY;
    for (let rows = 0; rows < arr.length; rows++) {
        for (let cols = 0; cols < arr[rows].length; cols++) {
            if (arr[rows][cols]>biggest){
                biggest=arr[rows][cols];
            }
        }
    }
    return console.log(biggest);
}

biggestElement([[20, 50, 10],
                [8, 33, 145]]);

biggestElement([[3, 5, 7, 12],
                [-1, 4, 33, 2],
                [8, 3, 0, 4]]);