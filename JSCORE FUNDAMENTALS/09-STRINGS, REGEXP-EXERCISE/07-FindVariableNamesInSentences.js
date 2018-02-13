function solution(str) {
    let rx=/\b[_][a-zA-Z0-9]+\b/g;
    let result=str.match(rx).map(w=>w.substr(1)).join(',');
    console.log(result);
}
// solution('__invalidVariable _evenMoreInvalidVariable_ _validVariable');

solution('Calculate the _area of the _perfectRectangle object.');