function solution(str) {
    let rx=/(-?\d+)\s*\*\s*(-?([0-9]*)?\.?[0-9]*)/;
    let groups=rx.exec(str);
    while (groups) {
        str = str.replace(rx, res => Number(groups[1]) * Number(groups[2]));
        groups=rx.exec(str);
    }
    console.log(str);
}
solution('My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).');