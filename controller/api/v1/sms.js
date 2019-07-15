const sparrow = require('sms-sparrow');
require('dotenv/config');

let token = process.env.SPARROW_TOKEN
let identity = process.env.SPARROW_IDENTITY
sparrow.init(token,identity);

module.exports = postSendSMS (req,res,next =>{
    if(req.user.userType.name == "hod"){
        sparrow
        .sendSMS("Message", "to")
        .then(response =>{
            if(response.error){
                res.status(401).json({
                    message:response.message
                })
            } else {
                res.status(200).json({
                    count: count,
                    message: response,
                    message_id: message_id,
                    credit_consumed: credit_consumed,
                    credit_available: credit_available,
                })
            }
        })
    } else {
        res.status(401).json({
            message:"You are not allowed to send SMS"
        })
    }
})