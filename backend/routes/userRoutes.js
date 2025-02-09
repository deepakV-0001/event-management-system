// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Initialize express router
const router = express.Router();

// Apply authentication middleware to all routes below
router.use(protect); // All routes after this line will require authentication

// User routes
// GET /api/users/profile - Get user profile
router.get('/profile', userController.getProfile);

// PATCH /api/users/profile - Update user profile
router.patch('/profile', userController.updateProfile);

module.exports = router;