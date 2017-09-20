const mongoose = require('mongoose');
const Sequence = require('./sequence.js');

const userSchema = mongoose.Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	special: String,
	sequences: [Sequence.schema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

