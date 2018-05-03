const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('static'));

app.get('/', function (req, res) {
  res.redirect('/prezentace/');
});

http.listen(3000, function () {
   let host = http.address().address
   let port = http.address().port

   console.log("listening at http://%s:%s", host, port)
});

let clientsNum = 0;

io.on('connection', (socket) => {
  console.log('new client');
  socket.on('role', (role) => {
    console.log('got ' + role);
    switch (role) {
      case 'host':
        console.log('host logged');
        socket.join('hosts');
        socket.emit('clientNumberChanged', clientsNum);
        break;
      case 'client':
        clientsNum ++;
        io.sockets.in('hosts').emit('clientNumberChanged', clientsNum);
        break;
      default:
        break;
    }
  });
});
