var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;
var logger = require(path.join(__dirname, '/src/logger.js'));

var last_sent_mail_day = 0;

var DATABASE_URL = "mongodb://localhost:27017/attendanceCheck"
var ALLOWED_TIME_DIFFERENCE = 5 * 60 * 1000;
var SECRET = "3c07930771df82c1d4b90300bb11fd8e9842fcab9b4c0ffd03ab1b81591f700e";

app.use(express.static(path.join(__dirname, '/public')));

//Return index.html
app.get('/', function(req, res){
	logger.info(req.query);
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use(bodyParser.urlencoded());

app.post('/', function(request, response){
	console.log(request.body);
	response.end("200");
});

//Run server
var server = app.listen(8080, function(){
	var port = server.address().port;
	logger.info('Server listening at port ' + port);
});