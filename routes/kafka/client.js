var rpc = new (require('./kafkarpc'))();

//make request to kafka
function make_request(queue_name, msg_payload, callback) {
  console.log('in make request');
  console.log(msg_payload.username, msg_payload.password);
  rpc.makeRequest(queue_name, msg_payload, function(err, response) {
    if (err) console.error(err);
    else {
      console.log('responsein make_request rpc', response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;
