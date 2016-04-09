var app = require('express')();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.use(jsonParser);

//launch routes
require('./routes/api.js')(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
