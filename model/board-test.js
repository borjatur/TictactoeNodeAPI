var board = require('./board');
var myboard = new board.Board();
console.log(myboard.horizontalWin('X'));
console.log(myboard.verticalWin('X'));
console.log(myboard.primaryDiagonalWin('X'));
console.log(myboard.secondaryDiagonalWin('X'));
