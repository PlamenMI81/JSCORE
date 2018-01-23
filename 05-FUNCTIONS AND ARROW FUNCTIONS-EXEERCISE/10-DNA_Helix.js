const now = require("performance-now")

function dnaHelix(size) {
    function row(i, s1, s2) {
        if (i % 4 === 0) {
            console.log(`**${s1}${s2}**`);
        } else if (i % 4 === 1) {
            console.log(`*${s1}--${s2}*`);
        } else if (i % 4 === 2) {
            console.log(`${s1}----${s2}`);
        } else
            console.log(`*${s1}--${s2}*`);
    }

    let sequence = "ATCGTTAGGG";
    let charIdx = 0;
    for (let i = 0; i < size; i++) {
        let s1 = sequence[charIdx];
        let s2 = sequence[charIdx + 1];
        row(i, s1, s2);
        if (charIdx === 8)
            charIdx = 0;
        else
            charIdx += 2;
    }
}

let t0 = now();
dnaHelix(10);
let t1 = now();
console.log((t1 - t0).toFixed(3));