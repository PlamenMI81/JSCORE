function wordsUppercase(string) {
    let upper = string.split(/[\s,\W]+/)
        .filter(a=>a!=="")
        .map(a=>a.toUpperCase())
        .join(", ");
    return upper;

}

console.log(wordsUppercase("Hi, how are you?"));;