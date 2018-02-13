function solve(strArr) {
    let inventory={};
    for (let i = 0; i < strArr.length; i++) {
        let [name, price]=strArr[i].split(' : ');
        inventory[name]=+price;
    }
    let sortedKeys=[...Object.keys(inventory)].sort((a,b)=>a.toLowerCase().localeCompare(b.toLowerCase()));
    let firstLetters=new Set();
    for (let art of sortedKeys) {
        firstLetters.add(art[0].toUpperCase());
    }
    for (let letter of firstLetters) {
        console.log(`${letter}`);
        for (let art of sortedKeys) {
            if (art[0] === letter) {
                console.log(` ${art}: ${inventory[art]}`);
            }
        }
    }
}

solve([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);