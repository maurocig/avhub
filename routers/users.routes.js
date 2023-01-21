const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const multer = require('multer');
const fs = require('fs');

const router = Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUserById);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
