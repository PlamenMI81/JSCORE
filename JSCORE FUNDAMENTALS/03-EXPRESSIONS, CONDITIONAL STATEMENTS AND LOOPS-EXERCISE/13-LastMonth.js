function lastMonth(arr) {
    [day,month, year]=arr;
    let date=new Date(year,month-1,0).getDate();
    console.log(date);
}
lastMonth([13, 12, 2004]);