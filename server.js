var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var assignRouter = require('./routes/assignment');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));



// Routes
app.use('/', index);
app.use('/assign', assignRouter);

mongoose.connect('mongodb://localhost:27017/assignments');

var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log('Listening on port ', port);
})
