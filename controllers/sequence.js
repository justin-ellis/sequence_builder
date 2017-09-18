const express = require('express');
const Sequence = require('../models/sequence.js');
const User = require('../models/user.js');
const router = express.Router();

router.get('/', (req, res)=>{
	Sequence.find({}, (err, foundSequences)=>{
		res.json(foundSequences);
	});
});

router.post('/', (req, res)=>{
	Sequence.create(req.body, (err, createdSequence)=>{
		User.findById(req.body.userId, (err, foundUser)=>{
			foundUser.sequences.push(createdSequence);
			foundUser.save((err, data)=>{
			});
		});
	});
});

router.get('/:id', (req, res)=>{
	Sequence.findById(req.params.id, (err, foundSequence)=>{
		User.findOne({'posts._id': req.params.id}, (err, foundUser)=>{
		res.json(foundSequence);
		});
	});
});

module.exports = router;