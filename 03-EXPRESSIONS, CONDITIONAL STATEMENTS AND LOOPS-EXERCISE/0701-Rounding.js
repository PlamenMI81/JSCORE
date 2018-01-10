function rounding(arr) {
    let [number,precision]=arr;
    if (precision>15)
        precision=15;
    console.log(+number.toFixed(precision));
}
rounding([10.5, 7]);