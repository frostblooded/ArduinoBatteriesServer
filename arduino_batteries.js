var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var logger = require(path.join(__dirname, '/src/logger.js'));
var database_handler = require(path.join(__dirname, '/src/database_handler.js'));

app.use(express.static(path.join(__dirname, '/public')));

//Return index.html
app.get('/', function(req, res){
	logger.info(req.query);
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.use(bodyParser.urlencoded());

app.post('/data', function(request, response){
	console.log(request.body);
	database_handler.insert({current: request.body.current,
							 voltage: request.body.voltage,
							 battery_id: request.body.battery_id,
							 time: new Date()}, 'log', function(err, result) {
		if(!err)
			response.end(err);
		else
			response.end("Success!");
	});
});

app.get('/data', function(request, response){
	database_handler.find({}, 'log', function(data) {
		response.end(JSON.stringify(data));
	});
});

//Run server
var server = app.listen(8080, function(){
	database_handler.init();
	var port = server.address().port;
	logger.info('Server listening at port ' + port);
});