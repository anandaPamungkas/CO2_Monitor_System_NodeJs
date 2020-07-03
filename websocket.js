var socket = require('socket.io'); //require socket.io
let mqtt = require('mqtt'); //mqtt nodejs package

module.exports = function (server) {


    let client = mqtt.connect('mqtt:localhost:1883'); //connect ke mqtt broker local yang dibuat dengan mosca

    var io = socket(server); //pass the server as socket parameter

    var topic = 'esp/mq7'; //mqtt topic for co2 sensor

    client.on('connect', function () {
        client.subscribe(topic, function (err) {
            //display subscribed topic when mqtt connection to broker success
            console.log('concted to a broker...');
            console.log('subscribed to topic : ' + topic);
        })
    })

    client.on('message', function (topic, message) {


        //get current time
        var date = new Date();
        var seconds = date.getSeconds();
        var minutes = date.getMinutes();
        var hour = date.getHours();
        var time =  hour + ' : '+ minutes + ' : ' + seconds;
        //get current co2 sensor value from mqtt
        var data = [message.toString(), time];
        //send sensor value and current time to client websocket
        io.sockets.emit('mq7', data);

    })



}