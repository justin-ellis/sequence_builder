const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
	username: String,
	password: String,
		sequences: []
});

const User = mongoose.model('User', userSchema);

module.exports = User;

