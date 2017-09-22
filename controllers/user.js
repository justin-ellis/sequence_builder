const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', function(req, res){
		if (req.session.logged) {
	User.findOne({'username': req.session.username}, function(err, Users){
		username = req.session.username;
		console.log(username);
		res.json(Users);
	});
	} else {
	res.redirect('/');
}
});

router.post('/', function(req, res){
	User.create(req.body, function(err, newUser){
		res.json(newUser);
	});
});

module.exports = router;