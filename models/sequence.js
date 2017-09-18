const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
	poses: Array, 
	difficulty: 'String',
	author: 'String'
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

module.exports = Sequence;
