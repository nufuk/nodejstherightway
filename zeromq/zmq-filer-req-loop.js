"use strict"

const
  zmq = require('zmq'),
  filename = process.argv[2],
  //create request endpoint
  requester = zmq.socket('req');

//handle replies from responder
let lastTimestamp = Date.now();
requester.on('message', function(data) {
  let response = JSON.parse(data);
  console.log("received response:", response);
  lastTimestamp = response.timestamp;
});

requester.connect("tcp://localhost:5433");
//send request for content
for(let i=1; i<=30000; i++) {
  console.log("Sending request for: " + filename);
  requester.send(JSON.stringify({
    path: filename
  }));
}
let sendingEndTime = Date.now();
//close the responder when the Node process ends
process.on('SIGINT', function(){
  console.log("End with sending: " + sendingEndTime);
  console.log("So it took about: " + ((lastTimestamp - sendingEndTime)/1000) + " seconds");
  console.log("Shutting down...");
  requester.close();
});
