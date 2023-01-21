const { Router } = require('express');
const cartsController = require('../controllers/carts.controller');

const router = Router();

router.get('/', cartsController.getCarts);
router.get('/:id', cartsController.getCartsById);
router.post('/', cartsController.saveCart);
router.put('/:id', cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);

router.post('/:cartId/:productId', cartsController.addToCart);
router.delete('/:cartId/:productId', cartsController.removeFromCart);

module.exports = router;
