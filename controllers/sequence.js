const express = require('express');
const Sequence = require('../models/sequence.js');
const User = require('../models/user.js');
const router = express.Router();

router.get('/', (req, res)=>{
	Sequence.find({}, (err, foundSequences)=>{
		res.json(foundSequences);
	});
});

module.exports = router;