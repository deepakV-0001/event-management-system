// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');

// Initialize express router
const router = express.Router();

// Auth routes
// POST /api/auth/register - Register a new user
router.post('/register', authController.register);

// POST /api/auth/login - Login user
router.post('/login', authController.login);

module.exports = router;