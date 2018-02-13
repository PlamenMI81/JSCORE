function solution(strArr) {

    let townsArr=[];
    for (let i = 1; i < strArr.length; i++) {
        let currentTown=strArr[i].split(/\s*\|\s*/g).filter(s=>s.length!==0);
        let result={};
        result.Town=currentTown[0];
        result.Latitude=currentTown[1]*1;
        result.Longitude=currentTown[2]*1;
        townsArr.push(result);
    }
    console.log(JSON.stringify(townsArr));
}

solution([
    '| Town | Latitude | Longitude |',
    '| Sofia | 42.696552 | 23.32601 |',
    '| Beijing | 39.913818 | 116.363625 |']
);