var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const port = process.env.PORT || 3001
http.listen(port, function(){
  console.log('listening on *:' + port);
});

io.on('connection', function (socket) {
  socket.on('go', function (action) {
    console.log('--- action received: ' + action)
    io.emit('message', action);
  })
})
