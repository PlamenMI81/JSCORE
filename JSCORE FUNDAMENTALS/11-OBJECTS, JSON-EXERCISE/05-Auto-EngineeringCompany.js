function solve(strArr) {
    let register={};
    for (let i = 0; i < strArr.length; i++) {
        let [brand, model, producedCars]=strArr[i].split(/\s+\|\s+/g);
        producedCars=+producedCars;
        if (!register.hasOwnProperty(brand)) {
            register[brand]={};
        }
        if (!register[brand].hasOwnProperty(model)){
            register[brand][model]=producedCars;
        }else{
            register[brand][model]+=producedCars;
        }
    }

    for (let brand in register) {
        console.log(`${brand}`);
        for (let model in register[brand]) {
            console.log(`###${model} -> ${register[brand][model]}`);
        }
    }
}

solve([
    'Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10'
]);