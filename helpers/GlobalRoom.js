class GlobalRoom {
    constructor(){
        this.globalRoom = [];
    }

    EnterRoom (id, room, user){
        var roomName = { id, room, ...user };
        this.globalRoom.push(roomName);
        return roomName;
    }
    RemoveUser (id) {
        var user = this.GetUser(id);
        if(user) {
            this.globalRoom = this.globalRoom.filter((user) => user.id !== id)
        }
        return user;
    }
    GetUser(id) {
        var getUser = this.globalRoom.filter((user) => user.id === id )[0];

        return getUser;
    }
    GetRoomList(room) {
        var roomName = this.globalRoom.filter((user) => user.room === room)

        var users = roomName.map((user) => {
            return {
                ...user
            }
        });

        return users;
    }
}

module.exports = { GlobalRoom };