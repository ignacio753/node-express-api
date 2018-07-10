const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const mongoose = require('mongoose');

// setup express app
const app = express();

// conect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());

// initialize routes
app.use('/api', routes);

// error handling middleware
app.use(function(err, req, res, next){
    //console.log(err);
    res.status(422).send({error: err.message });
});

app.get('/', function(req, res){
    console.log('GET request');
    res.send({ name: 'Yoshi'});
});

// listen for request
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});