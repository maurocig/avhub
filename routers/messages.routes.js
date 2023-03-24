const { Router } = require('express');
const MessageDao = require('../models/daos/messages/messages.mongo.dao');
const Message = new MessageDao();

const router = Router();

router.get('/json', async (req, res) => {
  const messages = await Message.getAll();
  res.send(messages);
});

router.post('/', async (req, res) => {
  const { email, type, body } = req.body;
  const newMessage = { email, type, body };
  await Message.create(newMessage);
  res.send(newMessage);
});

module.exports = router;
