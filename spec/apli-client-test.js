module.exports = {
var http = require('http');

var options = {
  host: 'http://localhost',
  path: '/game',
  port: '3000',
  method: 'POST',
  headers: {  'Content-Type': 'application/json'}
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
//This is the data we are posting, it needs to be a string or a buffer
req.write("hello world!");
req.end();
};
