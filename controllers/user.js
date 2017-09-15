const express = require('express');
const router = express.Router();
const Users = require('../models/user.js');

router.get('/', function(req, res){
	Users.find({}, function(err, Users){
		res.json(Users);
	});
});

router.post('/', function(req, res){
	Users.create(req.body, function(err, newUser){
		res.json(newUser);
	});
});

module.exports = router;