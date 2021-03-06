const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const Sequence = require('./models/sequence.js');
const session = require('express-session');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true, limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));

app.use(session({
	secret: "random secret string",
	resave: false,
	saveUninitialized: false
}));



const usersController = require('./controllers/user.js');
app.use('/users', usersController);

const asanasController = require('./controllers/asana.js');
app.use('/asana', asanasController);

const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);

const seedController = require('./controllers/seedController.js');
app.use('/seed', seedController);

const sequenceController = require('./controllers/sequence.js');
app.use('/sequence', sequenceController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/yoga';
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
    console.log('mongo is running');
});

app.listen(port, ()=>{
	console.log('listening on port ' + port);
});
