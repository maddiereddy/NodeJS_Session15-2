/*
Creates a basic socket.io app that prints the message:
`welcome to my socket.io app` and the current date and time in an interval of 20 seconds
*/

var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

// Send current time to all connected clients
function sendTime() {
    io.sockets.emit('time', { time: new Date().toJSON() });
}

// Send current time every 15 secs
setInterval(sendTime, 20000);

// Emit welcome message on connection
io.sockets.on('connection', function(socket) {
    socket.emit('welcome', { message: 'Welcome to my socket.io app!' });
});

app.listen(3000, function(){
	console.log("App is runing on port Number 3000"); 
	console.log("Try this Url in Browser :- http://localhost:3000/");
});
