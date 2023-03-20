const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersDao = require('../models/daos/users/users.mongo.dao');
const CartsDao = require('../models/daos/carts/carts.mongo.dao');
const { formatUserForDB } = require('../utils/users.utils');
const logger = require('../middleware/logger');
const { sendNewRegEmail } = require('./node-mailer/sendEmail');
const { ADMIN_EMAIL } = require('../config');

const User = new UsersDao();
const Cart = new CartsDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
// 																				^ CAMBIAR A ASYNC

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy
// sign up
passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        logger.info('[POST] => /register');
        const { name, address, age, phone } = req.body;

        const cart = await Cart.save({
          items: [],
          email: username,
          address,
        });

        const userItem = {
          email: username,
          password: createHash(password),
          name,
          address,
          age,
          phone,
          cart,
          image: req.file.filename,
        };

        const formattedUser = formatUserForDB(userItem);
        const user = await User.createUser(formattedUser);
        logger.info('User registration successful');
        await sendNewRegEmail(JSON.stringify(formattedUser), ADMIN_EMAIL);

        return done(null, user);
      } catch (error) {
        logger.error('Error signing user up...');
        logger.error(error);
        return done(error);
      }
    }
  )
);

// sign in
passport.use(
  'signin',
  new LocalStrategy(async (username, password, done) => {
    try {
      logger.info('[POST] => /login');
      const user = await User.getByEmail(username);
      if (!isValidPassword(user, password)) {
        logger.warn('Invalid user or password');
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      logger.error(error);
      return done(error);
    }
  })
);

// Serialization
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialization
passport.deserializeUser(async (id, done) => {
  const user = await User.getById(id);
  done(null, user);
});

module.exports = passport;
