const app = require('./app');
const envConfig = require('./config');
const PORT = process.env.PORT || 8080;
const { CLUSTER_MODE } = require('./constants/api.constants');
const os = require('os');
const cluster = require('cluster');
const logger = require('./middleware/logger');

const DATASOURCE_BY_ENV = {
  mongo: require('./models/containers/mongo.container'),
  firebase: require('./models/containers/firebase.container'),
  files: require('./models/containers/files.container'),
  memory: require('./models/containers/memory.container'),
};

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE];

if (CLUSTER_MODE && cluster.isMaster) {
  logger.info(`Master process ${process.pid} is running.`);
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  logger.info(`Worker process ${process.pid} is running.`);
  app.listen(PORT, () => {
    dataSource.connect().then(() => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Connected to ${envConfig.DATASOURCE}`);
    });
  });
}
