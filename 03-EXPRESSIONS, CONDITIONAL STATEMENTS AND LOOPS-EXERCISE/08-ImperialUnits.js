function impUnits(inches) {
    let foot=Math.floor(inches/12);
    let inch=inches%12;
    console.log(`${foot}'-${inch}"`);
}

impUnits(55);