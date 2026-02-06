const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// Public route to submit form
router.post('/', contactController.createContact);

// Admin route (technically should be protected, but for simplicity assuming admin checks happen on retrieval or frontend for now, or we can reuse admin middleware if we want)
// For now, let's keep it public or we can add it to adminRoutes. 
// Actually, standard practice: POST /contact is public. GET /contact is admin only.
// Users usually don't need to see their submitted contact forms.

module.exports = router;
