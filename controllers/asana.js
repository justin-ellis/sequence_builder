const express = require('express');
const router = express.Router();
const Asana = require('../models/asana.js');

router.get('/', (req, res, next)=>{
	Asana.find({}, (err, foundAsanas)=>{
		res.json(foundAsanas);
	});
});

module.exports = router;