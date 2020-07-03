var mosca = require('mosca'); //require mosca library local mqtt broker
let settings = {
    port: 1883 //setup port 1883 
};

let server = new mosca.Server(settings); //make mosca instance
 
server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});
 
// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.payload);
});
 
server.on('ready', setup);
 
// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
}