var express = require('express');

class SocketHandler {
  constructor() {}

  handleColoring(io, socket) {
    socket.on('join', function(key) {
      console.log('Joined room #' + key);
      socket.join(key);
    });

    socket.on('leave', function(key) {
      socket.leave(key);
    });

    socket.on('color', function(key, row, column, color) {
      var socketio = require('./socketio');

      console.log(socketio.sockets());

      let sockets = socketio.sockets()[key];

      if (sockets) {
        for (let i = 0; i < sockets.length; ++i) {
          console.log(sockets[i].id);
          sockets[i].emit('color', row, column, color);
        }
      }

      // io.sockets.in(key).emit('color', row, column, color);
    });
  }
}

module.exports = SocketHandler;
