const express = require('express');
const Sequence = require('../models/sequence.js');
const User = require('../models/user.js');
const router = express.Router();

router.get('/', (req, res)=>{
	Sequence.find({}, (err, foundSequences)=>{
		res.json(foundSequences);
	});
});

// if (req.session.logged){
// } else {
// 	res.redirect somewhere
// }

router.post('/', (req, res)=>{
	Sequence.create(req.body, (err, createdSequence)=>{
		User.findOne({username: req.session.username}, (err, foundUser)=>{
			console.log(createdSequence);
			foundUser.sequences.push(createdSequence);
			foundUser.save((err, data)=>{
				res.json(createdSequence);
			});
		});
	});
});

router.get('/:id', (req, res)=>{
	Sequence.findById(req.params.id, (err, foundSequence)=>{
		User.findOne({'user._id': req.params.id}, (err, foundUser)=>{
		res.json(foundSequence);
		});
	});
});

module.exports = router;