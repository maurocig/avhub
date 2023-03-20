const { Router } = require('express');
const productsController = require('../controllers/products.controller');

const router = Router();

router.get('/', productsController.getAll);
router.get('/:id', productsController.getById);
router.post('/', productsController.save);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.delete);

router.get('/categories/:id', productsController.getByCategory);

module.exports = router;
