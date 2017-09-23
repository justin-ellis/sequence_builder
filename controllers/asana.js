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
			if (foundSequence != null){
			console.log(foundSequence);
			foundSequence.poses.push(req.body['poseData']);
			foundSequence.save((err, data)=>{
				res.json(req.body['poseData']);
			});
			}
		});
	});
} else {
	console.log('no sequences for this user');
	res.redirect('/');
}
});

router.delete('/:id', (req, res)=>{
	
	if (req.session.logged){
	Sequence.findOne({author: req.session.username}, (err, foundSequence)=>{
		// if (foundSequence != null) {
	Asana.findOne({'_id': req.params.id}, function(err, deletedAsana){
		// console.log(foundSequence.deletedAsana);
		// console.log(foundSequence.deletedAsana[0]);

		// console.log(deletedAsana);
		// console.log(typeof foundSequence.poses);
		// console.log(typeof foundSequence.poses[0]);
		// console.log(foundSequence.poses[0]);

		//the next two delete both poses
		// foundSequence.poses[0].remove()
		// console.log(foundSequence.poses.id(req.params.id) + "is thing with id");
			let stringifiedIds = [];
				let matchingPoses = [];
				let matchingPosesIndex = [];
				let shiftedIndex;
			const requisite = req.params.id;
			const newReq = '"'+requisite+'"';
			console.log(newReq);
		for (var i = 0;  i <= foundSequence.poses.length-1; i++) {
			// console.log(foundSequence.poses[i]);
				stringifiedIds.push(JSON.stringify(foundSequence.poses[i]._id));
	// console.log(id + ' is id');
			// console.log(typeof req.params.id + ' is req.params.id');
			console.log(foundSequence.poses[i]._id + ' is id of index' + i);
			for (var j = 0;  j <= stringifiedIds.length-1; j++) {
			if (newReq === stringifiedIds[j]){
				console.log('true');
				console.log(j + " is the index number of the pose sequence pose index");
				matchingPoses.push(foundSequence.poses[j]);
				matchingPosesIndex.push(j);
				console.log(matchingPosesIndex + ' is matching poses index');
				if (matchingPoses.length > 1) {
					console.log('DUPLICATES FOUND');
					console.log('============================');
					// console.log(foundSequence.poses[j] + " is poses of j");
					// const shiftedIndex = matchingPosesIndex.shift();
					// console.log(typeof shiftedIndex + " is shifted index");
					// figure out which index array the matching poses
					// are at in the origin found.sequence.poses[i]

					//delete the correct data (only one pose)
				}
				// console.log(matchingPoses + "are matching poses");
			} else {
				console.log('false yo');
				console.log(req.params.id + ' is req.params.id');
				// console.log(stringifiedIds[0] + ' is stringifiedIds[0]');
				// console.log(stringifiedIds[1] + ' is stringifiedIds[1]');
			}
			}
				console.log(stringifiedIds + ' are stringifiedIds');
		}
					if (matchingPosesIndex.length > 1 && matchingPosesIndex[matchingPosesIndex.length-1] != matchingPosesIndex[matchingPosesIndex.length-2]) {
						const shiftedIndex = matchingPosesIndex.pop();
					console.log(shiftedIndex + " is shifted index");
					foundSequence.poses.splice(shiftedIndex, 1);
					foundSequence.save((err, savedSequence)=>{
		});
					} else {

		// console.log(butts + ' is the butt');
		// console.log(typeof foundSequence.poses.id(req.params.id) + "is thing with id");
		// const butt = foundSequence.poses.id(req.params.id);
		// console.log(butt);
		foundSequence.poses.id(req.params.id).remove();
		foundSequence.save((err, savedSequence)=>{
		});
					}

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