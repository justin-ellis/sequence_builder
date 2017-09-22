const express = require('express');
const router = express.Router();
const Asana = require('../models/asana.js');
const Sequence = require('../models/sequence.js');

router.get('/', (req, res) => {
	Asana.find(function(err, data) {
    if ( err ) { console.log (err); }
		res.send(data);
	});
});

router.get('/count', (req, res)=>{
	Asana.count((err, count)=>{
		if (err) {console.log(err);}
		res.send(count.toString());
	});
});

router.get('/search', (req, res)=>{
		Asana.find({'pose_name': res.pose_name}, function(err, data) {
    if ( err ) { 
    	console.log (err); 
    }
		res.send(data);
	});
});



router.post('/', (req, res)=>{
// if foundSequence doesn't have author of req.lession
			if (req.session.logged){
	Asana.create(req.body['poseData'], ()=>{
		console.log(req.body['poseData']);
		Sequence.findOne({author: req.session.username}, (err, foundSequence)=>{
			console.log(foundSequence);
			foundSequence.poses.push(req.body['poseData']);
			foundSequence.save((err, data)=>{
				res.json(req.body['poseData']);
			});
		});
	});
} else {
	res.redirect('/');
}
});

router.delete('/:id', (req, res)=>{
	if (req.session.logged){
	Sequence.findOne({author: req.session.username}, (err, foundSequence)=>{
	Asana.findOne({'_id': req.params.id}, function(err, deletedAsana){
		console.log(foundSequence.deletedAsana);
		// console.log(foundSequence.deletedAsana[0]);

		console.log(deletedAsana);
		// const sexyVariable = foundSequence.poses;
		// const sexierVariable = sexyVariable[0];
		// console.log(sexyVariable[0]);
		// console.log(typeof sexyVariable);
		// console.log(sexyVariable);
		// console.log(foundSequence.poses);
		// console.log(foundSequence.poses[0]);

		//the next two delete both poses
		foundSequence.poses[0].remove()
		// foundSequence.poses.id(req.params.id).remove();

		const index = foundSequence.poses;
		foundSequence.save((err, savedSequence)=>{
		});
		 res.json(deletedAsana);
		 // res.json(foundSequence);
			// console.log(foundSequence);
		});
});
} else {
	res.redirect('/');
}
});

// 'poses._id': req.params.id

module.exports = router;