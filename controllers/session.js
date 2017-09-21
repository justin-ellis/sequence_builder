const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcryptjs');

router.get('/', (req, res, next)=>{
	User.find({}, (err, foundUsers)=>{
		res.json(foundUsers);
	});
});

router.post('/login', (req, res, next)=>{
	User.findOne({username: req.body.username}, (err, user)=>{
		if(user){
			if(bcrypt.compareSync(req.body.password, user.password)){
				req.session.message = '';
				req.session.username = req.body.username;
				req.session.logged = true;
				console.log(req.session);
				console.log(req.body);
				res.json(req.session.logged);
			} else {
				console.log('else in bcrypt compare');
				req.session.message = 'Username or password is incorrect';
				res.json(req.session.message);
			}
		} else {
			console.log('else else in bcrypt compare');
			req.session.message = 'Username or password are incorrect';
			res.json(req.session.message);
		}
	});
});

router.post('/register', (req, res, next)=>{
    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const userDbEntry = {};
    userDbEntry.username = req.body.username;
    userDbEntry.password = passwordHash;


    User.create(userDbEntry, (err, user) => {
      console.log(user);
     
      req.session.username = user.username;
      req.session.logged   = true;
      res.json(req.session.logged);
    });
});

router.get('/logout', function(req, res){
  req.session.destroy(function(err){
  	if(err){
  		console.log(err);
  	} else {
    res.redirect('/');
  	}
  });
});

module.exports = router;