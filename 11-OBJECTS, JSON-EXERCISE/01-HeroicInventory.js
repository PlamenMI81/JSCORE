function solution(strArr) {
    let resultArr = [];
    for (let i = 0; i < strArr.length; i++) {
        let [heroName, heroLevel, items] = strArr[i].split(/\s+\/\s+/g);
        heroLevel = +heroLevel;
        let registerHeroes = {};
        registerHeroes['name'] = heroName;
        registerHeroes['level'] = heroLevel;
        if (items) {
            items = items.split(/,\s+/g);
            registerHeroes['items'] = items;
        } else {
            registerHeroes['items'] = [];
        }


        resultArr.push((registerHeroes));
    }
    console.log(JSON.stringify(resultArr));
}

solution([
    'Isacc / 25 ',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
]);