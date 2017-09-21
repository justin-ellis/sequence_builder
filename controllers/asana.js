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



router.post('/getOne', (req, res)=>{

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

router.delete('/getOne/:id', (req, res)=>{
	Asana.findByIdAndRemove(req.params.id, function(err, deletedAsana){
	Sequence.findOne({'poses._id': req.params.id}, (err, foundSequence)=>{
		foundSequence.posts.id(req.params.id).remove();
		foundSequence.save((err, savedSequence)=>{
		 res.json(deletedAsana);
			
		});
			console.log(foundSequence);
		});
});
});


// router.post('/', (req, res)=>{
// 	Asana.create(req.body, (err, createdAsana)=>{
// 		Sequence.findOne({author: req.session.username}, (err, foundSequence)=>{
// 			console.log(foundSequence);
// 			foundSequence.poses.push(createdAsana);
// 			foundSequence.save((err, data)=>{
// 				res.json(createdAsana);
// 			});
// 		});
// 	});
// });

module.exports = router;