let mqtt = require('mqtt');
let client = mqtt.connect('mqtt:localhost:1883'); //make connection to mosca local mqtt broker

var topic = 'esp/mq7';

client.on('connect', function () {
  client.subscribe(topic, function (err) {
    console.log('concted to a broker...'); //when connection to boker success display this
    console.log('subscribed to topic : ' + topic); //display the subscribed value of the mqtt broker
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('topic : ' + topic + ' message : ' + message.toString()) //tampilkan message yang dikirmkan oleh publisher
  //client.end() //client.end digunakan untuk menghentikan listening pada suatu broker
})