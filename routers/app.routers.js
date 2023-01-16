const { Router } = require('express');
const productsRoutes = require('./products/products.routes');
const cartsRoutes = require('./carts/carts.routes');
const authRoutes = require('./auth/auth.routes');

const router = Router();

router.use('/auth', authRoutes);
router.use('/api/products', productsRoutes);
router.use('/api/carts', cartsRoutes);

router.get('/', async (req, res) => {
  console.log('[GET] => /');
  const user = req.user;
  if (user) {
    res.send('homepage');
  } else {
    res.redirect('login');
  }
});

router.get('/login', async (req, res) => {
  console.log('[GET] => /login');
  res.sendFile('login.html', { root: 'public' });
});

router.get('/register', async (req, res) => {
  console.log('[GET] => /register');
  res.sendFile('register.html', { root: 'public' });
});

module.exports = router;
