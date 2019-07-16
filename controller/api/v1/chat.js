const jwt = require('jsonwebtoken');
const User = require('../../../model/user');
const MessageBox = require('../../../model/messageBox');

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
          let sender = socket.userId;
          let receiver = data.to;
          let oldChat = false;
          let messageReceived = data.message;
          console.log(socket.ram);
          console.log("to " + data.to);
          console.log("from " + socket.user);
          console.log("Message " + data.message);
          console.log("New Message emitted by Client");

          User.findById(receiver)
          .select('-posts -password')
          .then(rUser =>{
            console.log(rUser);
            console.log(rUser.messageBoxUser.length);
            if(rUser.messageBoxUser.length != 0){
              rUser.messageBoxUser.forEach(element => {
                if(element.userId == sender){
                  oldChat = true;
                  console.log("found");
                }
              });
            }
            console.log(oldChat);
            if(rUser.messageBoxUser.length == 0 || !oldChat){
              console.log("Empty")
              let messageBox = new MessageBox({
                messages:[]
              });
              let newMessage = {
                message: messageReceived,
                from: sender
              }
              messageBox.messages.push(newMessage)
              messageBox
              .save()
              .then(messageBox =>{
                console.log(messageBox);
                let messageBoxUser = {
                  userId:sender,
                  messageBox:messageBox
                }
                rUser.messageBoxUser.push(messageBoxUser);
                if(sender != receiver){
                  console.log("Message to self");
                  User.findById(sender)
                  .then(sUser =>{
                    let messageBoxUser = {
                      userId:receiver,
                      messageBox:messageBox
                    }
                    sUser.messageBoxUser.push(messageBoxUser);
                    sUser.save();
                  })
                }
                rUser.save();
              })
            }

            if(oldChat){
              User.findById(sender)
              .then(user =>{
                user.messageBoxUser.forEach(element => {
                  if(element.userId == sender){
                    console.log(element.messageBox);
                    MessageBox.findById(element.messageBox)
                    .then(messageBox =>{
                      let newMessage = {
                        message: messageReceived,
                        from: sender
                      }
                      messageBox.messages.push(newMessage)
                      messageBox.save();
                    })
                  }
                })
              })
            }


          })
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