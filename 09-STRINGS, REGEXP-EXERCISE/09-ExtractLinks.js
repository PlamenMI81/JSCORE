function solution(strArr) {
    let rx = /www\.[a-zA-Z0-9-]+(\.[a-z]+)+/g;
    for (let i = 0; i < strArr.length; i++) {
        let match = strArr[i].match(rx);
        if (match!==null)
            console.log(match.join('\n'));
    }
}

solution([
    'Need information about cheap hotels in London?',
    'You can check us at www.london-hotels.co.uk!',
    'We provide the best services in London.',
    'Here are some reviews in some blogs:',
    '"London Hotels are awesome!" - www.indigo.bloggers.com',
    '"I am very satisfied with their services" - ww.ivan.bg',
    '"Best Hotel Services!" - www.rebel21.sedecrem.moc, Best Hotel Services!" - www.rebel21.sedecrem.bg',
]);