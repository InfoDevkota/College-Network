const jwt = require('jsonwebtoken');
const User = require('../../../model/user');

let socket = (server) => {
    console.log("I am Running This Controller one");
    const io = require('../../../socket').init(server,'v1');
    //const io = require('../../../socket').init(server);

    io.use((socket , next) => {
      //
      console.log("Socket io use");
      next();
    });

    io.on('connection', socket => {
      console.log("Connected");
      let verifyed = false;

      if(!verifyed){
        console.log("New IO Connected");
        let decodedToken;
        if (socket.handshake.query && socket.handshake.query.token){
          try {
            decodedToken = jwt.verify(socket.handshake.query.token, 'ThisIsASecretKeyAndKey');
            socket.error = false;
          } catch (error) {
            console.error("Error on decoding");
          }
          if(!decodedToken){
            console.error("Invalid token")
          } else {
            socket.userId = decodedToken.userId;
            User.findById(decodedToken.userId)
            .select('-posts -password -__v')
            .then(user =>{
              if(user){
                socket.user = user;
                socket.verifyed = true;
              } else {
                console.log("no User Found")
              }
            }).catch(error =>{
              console.log("DB Error");
            })
          }
        } else {
          console.error("no token")
        }
      }else{
        console.log("Verified IO Connected");
      }
        socket.emit('test',{
          data:'nodata'
        });
      
        socket.on('new message', (data) => {
          console.log(socket.ram);
          console.log("to " + data.to);
          console.log("from " + socket.user);
          console.log("Message " + data.message);
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
    })
}

module.exports = socket;