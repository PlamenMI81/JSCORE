function vat(arr) {
    let sum=0;
    for (var num of arr) {
        sum+=num;
    }
    let vat=sum*0.2;
    console.log(`sum = ${sum}`);
    console.log(`VAT = ${vat}`);
    console.log(`total = ${sum+vat}`);

}

vat([1.20, 2.60, 3.50]);