const jwt = require('jsonwebtoken');
const User = require('./model/user');

let io;

module.exports = {
  init: httpServer => {
    io = require('socket.io')(httpServer, {path: '/api/v1/socket.io'});

    io.use((socket , next) => {
        let decodedToken;
        if (socket.handshake.query && socket.handshake.query.token){
            try {
                decodedToken = jwt.verify(socket.handshake.query.token, 'ThisIsASecretKeyAndKey');
            } catch (error) {
                error.statusCode = 500;
                next(error);
            }
            if(!decodedToken){
                const error = new Error('Not authenticated');
                error.statusCode = 401;
                next(error);
            } else {
                socket.userId = decodedToken.userId;
                User.findById(decodedToken.userId)
                .then(user =>{
                    if(user){
                        socket.user = user
                        next();
                    } else {
                        const error = new Error('Not authenticated');
                        error.statusCode = 401;
                        next(error);
                    }
                }).catch(error =>{
                    next(error);
                })
            }
        } else {
            const error = new Error('Not authenticated');
            error.statusCode = 401;
            next(error);
        }
    })

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};