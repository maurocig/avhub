const { Server: SocketServer } = require('socket.io');
const io = new SocketServer(httpServer);

// Socket events
io.on('connection', async (socket) => {
  console.log('nuevo cliente conectado');
  console.log(socket.id);

  const messages = await messagesDao.getAll();
  console.log(messages);
  socket.emit('messages', messages);

  const products = await productsDao.getAll();
  socket.emit('products', products);

  socket.on('new-message', async (data) => {
    await messagesDao.save(data);
    const updatedMessages = await messagesDao.getAll();
    io.emit('messages', updatedMessages);
  });

  socket.on('new-product', async (data) => {
    await productsDao.save(data);
    const updatedProducts = await productsDao.getAll();
    io.emit('products', updatedProducts);
  });
});
