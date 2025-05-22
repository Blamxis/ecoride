const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.post('/register', (req, res) => AuthController.register(req, res));

module.exports = router;
