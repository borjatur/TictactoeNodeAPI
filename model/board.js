var Board = function () {
  this._board = [[null,null,null],
                [null,null,null],
                [null,null,null]];
}

Board.prototype.isWinningMove = function(piece) {
  return (this.horizontalWin(piece)
          || this.verticalWin(piece)
          || this.diagonalWin(piece));
}

Board.prototype.horizontalWin = function(piece) {
  var win = false;
  for(var i = 0; i < this._board.length && !win; i++) {
    for(var j = 0; j < this._board.length; j++) {
      if(this._board[i][j] !== piece)
      break;
    }
    if (j === 3)
    win = true;
  }
  return win;
}

Board.prototype.verticalWin = function(piece) {
  var win = false;
  for(var i = 0; i < this._board.length && !win; i++) {
    for(var j = 0; j < this._board.length; j++) {
      if(this._board[j][i] !== piece)
      break;
    }
    if (j === 3)
    win = true;
  }
  return win;
}

Board.prototype.diagonalWin = function(piece) {
  return (this.primaryDiagonalWin(piece)
          || this.secondaryDiagonalWin(piece));
}

Board.prototype.primaryDiagonalWin = function(piece) {
  for(var i = 0; i < this._board.length; i++) {
    if(this._board[i][i] !== piece)
    break;
  }
  return (i === 3);
}

Board.prototype.secondaryDiagonalWin = function(piece) {
  for(var i = 2; i >= 0; i--) {
    if (this._board[Math.abs(i-2)][i] !== piece)
    break;
  }
  return (i === -1);
}

Board.prototype.pairValidation = function(initPosition, finalPosition) {
  return (initPosition.x-1 <= finalPosition.x
          && finalPosition.x <= initPosition.x+1
          && initPosition.y-1 <= finalPosition.y
          && finalPosition.y <= initPosition.y+1
          && this._board[finalPosition.x][finalPosition.y] === null);
  }

  Board.prototype.unpairValidation = function(initPosition, finalPosition) {
    var substract = {
      x : finalPosition.x - initPosition.x,
      y : finalPosition.y - initPosition.y
    };
    return ((substract.x + substract.y)% 2);
  }

  Board.prototype.isValidPosition = function(position) {
    return (position.x >= 0
            && position.x < 3
            && position.y >= 0
            && position.y < 3);
  }

  Board.prototype.isValidPieceToMove = function(position, piece) {
    return (this._board[position.x][position.y] === piece);
  }

  Board.prototype.isOccupiedPosition = function(position) {
    return (this._board[position.x][position.y] !== null);
  }

  Board.prototype.isMovementAllowed = function(initPosition, finalPosition) {
    var alloweb = false;
    switch ((initPosition.x + initPosition.y) % 2) {
      case 0:
        alloweb = this.pairValidation(initPosition, finalPosition);
      break;
      case 1:
        alloweb = this.unpairValidation(initPosition, finalPosition);
      break;
    }
    return alloweb;
  }

  Board.prototype.isValidMovement = function(piece, initPosition, finalPosition) {
    if (this.isValidPosition(initPosition) && this.isValidPosition(finalPosition)) {
      if (this.isValidPieceToMove(initPosition, piece)) {
        if (!this.isOccupiedPosition(finalPosition)) {
          if (this.isMovementAllowed(initPosition, finalPosition)) {
            return true;
          } else {
            throw `Invalid movement (${initPosition.x},${initPosition.y}) to (${finalPosition.x},${finalPosition.y}).`;
          }
        } else {
          throw 'Final position is occupied.';
        }
      } else {
        throw `This player can´t move ${this._board[initPosition.x][initPosition.y]} piece.`;
      }
    } else {
      throw 'Initial of final position is out of board range.';
    }
  }

  Board.prototype.putPiece = function(piece, position) {
    if (this.isValidPosition(position)) {
      if (!this.isOccupiedPosition(position)) {
        this._board[position.x][position.y] = piece;
      } else {
        throw `Position (${position.x},${position.y}) is occupied.`;
      }
    } else {
      throw `Position (${position.x},${position.y}) is out of board range.`;
    }
  }

  Board.prototype.movePiece = function(piece, initPosition, finalPosition) {
    if(this.isValidMovement(piece, initPosition, finalPosition)) {
      this._board[finalPosition.x][finalPosition.y] = this._board[initPosition.x][initPosition.y];
      this._board[initPosition.x][initPosition.y] = null;
    }
  }

  Board.prototype.countPieces = function(piece) {
    var count = 0;
    this._board.map(function(row) {
      row.map(function(cell) {
        if (cell === piece) {
          count++;
        }
      });
    });
    return count;
  }

  exports.Board = Board
