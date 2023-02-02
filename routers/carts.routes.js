const { Router } = require('express');
const cartsController = require('../controllers/carts.controller');

const router = Router();

router.get('/', cartsController.getAll);
router.get('/:id', cartsController.getById);
router.post('/', cartsController.saveCart);
router.put('/:id', cartsController.updateCart);
router.delete('/:id', cartsController.deleteCart);

router.post('/:cartId/:productId', cartsController.addItem);
router.delete('/:cartId/:itemId', cartsController.removeItem);

module.exports = router;
