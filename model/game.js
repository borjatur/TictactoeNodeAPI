var board = require('./board');

var Game = function(id, player1) {
  this._id = id;
  this._player1 = player1;
  this._player2 = null;
  this._board = new board.Board();
  this._turn = 1;
  this._active = false;
  this._winner = false;
}

Game.prototype.setSecondPlayer = function(player) {
  if (this._player1 !== player) {
    this._player2 = player;
    this._active = true;
    return this._id;
  } else {
    throw `${player} already exists in this game.`;
  }
}

Game.prototype.isGameActive = function() {
  return this._active;
}

Game.prototype.getId = function() {
  return this._id;
}

Game.prototype.getPieceOfPlayer = function(player) {
  var piece;
  switch (player) {
    case this._player1:
      piece = 'O';
      break;
    case this._player2:
      piece = 'X';
      break;
    default:
      throw `Player ${player} doesn't exists in this game`;
  }
  return piece;
}

Game.prototype.getNumberOfPiecesOfPlayer = function(player) {
  var piece = this.getPieceOfPlayer(player);
  return this._board.countPieces(piece);
}

Game.prototype.playerToPlay = function() {
  var player;
  switch(this._turn % 2) {
    case 0: player = this._player2;
    break;
    case 1: player = this._player1;
    break;
  }
  return player;
}

Game.prototype.nextTurn = function() {
  this._turn++;
}

Game.prototype.getNextPieceToMove = function() {
  var piece;
  switch(this._turn % 2) {
    case 0: piece = 'X';
    break;
    case 1: piece = 'O';
    break;
  }
  return piece;
}

Game.prototype.putPiece = function(player, position) {
  if (this._turn < 7) {
    if (player === this.playerToPlay()) {
      var piece = this.getNextPieceToMove();
      this._board.putPiece(piece, position);
      if (this._board.isWinningMove(piece)) {
        this._winner = true;
      } else {
        this.nextTurn();
      }
    } else {
      throw `It´s not the ${player}'s player turn.`;
    }
  } else {
    throw 'Player´s can´t put more pieces in the board it´s turn to move';
  }
}

Game.prototype.movePiece = function(player, initPosition, finalPosition) {
  if (this._turn > 6) {
    if (player === this.playerToPlay()) {
      var piece = this.getNextPieceToMove();
      this._board.movePiece(piece, initPosition, finalPosition);
      if(this._board.isWinningMove(piece)) {
        this._winner = true;
      } else {
          this.nextTurn();
      }
    } else {
      throw `It´s not the player ${player} turn.`;
    }
  } else {
    throw 'Players can´t move pieces yet';
  }
}

Game.prototype.print = function () {
  console.log(JSON.stringify(this));
}

exports.Game = Game
