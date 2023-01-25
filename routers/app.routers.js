const { Router } = require('express');

const productsRoutes = require('./products.routes');
const cartsRoutes = require('./carts.routes');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const logger = require('../middleware/logger');
const { CartsDao } = require('../models/daos/app.daos');
const { sendCheckoutEmail } = require('../middleware/node-mailer/sendEmail');
const { sendCheckoutWhatsapp, sendCheckoutSMS } = require('../middleware/twilio/checkoutNotification');
const { ADMIN_EMAIL, ADMIN_PHONE } = require('../config');

const Cart = new CartsDao();

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/users', usersRoutes);

router.get('/', async (req, res) => {
  try {
    logger.info('[GET] => /');
    const user = req.user;
    if (user) {
      res.render('home', { user });
    } else {
      res.sendFile('login.html', { root: 'public' });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/login', async (req, res) => {
  logger.info('[GET] => /login');
  res.sendFile('login.html', { root: 'public' });
});

router.get('/register', async (req, res) => {
  logger.info('[GET] => /register');
  res.sendFile('register.html', { root: 'public' });
});

router.get('/logout', async (req, res) => {
  logger.info('[GET] => /logout');
  try {
    await req.session.destroy((err) => {
      if (err) {
        logger.error(err);
        res.clearCookie('my-session');
      } else {
        res.clearCookie('my-session');
        res.sendFile('login.html', { root: 'public' });
        // res.redirect('/login');
      }
    });
  } catch (err) {
    logger.error(err);
  }
});

router.get('/profile', (req, res) => {
  const user = req.user;
  res.render('profile', { user });
});

router.get('/cart', async (req, res) => {
  const cartId = req.user.cart;
  try {
    const cart = await Cart.getByIdAndPopulate(cartId);
    if (!cart) {
      res.send('This item is already on your cart.');
    }
    logger.info(cart);
    res.render('carts/cart', { cart });
  } catch (error) {
    logger.error(error);
  }
});

router.post('/checkout', async (req, res) => {
  const cartId = req.user.cart;
  const { email, phone } = req.user;
  try {
    const cart = await Cart.getByIdAndPopulate(cartId);
    await sendCheckoutEmail(req.user, cart, ADMIN_EMAIL);
    await sendCheckoutWhatsapp(email, ADMIN_PHONE);
    await sendCheckoutSMS(email, phone);
    res.send('Su pedido fue procesado de forma exitosa.');
  } catch (error) {
    logger.error(error);
  }
});

module.exports = router;
