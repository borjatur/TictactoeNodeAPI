var apiClient = require('./api-client');
var game = require('../model/game');

describe('POST /game/play', function () {
  it('waits for the second player to join', function (done) {
    apiClient.postGame("borja", function(err, borjaGameId) {
      expect(err).toBeFalsy();
      expect(borjaGameId).toBeDefined();
      apiClient.postGame("edu", function(err, eduGameId) {
        expect(borjaGameId).toEqual(eduGameId);
        done();
      });
    });
  });
});

describe('POST /game/put-piece', function () {
  it('fail when it`s not the player`s turn.', function(done) {
    apiClient.postGame("borja", function(err, borjaGameId) {
      expect(err).toBeFalsy();
      expect(borjaGameId).toBeDefined();
      apiClient.postGame("edu", function(err, eduGameId) {
        expect(borjaGameId).toEqual(eduGameId);
        apiClient.putPiece(eduGameId.gameId, "borja", {x : 1, y : 1}, function(err, game) {
          expect(err).toBeFalsy();
          expect(game).toBeDefined();
          apiClient.putPiece(eduGameId.gameId, "borja", {x : 0, y : 0}, function(err, game) {
            expect(game).toBeFalsy();
            expect(err).toBeDefined();
          });
          done();
        });
      });
    });
  });

  it('check number of pieces of player after put one in the board.', function(done) {
    apiClient.postGame("player1", function(err, borjaGameId) {
      expect(err).toBeFalsy();
      expect(borjaGameId).toBeDefined();
      apiClient.postGame("player2", function(err, eduGameId) {
        expect(borjaGameId).toEqual(eduGameId);
        apiClient.putPiece(borjaGameId.gameId, "player1", {x : 1, y : 1}, function(err, myGame) {
          expect(err).toBeFalsy();
          expect(myGame).toBeDefined();
          apiClient.getNumberOfPiecesOfPlayer(myGame._id, "player1", function(err, number) {
            expect(err).toBeFalsy();
            expect(number).toEqual(1);
          });
          done();
        });
      });
    });
  });

  it('check winning condition when a player put three pieces in line.', function(done) {
    apiClient.postGame("player1", function(err, player1Id) {
      expect(err).toBeFalsy();
      expect(player1Id).toBeDefined();
      apiClient.postGame("player2", function(err, player2Id) {
        expect(player1Id).toEqual(player2Id);
        apiClient.putPiece(player1Id.gameId, "player1", {x : 0, y : 0}, function(err, myGame) {
          apiClient.putPiece(player2Id.gameId, "player2", {x : 0, y : 1}, function(err, myGame) {
            apiClient.putPiece(player1Id.gameId, "player1", {x : 1, y : 1}, function(err, myGame) {
              apiClient.putPiece(player2Id.gameId, "player2", {x : 0, y : 2}, function(err, myGame) {
                apiClient.putPiece(player1Id.gameId, "player1", {x : 2, y : 2}, function(err, myGame) {
                  expect(err).toBeFalsy();
                  expect(myGame).toBeDefined();
                  expect(myGame._winner).toBeTruthy();
                });
                done();
              });
            });
          });
        });
      });
    });
  });
});

describe('POST /game/move-piece', function () {
  it('check if a player can move pieces after put three pieces in the board and then win the game.', function(done) {
    apiClient.postGame("player1", function(err, player1Id) {
      apiClient.postGame("player2", function(err, player2Id) {
        apiClient.putPiece(player1Id.gameId, "player1", {x : 0, y : 0}, function(err, myGame) {
          apiClient.putPiece(player2Id.gameId, "player2", {x : 0, y : 1}, function(err, myGame) {
            apiClient.putPiece(player1Id.gameId, "player1", {x : 1, y : 1}, function(err, myGame) {
              apiClient.putPiece(player2Id.gameId, "player2", {x : 0, y : 2}, function(err, myGame) {
                apiClient.putPiece(player1Id.gameId, "player1", {x : 2, y : 1}, function(err, myGame) {
                  apiClient.putPiece(player2Id.gameId, "player2", {x : 1, y : 2}, function(err, myGame) {
                    apiClient.movePiece(player1Id.gameId, "player1", {x : 2, y : 1}, {x : 1, y : 0}, function(err, myGame) {
                      expect(err).toBeFalsy();
                      expect(myGame).toBeDefined();
                      expect(myGame._board._board).toEqual([['O','X','X'],['O',null,'X'],['O',null,null]]);
                      expect(myGame._winner).toBeTruthy();
                    });
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
