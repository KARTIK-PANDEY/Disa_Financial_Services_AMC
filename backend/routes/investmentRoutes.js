const express = require('express');
const router = express.Router();
const investmentController = require('../controllers/investmentController');

router.post('/', investmentController.createInvestment);
router.get('/:userId', investmentController.getUserInvestments);

module.exports = router;
