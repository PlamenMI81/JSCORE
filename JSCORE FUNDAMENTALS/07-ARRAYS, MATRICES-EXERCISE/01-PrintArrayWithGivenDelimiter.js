function printArrayWithGivenDelimiter(strArr) {
    let delimiter=strArr[strArr.length-1];
    strArr.pop();
    console.log(strArr.join(delimiter));

}

printArrayWithGivenDelimiter([
"One",
"Two",
"Three",
"Four",
"Five",
"-"
]);

printArrayWithGivenDelimiter([
"How about no?",
"I",
"will",
"not",
"do",
"it!",
"_",

]);