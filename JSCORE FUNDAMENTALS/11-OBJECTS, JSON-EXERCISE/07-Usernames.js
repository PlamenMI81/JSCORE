function solve(strArr) {
    let catalogueSet=new Set();
    for (let str of strArr) {
        catalogueSet.add(str);
    }
    let orderedCatalogue=[...(catalogueSet)].sort(function (a, b) {
        let aLen=a.length;
        let bLen=b.length;
        let firstCrit=aLen-bLen;

        if (firstCrit !==0) {
            return firstCrit;
        }
        else {
            return a.localeCompare(b);
        }
    });
    orderedCatalogue.forEach(w=>console.log(w));

}

solve([
    'Denise',
    'Ignatius',
    'Iris',
    'Isacc',
    'Indie',
    'Dean',
    'Donatello',
    'Enfuego',
    'Benjamin',
    'Biser',
    'Bounty',
    'Renard',
    'Rot'
]);