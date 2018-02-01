function solution(strArr) {
    let rxName = /\*[A-Z]([A-Za-z]+)*(?=( |\t|$))/;
    let rxPhone = /\+[0-9-]{10}(?=( |\t|$))/;
    let rxId = /![a-zA-Z0-9]+(?=( |\t|$))/;
    let rxSecretBase = /_[a-zA-Z0-9]+(?=( |\t|$))/;

    for (let i = 0; i < strArr.length; i++) {

        let currentStr = strArr[i];

        let matchName = rxName.exec(currentStr);
        let matchPhone = rxPhone.exec(currentStr);
        let matchId = rxId.exec(currentStr);
        let matchSecretBase = rxSecretBase.exec(currentStr);

        if (matchName !== null) {
            while (matchName) {
                currentStr = currentStr.replace(rxName, '|'.repeat(matchName[0].length));
                matchName = rxName.exec(currentStr);
            }
        }
        if (matchPhone !== null) {
            while (matchPhone) {
                currentStr = currentStr.replace(rxPhone, '|'.repeat(matchPhone[0].length));
                matchPhone = rxPhone.exec(currentStr);
            }
        }
        if (matchId !== null) {
            while (matchId) {
                currentStr = currentStr.replace(rxId, '|'.repeat(matchId[0].length));
                matchId = rxId.exec(currentStr);
            }
        }
        if (matchSecretBase !== null) {
            while (matchSecretBase) {
                currentStr = currentStr.replace(rxSecretBase, '|'.repeat(matchSecretBase[0].length));
                matchSecretBase = rxSecretBase.exec(currentStr);
            }
        }

        console.log(currentStr);
    }
}

// solution(
//     [   'Agent *Ivankov- was in the room when *Ivankov it all happened.',
//         'Agent *Ivankov was in the room when *Ivankov it all happened.',
//         'The person in the room was heavily armed.',
//         'Agent *Ivankov had to act quick in order.',
//         'He picked up his phone and called some unknown number. ',
//         'I think it was +555-49-796 ',
//         'I can\'t really remember...',
//         'He said something about "finishing work" with subject !2491a23BVB34Q and returning to Base _Aurora21',
//         'Then after that he disappeared from my sight.',
//         'As if he vanished in the shadows.',
//         'A moment, shorter than a second, later, I saw the person flying off the top floor.',
//         'I really don\'t know what happened there.',
//         'This is all I saw, that night.',
//         'I cannot explain it myself...'
//     ]
// );

solution([
    '_secretbases are very !cool and !collected',
    'and can also be made of_01230 _whyGlued_butShouldntBeGlued together',
    '(_SecretBase) or (_SecretBase   ) or (_SikretBase ) or (_SacredBase',
    '23258_base1 and _ and ___ or ~_~ or @@%#_OPbase',
    '_ALLYOURBASEAREBELONGTOUS   _DOESIT',
    '_Wrong/ haha \\_maybe'
]);

