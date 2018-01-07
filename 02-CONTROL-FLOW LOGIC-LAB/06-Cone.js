function cone(radius, height) {
    let volume=(Math.PI*(radius**2)*height)/3;
    console.log('volume = '+volume);
    let hypotenuse = Math.sqrt(radius ** 2 + height ** 2);
    let area=Math.PI*radius**2+Math.PI*radius*hypotenuse;
    console.log('area = '+area);

}

cone(3,5);