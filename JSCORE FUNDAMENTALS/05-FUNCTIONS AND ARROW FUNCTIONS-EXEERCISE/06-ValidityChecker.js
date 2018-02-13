function validity(arr) {
    let [x1, y1, x2, y2] = arr;

    function distance(x1, y1, x2, y2) {
        let dist= Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        if(dist%1===0)
            return "valid";
        return "invalid";
    }

    console.log(`{${x1}, ${y1}} to {0, 0} is ${distance(x1, y1, 0, 0)}`);
    console.log(`{${x2}, ${y2}} to {0, 0} is ${distance(x2, y2, 0, 0)}`);
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${distance(x1, y1, x2, y2)}`);
}

validity([3, 0, 0, 4]);
// validity([2, 1, 1, 1]);