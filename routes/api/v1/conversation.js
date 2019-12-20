const express = require('express');

const ConversationController = require("../../../controller/api/v1/conversation");
const isAuth = require("../../../auth/is-auth-api");

const apiRoutes = express.Router(),
chatRoutes = express.Router();

  // Set chat routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/chat', chatRoutes);

  // View messages to and from authenticated user
  chatRoutes.get('/', isAuth, ConversationController.getConversations);

  // Retrieve single conversation
  chatRoutes.get('/:conversationId', isAuth, ConversationController.getConversation);

  // Send reply in conversation
  chatRoutes.post('/:conversationId', isAuth, ConversationController.sendReply);

  // Start new conversation
  chatRoutes.post('/new/:recipient', isAuth, ConversationController.newConversation);


module.exports = apiRoutes;