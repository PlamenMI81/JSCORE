function squareOfStars(num) {
    function star(a) {
        return "* ".repeat(a);
    }

    for (let i = 1; i <= num; i++) {
        console.log(star(num));

    }
}

squareOfStars(5)