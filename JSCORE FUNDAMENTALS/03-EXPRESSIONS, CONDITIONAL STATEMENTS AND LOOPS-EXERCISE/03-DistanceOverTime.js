function dist(arr) {
    let s1 = (arr[0] * 0.277777778) * arr[2];
    let s2 = (arr[1] * 0.277777778) * arr[2];
    let delta = Math.abs(s1 - s2);
    console.log(delta);
}

dist([11, 10, 120]);