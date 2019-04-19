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
  socket.on('go', function (action) {
    console.log('--- action received: ' + action)
    io.emit('message', action);
  })
})
