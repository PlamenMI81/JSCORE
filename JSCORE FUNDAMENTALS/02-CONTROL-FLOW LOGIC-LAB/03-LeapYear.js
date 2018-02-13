function leapYear(year) {
    if (year %4!=0)
        console.log('no');
    else if (year %100 !=0)
        console.log('yes');
    else if (year %400 !=0)
        console.log('no');
    else console.log('yes');
}

leapYear(2018);