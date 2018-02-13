function solution(arr) {
    let [p, i, n, t] = arr;
    i = i / 100;
    n = 12 / n;
    let power = n * t;
    let f = p * Math.pow((1 + i / n), power);
    console.log(f.toFixed(2));

}

solution([1500, 4.3, 3, 6]);