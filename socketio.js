var SocketHandler = require('./socket-handler');

let io = null;
let sockets = {};
module.exports = {
  init: function(server) {
    io = require('socket.io')(server);
    io.on('connection', function(socket) {
      let gridKey = socket.handshake.query.id;
      if (!sockets[gridKey]) {
        sockets[gridKey] = [];
        sockets[gridKey].push(socket);
      } else {
        sockets[gridKey].push(socket);
      }
      console.log(`Grid Key: ${gridKey} has connected.`);
      console.log(`Socket ID: ${socket.id}`);

      let socketHandler = new SocketHandler();

      socketHandler.handleColoring(io, socket);
    });
  },
  instance: function() {
    return io;
  },
  sockets: function() {
    return sockets;
  }
};
