function solve(strArr) {
    let register = {};
    for (let i = 0; i < strArr.length; i++) {
        let [system, component, subComp] = strArr[i].split(/\s+\|\s+/g);
        if (!register.hasOwnProperty(system)) {
            register[system] = {};
        }
        if (!register[system].hasOwnProperty(component)) {
            register[system][component] = [];

        }
        register[system][component].push(subComp);

    }

    let sortSys = [...Object.keys(register)].sort(function (a, b) {
        let aLen=Object.keys(register[a]).length;
        let bLen=Object.keys(register[b]).length;
        let firstCrit=bLen-aLen;

        if (firstCrit !==0) {
            return firstCrit;
        }
        else {
            return a.localeCompare(b);
        }
    });


    for (let sys of sortSys) {
        console.log(`${sys}`);
        for (let comp in register[sys]) {
            console.log(`|||${comp}`);
            for (let sub of register[sys][comp]) {
                console.log(`||||||${sub}`);
            }
        }
    }


}

solve([
    'SULS | Main Site | Home Page',
    'SULS | Main Site | Login Page',
    'SULS | Main Site | Register Page',
    'SULS | Judge Site | Login Page',
    'SULS | Judge Site | Submittion Page',
    'Lambda | CoreA | A23',
    'SULS | Digital Site | Login Page',
    'Lambda | CoreB | B24',
    'Lambda | CoreA | A24',
    'Lambda | CoreA | A25',
    'Lambda | CoreC | C4',
    'Indice | Session | Default Storage',
    'Indice | Session | Default Security'
]);