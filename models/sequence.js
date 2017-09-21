const mongoose = require('mongoose');
const Asana = require('./asana.js');

const sequenceSchema = mongoose.Schema({
	name: String,
	difficulty: String,
	author: String,
	poses: [Asana.schema], 
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
