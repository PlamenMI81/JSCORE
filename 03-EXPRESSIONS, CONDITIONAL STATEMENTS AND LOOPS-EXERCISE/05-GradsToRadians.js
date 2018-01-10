function gradsToDegree(grads) {
    let degree = grads * 0.9;
    if (degree < 0) {
        degree = 360-Math.abs(degree % 360);
    } else if (degree >= 360) {
        degree = degree % 360;
    }
    console.log(degree);
}

gradsToDegree(1055);