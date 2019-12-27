module.exports = function(io, GlobalRoom, _) {
    const users = new GlobalRoom();

    io.on('connection', (socket) => {
        socket.on('global room', (global) => {
            socket.join(global.room)
            users.EnterRoom(socket.id, global.room, global.user);

            const userList = users.GetRoomList(global.room);

            const uniqueUserList = _.uniqBy(userList, "userId"); // uniquie user online    
            console.log(uniqueUserList);
            io.to(global.room).emit('onlineUser', uniqueUserList);
        });
        socket.on('disconnect', () => {
            const user = users.RemoveUser(socket.id);
            console.log(user)
            if(user) {
                var userData= users.GetRoomList(user.room);
                const uniqueUserList = _.uniqBy(userData, "userId"); // uniquie user online   
                const removeData = _.remove(uniqueUserList, { 'name': user.name });
                io.to(user.room).emit('onlineUser', uniqueUserList);
            }
        })
    });
};