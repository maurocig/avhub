const app = require('./app');
const envConfig = require('./config');
const PORT = process.env.PORT || 8080;

const DATASOURCE_BY_ENV = {
  mongo: require('./models/containers/mongo.container'),
  firebase: require('./models/containers/firebase.container'),
  files: require('./models/containers/files.container'),
  memory: require('./models/containers/memory.container'),
};

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE];

app.listen(PORT, () => {
  dataSource.connect().then(() => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Connected to ${envConfig.DATASOURCE}`);
  });
});
