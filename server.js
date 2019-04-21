var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.json({"ok": true});
});

const port = process.env.PORT || 3001
http.listen(port, function(){
  console.log('Simulator listening on *:' + port);
});

io.on('connection', function (socket) {
  var query = socket.handshake.query;
  if(query && query.room) {
    socket.join(query.room);
  }
  socket.on('go', function (data) {
    console.log('--- data received')
    console.log(data)
    if (data.room) {
      io.in(data.room).emit('message', data.message);
    } else {
      io.emit('message', data.message);
    }
  })
  socket.on('event', function (data) {
    console.log('--- event received')
    console.log(data)
    if (data.room) {
      // Emit to all clients in data.room EXCEPT sender
      socket.broadcast.to(data.room).emit('event', data);
    } else {
      // Emit to all clients EXCEPT sender
      socket.broadcast.emit('message', data);
    }
  })
})
