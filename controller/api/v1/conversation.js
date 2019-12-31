const { validationResult } = require('express-validator');
"use strict"
const Conversation = require('../../../model/conversation'),  
      Message = require('../../../model/message'),
      User = require('../../../model/user');

exports.getConversations = function(req, res, next) {  
  // Only return one message from each conversation to display as snippet
  Conversation.find({ participants: req.params.userId })
    .select('_id conversation_name')
    .exec(function(err, conversations) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      // Set up empty array to hold conversations + most recent message
      let fullConversations = [];
      conversations.forEach(function(conversation) {
        Message.find({ 'conversationId': conversation._id })
          .sort('-createdAt')
          .limit(1)
          .populate({
            path: "author",
            select: "name"
          })
          .exec(function(err, message) {
            if (err) {
              res.send({ error: err });
              return next(err);
            }
            fullConversations.push({ ...message, conversationName: conversation.conversation_name});
            if(fullConversations.length === conversations.length) {
              return res.status(200).json({ conversations: fullConversations });
            }
          });
      });
  });
}

exports.getConversation = function(req, res, next) { 
  Conversation.findById(req.params.conversationId)
  .select("participants conversation_name")
  .populate({
    path: "participants",
    select: "name profileImage"
  })
  .then(conversation => {
    return conversation
  })
  .then((conversationDetail)=>{
    Message.find({ conversationId: req.params.conversationId })
    .select('createdAt body author')
    .sort('createdAt')
    .populate({
      path: 'author',
      select: 'name profileImage'
    })
    .exec(function(err, messages) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }

      res.status(200).json({ conversation: messages, detail: conversationDetail });
    });
  })
  }

  exports.newConversation = function(req, res, next) { 

    // if(!req.params.recipients) {
    //   res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    //   return next();
    // }
  
    // if(!req.body.composedMessage) {
    //   res.status(422).send({ error: 'Please enter a message.' });
    //   return next();
    // }

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    

    const conversation = new Conversation({
      conversation_name: req.body.name,
      participants: req.body.recipients
    });
    return conversation.save()
    // .then(newConversation => {
    //   const message = new Message({
    //     conversationId: newConversation._id,
    //     body: req.body.message,
    //     author: req.user
    //   });
    //   return message.save()
    // })
    .then(conversation =>{      
      res.status(201).json({
        status: true,
        conversation                  
    })});
  
    // conversation.save(function(err, newConversation) {
    //   if (err) {
    //     res.send({ error: err });
    //     return next(err);
    //   }
    //   return next()
      // const message = new Message({
      //   conversationId: newConversation._id,
      //   body: req.body.composedMessage,
      //   author: req.user._id
      // });
  
      // message.save(function(err, newMessage) {
      //   if (err) {
      //     res.send({ error: err });
      //     return next(err);
      //   }
  
      //   res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
      //   return next();
      // });
    // });
  }

  exports.sendReply = function(req, res, next) {  
    const reply = new Message({
      conversationId: req.params.conversationId,
      body: req.body.message,
      author: req.body.user
    });
  
    reply.save(function(err, sentReply) {
      if (err) {
        res.send({ error: err });
        return next(err);
      }
  
      res.status(200).json({ message: sentReply });
      return(next);
    });
  }