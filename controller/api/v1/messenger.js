const User = require('../../../model/user');
const MessageBox = require('../../../model/messageBox');

exports.getMessageHistory = (req,res,next) => {
    const userId = req.params.userId;
    let oldChat = false;
    let messageBox;

    User.findById(userId)
    .select('-password -posts')
    .then(user =>{
        if(user.messageBoxUser.length != 0){
            user.messageBoxUser.forEach(element => {
              if(element.userId == req.userId){
                oldChat = true;
                console.log("found");
                messageBox = element.messageBox;
              }
            });
        }
        return true;
    })
    .then(bool =>{
        if(oldChat){
            MessageBox.findById(messageBox)
            .populate('messages.from', 'name _id' )
            .then(messages =>{
                res.status(201).json({
                    message: 'message fetched',
                    messages: messages
                });
            })
        } else {
            res.status(201).json({
                message: 'No Previous chat'
            });
        }
    })
}