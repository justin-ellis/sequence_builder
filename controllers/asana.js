const express = require('express');
const router = express.Router();
const Asana = require('../models/asana.js');

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

module.exports = router;