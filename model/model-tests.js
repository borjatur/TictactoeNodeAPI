var games = require('./games');

var id = games.play('Borja');
console.log(id);
var game = games.searchGame(id);
if(game)
  game.print();
else
  console.log(`Game with id ${id} not found`);
id = games.play('Edu');
console.log(id);
games.searchGame(id).print();
games.putPiece(id,'Borja',{x:1,y:1});
games.searchGame(id).print();
games.putPiece(id,'Edu',{x:0,y:0});
games.searchGame(id).print();
games.putPiece(id,'Borja',{x:1,y:0});
games.searchGame(id).print();
games.putPiece(id,'Edu',{x:1,y:2});
games.searchGame(id).print();
games.putPiece(id,'Borja',{x:0,y:2});
games.searchGame(id).print();
games.putPiece(id,'Edu',{x:2,y:0});
games.searchGame(id).print();

console.log('Pieces of Borja');
var num = games.searchGame(id).getNumberOfPiecesOfPlayer('Borja');
console.log(num);


console.log('Begin movements');
console.log('******************************');
try {
  games.movePiece(id,'Borja',{x:0,y:2},{x:0,y:1});
} catch (e) {
  console.log(e);
}
games.searchGame(id).print();
// games.searchGame(id).print();
// try {
//   games.movePiece(id,'Edu',{x:1,y:0},{x:0,y:1});
// } catch (e) {
//   console.log(e);
// }
// games.searchGame(id).print();
