const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/auth');

// Public
router.post('/register', authController.register);
router.post('/login', authController.login);

// Privée (protégée par token)
router.get('/me', verifyToken, (req, res) => {
  res.json({
    message: 'Profil utilisateur récupéré',
    user: req.user
  });
});

module.exports = router;
