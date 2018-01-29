function solution(username, email, phone, straArr) {
    let userRx=/<![a-zA-Z]+!>/g;
    let emailRx=/<@[a-zA-Z]+@>/g;
    let phoneRx=/<\+[a-zA-Z]+\+>/g;

    for (let i = 0; i < straArr.length; i++) {
        straArr[i]=straArr[i].replace(userRx,username);
        straArr[i]=straArr[i].replace(emailRx,email);
        straArr[i]=straArr[i].replace(phoneRx,phone);
    }
    console.log(straArr.join('\n'));

}

solution(
    'Pesho',
    'pesho@softuni.bg',
    '90-60-90',
    [
        'Hello, <!username!>!',
        'Welcome to your Personal profile.',
        'Here you can modify your profile freely.',
        'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
        'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
        'Your current phone number is: <+number+>. Would you like to change that? (Y/N)'
    ]
);