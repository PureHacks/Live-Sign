var ml = {};

ml.updateData = function(selector, nosql, callback) {
	mongodb = require("mongodb");
	mongodb.MongoClient.connect(ml.uri, {
		server: {
			auto_reconnect: true
		}
	}, function(err, db) {
		db.collection(nosql.collection, function(err, db) {
			db.update(selector, {
				$set: nosql.document
			}, {
				upsert: false,
				w: 1
			}, callback);
		});
	});
};

ml.updateDataArray = function(selector, nosql, callback) {
	mongodb = require("mongodb");
	mongodb.MongoClient.connect(ml.uri, {
		server: {
			auto_reconnect: true
		}
	}, function(err, db) {
		db.collection(nosql.collection, function(err, db) {
			db.update(selector, {
				$addToSet: nosql.document
			}, {
				upsert: false,
				w: 1
			}, callback);
		});
	});
};

ml.insertData = function(nosql, callback) {
	mongodb = require("mongodb");
	mongodb.MongoClient.connect(ml.uri, {
		server: {
			auto_reconnect: true
		}
	}, function(err, db) {
		var collection = new mongodb.Collection(db, nosql.collection);

		collection.insert(nosql.document, {
			safe: true
		}, callback);
	});
};

ml.getData = function(nosql, callback) {

	var	selector = nosql.selector || {},
		fields = nosql.fields || {};

	mongodb = require("mongodb");
	mongodb.MongoClient.connect(ml.uri, {
		server: {
			auto_reconnect: true
		}
	}, function(err, db) {
		if (err) return callback(err);

		db.collection(nosql.collection, function(err, collection) {
			if (err) return callback(err);
			collection.find(selector, fields).toArray(callback);
		});
	});
};

ml.getDataFiltered = function(nosql, callback) {

	mongodb = require("mongodb");
	mongodb.MongoClient.connect(ml.uri, {
		server: {
			auto_reconnect: true
		}
	}, function(err, db) {
		if (err) return callback(err);

		db.collection(nosql.collection, function(err, collection) {
			if (err) return callback(err);
			//collection.find(selector, fields).sort({"created_at": -1 }).toArray(callback);
			collection.find({}, {"sort" : [['created_at', 'descending']]} ).toArray(callback);
		});
	});
};

ml.deleteData = function(nosql, callback) {
	var selector = nosql.selector || {},
		fields = nosql.fields || {};
	mongodb = require("mongodb");
	mongodb.MongoClient.connect(ml.uri, {
		server: {
			auto_reconnect: true
		}
	}, function(err, db) {
		
		if (err) return callback(err);

		db.collection(nosql.collection, function(err, collection) {
			if (err) return callback(err);
			collection.remove(selector, function(error, results){
				console.log("deleted:", selector._id, nosql.collection);
				callback(error);	
			});
		});
	});

}

module.exports = ml;