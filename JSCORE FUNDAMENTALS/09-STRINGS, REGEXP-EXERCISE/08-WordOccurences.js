function solution(string, word) {
    // RegExp.escape = function(string) {
    //     return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // };

    let pattern = new RegExp('\\b' + word + '\\b', 'gi');
    let match = pattern.exec(string);
    let occur = 0;
    while (match !== null) {
        occur++;
        match = pattern.exec(string);
    }
    console.log(occur);
}

// solution(
//     'There was one. Therefore I bought it. I wouldn’t buy it otherwise.',
//     'there'
// );

solution(
    'How do you plan on achieving that? How? How can you even think of that?',
    'how'
);