const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', function(req, res){
	User.find({}, function(err, Users){
		res.json(Users);
	});
});

router.post('/', function(req, res){
	User.create(req.body, function(err, newUser){
		res.json(newUser);
	});
});

module.exports = router;