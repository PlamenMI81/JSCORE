function pointInRectangle(arr) {
    [x, y, xMin, xMax, yMin, yMax ]=arr;
    if (x>=xMin && x<=xMax && y>=yMin && y<=yMax)
        console.log(`inside`);
    else
        console.log(`outside`);
}

pointInRectangle([12.5,
-1,
    2,
    12,
    -3,
    3

]);