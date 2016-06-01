var mongoClient = require('mongodb').MongoClient;

var DATABASE_URL = "mongodb://localhost:27017/arduino_batteries"
var client;

this.init = function(data, collection, callback){
	mongoClient.connect(DATABASE_URL, function(err, db){
		client = db;
	});
}

this.insert = function(data, collection, callback){
	if(!client) {
		console.log("Database not initialized!");
		return null;
	}
	
	client.collection(collection).insertOne(data, function(err, result){
		if(err)
			console.log(err);

		if(callback)
			callback(err, result);
	});
}

this.find = function(query, collection, callback){
	if(!client) {
		console.log("Database not initialized!");
		return null;
	}
	
	var entries = [];
	var cursor = client.collection(collection).find(query);

	cursor.each(function(err, doc){
		if(err)
			console.log(err);

		if(doc != null)
			entries.push(doc);
		else if(callback)
			callback(entries);
	});
}