const mongoose = require('mongoose');

const asanaSchema = mongoose.Schema({
	sanskrit_name: String,
	img: String,
	category: String
});

const Asana = mongoose.model('Asana', asanaSchema);

module.exports = Asana;