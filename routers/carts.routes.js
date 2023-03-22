const { Router } = require('express');
const methodOverride = require('method-override');
const cartsController = require('../controllers/carts.controller');

const router = Router();

router.use(methodOverride('_method'));

router.get('/', cartsController.getCarts);
router.get('/:id', cartsController.getCartsById);
router.post('/', cartsController.saveCart);
router.put('/:id', cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);

router.post('/:cartId/:productId', cartsController.addToCart);
router.delete('/:cartId/:itemId', cartsController.removeFromCart);

module.exports = router;
