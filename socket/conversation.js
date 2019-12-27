module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log("user-connected");
        socket.on('join', (params, callback) => {
            console.log("joined----" + params.conversation)
            socket.join(params.conversation);
            callback();
        })
        socket.on('createMessage', (message, callback) => {
            console.log(message);
            //sent message to all clients in particular room
            io.to(message.room).emit("newMessage", {
                text: message.text,
                room: message.room,
                sender: message.sender
            });
            callback();
        })
    })
}