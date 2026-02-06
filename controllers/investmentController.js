const { Investment } = require('../models');

exports.createInvestment = async (req, res) => {
    try {
        const { userId, type, amount, details } = req.body;

        const investment = await Investment.create({
            userId,
            type,
            amount,
            details
        });

        res.status(201).json({ message: 'Investment request created', investment });
    } catch (error) {
        console.error('Create Investment Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getUserInvestments = async (req, res) => {
    try {
        const { userId } = req.params;
        const investments = await Investment.findAll({ where: { userId } });
        res.json(investments);
    } catch (error) {
        console.error('Get Investments Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
