function quadraticEquation(a, b, c) {
    let discriminant = (b**2) - (4 * a * c);
    let x,x1,x2=0;
    if (discriminant>0){
        x1 = (-b + Math.sqrt(discriminant)) / (2*a);
        x2 = (-b - Math.sqrt(discriminant)) / (2*a);
        return `${Math.min(x1,x2)}\n${Math.max(x1,x2)}`;
    }else if(discriminant===0){
        x = -b / (2*a);
        return x;
    }
    return"No";
}

// console.log(quadraticEquation(6, 11, -35));
// console.log(quadraticEquation(1, -12, 36));
console.log(quadraticEquation(5, 2, 1));