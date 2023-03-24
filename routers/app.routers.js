const { Router } = require('express');

const productsRoutes = require('./products.routes');
const cartsRoutes = require('./carts.routes');
const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const messagesRoutes = require('./messages.routes');
const logger = require('../middleware/logger');
// const CartsDao = require('../models/daos/app.daos');
const CartsDao = require('../models/daos/carts/carts.mongo.dao');
const OrdersDao = require('../models/daos/orders/orders.mongo.dao');
const { sendCheckoutEmail } = require('../middleware/node-mailer/sendEmail');
const { sendCheckoutWhatsapp, sendCheckoutSMS } = require('../middleware/twilio/checkoutNotification');
const { ADMIN_EMAIL, ADMIN_PHONE } = require('../config');

const Cart = new CartsDao();
const Order = new OrdersDao();

const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productsRoutes);
router.use('/carts', cartsRoutes);
router.use('/users', usersRoutes);
router.use('/messages', messagesRoutes);

router.get('/', async (req, res) => {
  try {
    logger.info('[GET] => /');
    const user = req.user;
    if (user) {
      // res.render('home', { user });
      res.redirect('/products');
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

router.get('/messages', async (req, res) => {
  const user = req.user;
  res.status(200).render('messages/index.hbs', { user });
});

router.post('/checkout', async (req, res) => {
  const cartId = req.user.cart;
  try {
    const cart = await Cart.getByIdAndPopulate(cartId);
    const { items, email, address } = cart;
    const newOrder = { items, email, address, generated: true };
    await Order.save(newOrder);
    const mail = await sendCheckoutEmail(newOrder, ADMIN_EMAIL);
    res.send(mail);
  } catch (e) {
    logger.error(e);
  }
});

module.exports = router;
