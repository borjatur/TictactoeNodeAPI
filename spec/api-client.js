var request = require('request');
var baseUrl = 'http://localhost:3000';

module.exports = {
  postGame : function(playerName, callback) {
    var options = {
      url : baseUrl+'/game/play',
      body : JSON.stringify({name : playerName}),
      headers : {
        'Content-Type': 'application/json'
      }
    };
    request.post(options, function (err, response, body) {
      if (err) {
        callback(err);
      } else if (response.statusCode !== 201) {
        callback(body);
      } else {
        bodyJson = JSON.parse(body);
        callback(null, bodyJson);
      }
    });
  },

  putPiece : function(gameIdent, playerName, position, callback) {
    var dataRequest = {
      gameId : gameIdent,
      name : playerName,
      position : position
    };
    var options = {
      url : baseUrl+'/game/put-piece',
      body : JSON.stringify(dataRequest),
      headers : {
        'Content-Type': 'application/json'
      }
    };
    request.post(options, function(err, response, body) {
      if (err) {
        callback(err);
      } else if (response.statusCode !== 201) {
        callback(body);
      } else {
        bodyJson = JSON.parse(body);
        callback(null, bodyJson);
      }
    });
  },

  movePiece : function(gameIdent, playerName, initialPosition, finalPosition ,callback) {
    var dataRequest = {
      gameId : gameIdent,
      name : playerName,
      initialPosition : initialPosition,
      finalPosition : finalPosition
    };
    var options = {
      url : baseUrl+'/game/move-piece',
      body : JSON.stringify(dataRequest),
      headers : {
        'Content-Type': 'application/json'
      }
    };
    request.post(options, function(err, response, body) {
      if (err) {
        callback(err);
      } else if (response.statusCode !== 201) {
        callback(body);
      } else {
        bodyJson = JSON.parse(body);
        callback(null, bodyJson);
      }
    });
  },

  getNumberOfPiecesOfPlayer : function(gameId, playerName, callback) {
    var requestUrl = baseUrl+`/game/${gameId}/number-of-pieces/${playerName}`;
    request.get(requestUrl, function(err, response, body) {
      if (err) {
        callback(err);
      } else if (response.statusCode !== 200) {
        callback(body);
      } else {
        bodyJson = JSON.parse(body);
        callback(null, bodyJson);
      }
    });
  },
};
