function occurence(str, ch) {
    let count=0;
    for (var char of str) {
        if (char===ch){
            count++;
        }
    }
    console.log(count);
}

occurence('hello', 'l');