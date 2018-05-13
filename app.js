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
let passwords = [];

io.on('connection', (socket) => {
  socket.on('role', (role) => {
    console.log(`new ${role} just joined`);
    switch (role) {
      case 'host':
        socket.join('hosts');
        socket.emit('clientNumberChanged', clientsNum);
        break;
      case 'client':
        socket.on('login', (data) => {
          clientsNum ++;
          io.sockets.in('hosts').emit('clientNumberChanged', clientsNum);
          console.log(`${role} just sent me his/her password`);
        });
        socket.on('reaction', (reaction) => io.sockets.in('hosts').emit('reaction', reaction));
        break;
      case 'rc':
        socket.on('move', (move) => io.sockets.in('hosts').emit('move', move));
      default:
        break;
    }
  });
});
