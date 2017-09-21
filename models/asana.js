const mongoose = require('mongoose');

const asanaSchema = mongoose.Schema({
		file_reference: String,
    pose_name: String,
    sanskrit_name: String,
    translation: Array,
    category: String,
    difficulty: String,
    description: Array,
    poseData: Object,
    benefits: String
  });


const Asana = mongoose.model('Asana', asanaSchema);

module.exports = Asana;