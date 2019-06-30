let socket = (server) => {
    console.log("I am Running");
    const io = require('../../../socket').init(server);

    io.on('connection', socket => {
        console.log("IO Connected");
      
        socket.on('new message', (data) => {
          console.log("New Message emitted by Client");
          // we tell the client to execute 'new message'
          socket.broadcast.emit('new message', {
            username: socket.user.name,
            message: data
          });
        });
      
        socket.on('typing', () => {
          socket.broadcast.emit('typing', {
            username: socket.user.name
          });
        });
      
        socket.on('stop typing', () => {
          socket.broadcast.emit('stop typing', {
            username: socket.user.name
          });
        });
      
        socket.on('disconnect', () => {
          
        });
    });
}

module.exports = socket;