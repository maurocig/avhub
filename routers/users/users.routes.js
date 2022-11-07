const { Router } = require('express');
const usersController = require('../../controllers/users.controller');

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUsersById);
router.post('/', usersController.saveUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);
// router.post('/populate', usersController.populate);

module.exports = router;
