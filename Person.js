var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myDatabaseRbvs');

var Schema  = mongoose.Schema;

var personSchema = new Schema({
	name: {type: String, required: true, unique: true},
	age: Number
});

module.exports = mongoose.model('Person', personSchema);