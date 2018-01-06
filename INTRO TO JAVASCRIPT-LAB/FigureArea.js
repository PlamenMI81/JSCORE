function figArea(w, h, W, H) {
    let firstFigArea = w * h;
    let secondFigArea = W * H;
    let overlapArea =  Math.min(w, W) * Math.min(h, H);
    let totalArea=firstFigArea+secondFigArea-overlapArea;
    console.log(totalArea);
}

figArea(13, 2, 5, 8);