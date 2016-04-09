var game = require('./game');

var games = [];

function play(player) {
  var gameId;
  if (games.length) {
    var game = games[games.length-1];
    if (game.isGameActive()) {
      gameId = newGame(player);
    } else {
      gameId = joinGame(player);
    }
  } else {
    gameId = newGame(player);
  }
  return gameId;
}

function getLastId() {
  return (games.length > 0 ? games[games.length-1].getId() : undefined);
}

function newGame(player) {
  games[games.length] = new game.Game(generatePseudoRandomId(),player);
  return (getLastId());
}

function joinGame(player) {
  return games[games.length-1].setSecondPlayer(player);
}

function searchGame(gameId) {
  var index = 0;
  var find = false;
  while (index < games.length && !find) {
    games[index].getId() === gameId ? find = true : index++;
  }
  if (find) {
    return games[index];
  } else {
    return false;
  }
}

function putPiece(gameId, player, position) {
  var game = searchGame(gameId);
  if (game) {
    game.putPiece(player, position);
  } else {
    throw 'Game not found';
  }
}

function movePiece(gameId, player, initPosition, finalPosition) {
  var game = searchGame(gameId);
  if (game) {
    game.movePiece(player, initPosition, finalPosition);
  } else {
    throw 'Game not found';
  }
}

function generatePseudoRandomId() {
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

exports.play = play
exports.searchGame = searchGame
exports.putPiece = putPiece
exports.movePiece = movePiece
