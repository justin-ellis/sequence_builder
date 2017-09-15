const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const session = require('express-session');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
	secret: "random secret string",
	resave: false,
	saveUninitialized: false
}));

const usersController = require('./controllers/user.js');
app.use('/user', usersController);

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);

mongoose.connection.once('open', ()=>{
    console.log('mongo is running');
});

app.listen(PORT, ()=>{
	console.log('listening on port ' + PORT);
});
