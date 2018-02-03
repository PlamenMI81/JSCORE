function solution(strArr) {
    let data = {};
    for (let i = 0; i < strArr.length; i++) {
        let [town, product, sales] = strArr[i].split(/\s+->\s+/g);
        sales = sales.split(/\s+:\s+/g).reduce((a, b) => a * b);
        if (data.hasOwnProperty(town)) {
            data[town][product]=sales;
        }
        else {
            data[town]={};
            data[town][product]=sales;
        }
    }

    for (let town in data) {
        console.log(`Town - ${town}`);
        for (let prod in data[town]) {
            console.log(`$$$${prod} : ${data[town][prod]}`);
        }
    }
}

solution([
    'Sofia -> Laptops HP -> 200 : 2000',
    'Sofia -> Raspberry -> 200000 : 1500',
    'Sofia -> Audi Q7 -> 200 : 100000',
    'Montana -> Portokals -> 200000 : 1',
    'Montana -> Qgodas -> 20000 : 0.2',
    'Montana -> Chereshas -> 1000 : 0.3'
]);

