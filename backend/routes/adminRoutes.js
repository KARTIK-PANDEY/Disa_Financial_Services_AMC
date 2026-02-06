const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to check if user is admin (simplified for now)
// In a real app, you would verify the JWT token here
const isAdmin = (req, res, next) => {
    // For now, we trust the frontend or we just allow access. 
    // Ideally, we should check req.user.role === 'admin' after verifying token.
    // Since we haven't implemented full JWT verification middleware yet, I'll skip strict check 
    // but typically it goes here.
    next();
};

router.get('/users', isAdmin, adminController.getAllUsers);
router.get('/investments', isAdmin, adminController.getAllInvestments);
router.get('/contacts', isAdmin, adminController.getAllContacts);
router.get('/stats', isAdmin, adminController.getStats);

module.exports = router;
