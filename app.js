const express = require('express');
const routes = require('./routers/app.routers');
const errorMiddleware = require('./middleware/error.middleware');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { engine } = require('express-handlebars');
const cors = require('cors');

const envConfig = require('./config');
const dbConfig = require('./DB/db.config');
const passport = require('./middleware/passport');

const app = express();

app.engine('.hbs', engine({ extname: 'hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(
  session({
    name: 'user-session',
    secret: envConfig.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 48,
    },
    rolling: true,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: dbConfig.mongodb.uri,
      dbName: 'p-final',
      ttl: 60,
    }),
  })
);
app.use(passport.session());

// Routes
app.use('/', routes);

app.use(errorMiddleware);

module.exports = app;
