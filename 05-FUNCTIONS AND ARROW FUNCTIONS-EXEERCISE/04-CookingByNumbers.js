function cooking(arr) {
    let number = Number(arr[0]);

    function chop(number) {
        return number / 2;
    }

    function dice(number) {
        return Math.sqrt(number);
    }

    function spice(number) {
        return number + 1;
    }

    function bake(number) {
        return number * 3;
    }

    function fillet(number) {
        let percent = number * 0.2;
        return number - percent;
    }

    for (let i = 1; i < 6; i++) {
        let op = arr[i];
        switch (op) {
            case "chop":
                console.log(number = chop(number));
                break;
            case "dice":
                console.log(number = dice(number));
                break;
            case "spice":
                console.log(number = spice(number));
                break;
            case "bake":
                console.log(number = bake(number));
                break;
            case "fillet":
                console.log(number = fillet(number));break;
        }
    }
}

cooking([9, "dice", "spice", "chop", "bake", "fillet"]);