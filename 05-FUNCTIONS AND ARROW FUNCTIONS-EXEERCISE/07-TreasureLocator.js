function treasureLocator(arr) {
    function tokelau(x, y) {
        let x1 = 8, x2 = 9;
        let y1 = 0, y2 = 1;
        return (x >= x1 && x <= x2 && y >= y1 && y <= y2 )?true:false;
    }
    function tuvalu(x, y) {
        let x1 = 1, x2 = 3;
        let y1 = 1, y2 = 3;
        return (x >= x1 && x <= x2 && y >= y1 && y <= y2 )?true:false;
    }
    function samoa(x, y) {
        let x1 = 5, x2 = 7;
        let y1 = 3, y2 = 6;
        return (x >= x1 && x <= x2 && y >= y1 && y <= y2 )?true:false;
    }
    function tonga(x, y) {
        let x1 = 0, x2 = 2;
        let y1 = 6, y2 = 8;
        return (x >= x1 && x <= x2 && y >= y1 && y <= y2 )?true:false;
    }
    function cook(x, y) {
        let x1 = 4, x2 = 9;
        let y1 = 7, y2 = 8;
        return (x >= x1 && x <= x2 && y >= y1 && y <= y2 )?true:false;
    }

    let result="On the bottom of the ocean";
    for (let i = 0; i < arr.length; i+=2) {
        let x=(arr[i]);
        let y=(arr[i+1]);

        if(samoa(x,y)){
            result="Samoa";
        }else if (tuvalu(x,y)){
            result="Tuvalu";
        }else if (tokelau(x,y)){
            result="Tokelau";
        }else if (tonga(x,y)){
            result="Tonga";
        }else if (cook(x,y)){
            result="Cook";
        }
        console.log(result);

    }
}

// treasureLocator([6,7.5]);
treasureLocator([4, 2, 1.5, 6.5, 1, 3]);