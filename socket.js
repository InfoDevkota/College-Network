let io;

module.exports = {
  init: (httpServer,version) => {
    console.log(version);
    console.log("InitIO")
    io = require('socket.io')(httpServer, {path: '/api/'+version+'/socket'});
    //io = require('socket.io')(httpServer);
    return io;
  },
  getIO: () => {
    console.log("getIO")
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};