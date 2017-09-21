const express = require('express');
const Sequence = require('../models/sequence.js');
const User = require('../models/user.js');
const router = express.Router();
const Asana = require('../models/asana.js');

router.get('/', (req, res)=>{
	Sequence.find({}, (err, foundSequences)=>{
		res.json(foundSequences);
	});
});



router.post('/', (req, res)=>{
	if (req.session.logged){
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
} else {
	res.redirect('/');
}
});

// router.get('/getOne', (req, res)=>{
// 	Asana.findOne(req.body['poseData'], (err, createdAsana)=>{
// 		Sequence.findOne({author: req.session.username}, (err, foundSequence)=>{
// 			console.log(foundSequence);
// 			foundSequence.poses.push(createdAsana);
// 			foundSequence.save((err, data)=>{
// 				res.json(createdAsana);
// 			});
// 		});
// 	});
// });


router.put('/:id', (req, res)=>{
	Sequence.findByIdAndUpdate(req.params.id, req.body, {new:true},(err, foundSequence)=>{
		// User.findOne({'user._id': req.params.id}, (err, foundUser)=>{
		res.json(foundSequence);
		// });
	});
});

// router.delete('/:id', (req, res)=>{
// 	Asana.findByIdAndRemove(req.params.id, function(err, deletedAsana){
// 		 res.json(deletedAsana);
// });
// });

router.delete('/:id', function(req, res){
	// var sequencesUsersSequencesIds = User.keys(myObject.map(function(key, index){
	// 	// console.log(sequences.author);
	// 	myObject[key] *= 2;
	// 	console.log(sequencesUsersSequencesIds);
	// }));

		// console.log(sequencesUsersSequencesIds);
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