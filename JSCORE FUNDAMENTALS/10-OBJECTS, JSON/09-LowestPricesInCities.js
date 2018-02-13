function solution(strArr) {
    let data = {};
    for (let i = 0; i < strArr.length; i++) {
        let [town, product, price] = strArr[i].split(/\s+\|\s+/g);

        if (!data.hasOwnProperty(product)) {
            data[product] = {};
            data[product][town]=+price;
        } else {
            data[product][town]=+price;
        }
    }

    for (let prod in data) {
        let minPrice = Number.MAX_VALUE;
        let mTown = 0;
        for (let town in data[prod]) {
            if (data[prod][town] < minPrice) {
                minPrice = data[prod][town];
                mTown=town;
            }
        }
        console.log(`${prod} -> ${minPrice} (${mTown})`);
    }
}

solution([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'
]);

//