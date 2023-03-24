const os = require('os');
const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const envConfig = require('./config');
const PORT = process.env.PORT || 8080;
const { CLUSTER_MODE } = require('./constants/api.constants');
const cluster = require('cluster');
const logger = require('./middleware/logger');

const MessagesDao = require('./models/daos/messages/messages.mongo.dao');
const Message = new MessagesDao();

const httpServer = http.createServer(app);

const DATASOURCE_BY_ENV = {
  mongo: require('./models/containers/mongo.container'),
  firebase: require('./models/containers/firebase.container'),
  files: require('./models/containers/files.container'),
  memory: require('./models/containers/memory.container'),
};

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE];

// Socket
const io = new Server(httpServer);
io.on('connection', async (socket) => {
  logger.info(`User connected to chat: ${socket.id}`);
  const messages = await Message.getAll();
  socket.emit('messages', messages);

  socket.on('new-message', async (data) => {
    await Message.create(data);
    const updatedMessages = await Message.getAll();
    io.emit('messages', updatedMessages);
  });
});

// Listen
if (CLUSTER_MODE && cluster.isMaster) {
  logger.info(`Master process ${process.pid} is running.`);
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  logger.info(`Worker process ${process.pid} is running.`);
  httpServer.listen(PORT, () => {
    dataSource.connect().then(() => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Connected to ${envConfig.DATASOURCE}`);
    });
  });
}
