const { Router } = require('express');
const usersController = require('../controllers/users.controller');
const multer = require('multer');
const fs = require('fs');

const router = Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getById);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;
