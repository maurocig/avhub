const express = require('express');
const passport = require('../middleware/passport');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/avatars');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post(
  '/register',
  upload.single('image'),
  passport.authenticate('signup', {
    failureRedirect: '/signup-error',
    successRedirect: '/',
  })
);

router.post(
  '/login',
  passport.authenticate('signin', {
    failureRedirect: '/signin-error',
    successRedirect: '/',
  })
);

module.exports = router;
