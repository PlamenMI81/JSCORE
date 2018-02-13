function triangleOfStars(num) {
    function star(a) {
        return "*".repeat(a);
    }

    for (let i = 1; i <= num; i++) {
        console.log(star(i));
    }
    for (let i =num-1 ; i >= 1; i--) {
        console.log(star(i));
    }
}

triangleOfStars(5);