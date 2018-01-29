function solution(target, string) {
    let count=0;
    let startInd=0;
    while(string.indexOf(target)>-1){
        if (string.indexOf(target)>-1) {
            startInd=string.indexOf(target);
            count++;
            string=string.substr(startInd+1);
        }
    }
    console.log(count);
}

solution('ma', 'Marine mammal training is the training and caring for marine life such as, dolphins, killer whales, sea lions, walruses, and other marine mammals. It is also a duty of the trainer to do mental and physical exercises to keep the animal healthy and happy.');