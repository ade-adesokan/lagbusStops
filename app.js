
var express = require('express');
var app = express();
var router = require('./routes/index');

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

app.set('port', (process.env.PORT || 3000));


app.use('/api', router);

app.get('/', function(request, response) {
 response.redirect('/api');
});

app.listen(app.get('port'), function() {
 console.log("Node app is running at localhost:" + app.get('port'));
});






















