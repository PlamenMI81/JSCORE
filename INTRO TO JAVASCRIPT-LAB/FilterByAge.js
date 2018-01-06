function filterbyage(minAge, firsName, firstAge, secondName, secondAge) {
    let firstPerson={name:firsName, age:firstAge};
    let secPerson={name:secondName,age:secondAge};
    if (firstPerson.age>=minAge)
        console.log(firstPerson);
    if (secPerson.age>=minAge)
        console.log(secPerson);
}

filterbyage(12, 'Ivan', 15, 'Asen', 9);