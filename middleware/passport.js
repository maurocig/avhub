const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersServices = require('../services/users.service');
const CartsServices = require('../services/carts.service');

const logger = require('../middleware/logger');
const { sendNewRegEmail } = require('./node-mailer/sendEmail');
const { ADMIN_EMAIL } = require('../config');

const User = new UsersServices();
const Cart = new CartsServices();

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

        const cart = await Cart.create();
        const user = {
          email: username,
          password: createHash(password),
          name,
          address,
          age,
          phone,
          cart,
          image: req.file.filename,
        };
        const userResponse = await User.create(user);
        logger.info('User registration successful');
        await sendNewRegEmail(user, ADMIN_EMAIL);
        return done(null, userResponse);
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
