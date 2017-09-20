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
			createdSequence.author = req.session.username;
			createdSequence.save((err, data)=>{

			});
			foundUser.sequences.push(createdSequence);
			foundUser.save((err, data)=>{
			// res.json(createdSequence);
				res.json(createdSequence);
			});
		});
	});
});


router.put('/:id', (req, res)=>{
	Sequence.findByIdAndUpdate(req.params.id, req.body, {new:true},(err, foundSequence)=>{
		// User.findOne({'user._id': req.params.id}, (err, foundUser)=>{
		res.json(foundSequence);
		// });
	});
});

router.delete('/:id', function(req, res){
	// var sequencesUsersSequencesIds = users.sequences.map(function(sequences){
	// 	console.log(sequences._id);
	// 	return sequences._id;
	// });
	// 	console.log(sequencesUsersSequencesIds);
  Sequence.findByIdAndRemove(req.params.id, function(err, deletedSequence){
  	// User.findOne({'sequences._id': req.params.id}, (err, foundUser)=>{
  // 		User.findOne({ _id : { $in: sequencesUsersSequencesIds}}, (err, foundUser)=>{
  // 		console.log(foundUser);
		// foundUser.sequences.id(req.params.id).remove();
		// foundUser.save((err, savedUser)=>{
		// res.json(foundUser);
    res.json(deletedSequence);
			// });
		// });
  });
});
module.exports = router;