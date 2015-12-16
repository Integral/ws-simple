var WebSocketServer = require('ws').Server
	, http = require('http')
	, express = require('express')
  , app = express()
  , port = process.env.PORT || 8080
  , server = http.createServer(app)
  , fixture = require('./fixture')
  , wss = new WebSocketServer({ server: server });


wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(JSON.stringify({msg: 'Oh, hello, listner #' + wss.clients.length + '! Are you using ' + message + ' platform?', intro: true}));
    ws.send(JSON.stringify({msg: 'Then I have a message for you, listen!', intro: true}));
  });

  var i = 0;
  var sonet = setInterval(function() {
  	if (i < fixture.length) {
    	ws.send(JSON.stringify({msg: fixture[i]}));
    	i++;
    } else {
    	clearInterval(sonet);
    }
  }, 1000);
  ws.on('close', function() {
    console.log('Client has been disconnected!');
    clearInterval(sonet);
  });
});

app.use(express.static(__dirname + '/public'));

server.listen(port, function() {
  console.log("Application server listening on port %d", port);
});
