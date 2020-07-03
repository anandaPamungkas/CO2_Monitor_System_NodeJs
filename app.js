var express = require('express'); //express library

var app = express(); //express function

var sensorController = require('./controllers/sensorController.js'); //sensor controller
var websocket = require(__dirname + '/websocket.js'); //websocket

var server = app.listen(4000, function () {
    //setup a server in port 4000
    console.log('listening to request on port 4000');
});

//Static files
app.use(express.static('public'));
app.use('/chartjs', express.static(__dirname + '/node_modules/chart.js/dist/Chart.min.js')); //chartjs library
app.use('/styles', express.static(__dirname + '/public/styles.css')); //stylesheet

app.set('view engine', 'ejs'); //view engine



sensorController(app); //call sensorController
websocket(server); //call websocket