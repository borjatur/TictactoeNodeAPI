var games = require('../model/games');

module.exports = function(app) {

  app.post('/game/play', function(req, res) {
    console.log(JSON.stringify(req.body));
    var player = req.body.name;
    if (player) {
      try {
        var gameId = games.play(player);
        res.status(201).send({"gameId" : gameId});
      } catch(error) {
        res.status(409).send(error);
      }
    } else {
      res.status(400).send('You have to send the name of the user to play');
    }
  });

  app.post('/game/put-piece', function (req, res) {
    console.log(JSON.stringify(req.body));
    var player = req.body.name;
    var gameId = req.body.gameId;
    var position = req.body.position;
    if (player && gameId && position) {
      try {
        games.putPiece(gameId, player, position);
        var game = games.searchGame(gameId);
        res.status(201).send(JSON.stringify(game));
      } catch(error) {
        res.status(409).send(error);
      }
    } else {
      res.status(400).send('You have to send name of the player, gameId and position to put piece.');
    }
  });

  app.post('/game/move-piece', function (req, res) {
    console.log(JSON.stringify(req.body));
    var player = req.body.name;
    var gameId = req.body.gameId;
    var initialPosition = req.body.initialPosition;
    var finalPosition = req.body.finalPosition;
    console.log(initialPosition);
    if (player && gameId && initialPosition && finalPosition) {
      try {
        games.movePiece(gameId, player, initialPosition, finalPosition);
        var game = games.searchGame(gameId);
        res.status(201).send(JSON.stringify(game));
      } catch(error) {
        res.status(409).send(error);
      }
    } else {
      res.status(400).send('You have to send name of the player, gameId, initialPosition and finalPosition to move.');
    }
  });

  app.get('/game/:id', function (req, res) {
    var gameId = req.params.id;
    if (gameId) {
      var game = games.searchGame(gameId);
      if (game) {
        res.status(200).send(JSON.stringify(game));
      } else {
        res.status(404).send('Game not found.');
      }
    } else {
      res.status(400).send('You have to send the game id to view the board');
    }
  });

  app.get('/game/:id/number-of-pieces/:player', function (req, res) {
    var gameId = req.params.id;
    var player = req.params.player;
    if (gameId && player) {
      var game = games.searchGame(gameId);
      if (game) {
        try {
          var numberOfPieces = game.getNumberOfPiecesOfPlayer(player);
          res.status(200).send(`${numberOfPieces}`);
        } catch(error) {
          res.status(409).send(error);
        }
      } else {
        res.status(404).send('Game not found.');
      }
    } else {
      res.status(400).send('You have to send the game id and the player name.');
    }
  });
}
