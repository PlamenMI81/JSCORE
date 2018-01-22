function radioCrystals(arr) {
    let targetThickness = arr[0];
    let crystalThickness = 0;

    function transportAndWash(crystalThickness) {
        console.log("Transporting and washing");
        return crystalThickness = Math.floor(crystalThickness);
    }

    function cut(crystalThickness) {
        let cuts = 0;
        while (crystalThickness / 4 >= targetThickness) {
            crystalThickness /= 4;
            cuts++;
        }
        console.log(`Cut x${cuts}`);
        crystalThickness = transportAndWash(crystalThickness);
        return crystalThickness;
    }

    function lap(crystalThickness) {
        let laps = 0;
        while ((crystalThickness - crystalThickness * 0.2) >= targetThickness) {
            crystalThickness = crystalThickness - crystalThickness * 0.2;
            laps++;
        }
        console.log(`Lap x${laps}`);
        crystalThickness = transportAndWash(crystalThickness);
        return crystalThickness;
    }

    function grind(crystalThickness) {
        let grinds = 0;
        while (crystalThickness - 20 >= targetThickness) {
            crystalThickness -= 20;
            grinds++;
        }
        console.log(`Grind x${grinds}`);
        crystalThickness = transportAndWash(crystalThickness);
        return crystalThickness;
    }

    function etch(crystalThickness) {
        let etches = 0;
        while (crystalThickness - 2 >= targetThickness || crystalThickness - targetThickness === 1) {
            crystalThickness -= 2;
            etches++;
        }
        console.log(`Etch x${etches}`);
        crystalThickness = transportAndWash(crystalThickness);
        return crystalThickness;
    }

    function xray(crystalThickness) {
        console.log(`X-ray x1`);
        return crystalThickness+=1;
    }

    for (let i = 1; i < arr.length; i++) {
        crystalThickness = arr[i];
        console.log(`Processing chunk ${crystalThickness} microns`);
        if (crystalThickness / 4 >= targetThickness) {
            crystalThickness = cut(crystalThickness);
        }

        let lapCrystal = crystalThickness - crystalThickness * 0.2;
        if (lapCrystal >= targetThickness) {
            crystalThickness = lap(crystalThickness);
        }

        if (crystalThickness - 20 >= targetThickness) {
            crystalThickness = grind(crystalThickness);
        }

        if (crystalThickness - 2 >= targetThickness || crystalThickness -targetThickness === 1) {
            crystalThickness = etch(crystalThickness);
        }

        if(crystalThickness+1===targetThickness){
            crystalThickness=xray(crystalThickness);
        }
        console.log(`Finished crystal ${crystalThickness} microns`);
    }
}

// radioCrystals([1000,1001]);