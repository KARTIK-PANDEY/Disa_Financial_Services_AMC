const { User, Investment } = require('../models');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }, // Don't send passwords
            order: [['createdAt', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        console.error('Get All Users Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllInvestments = async (req, res) => {
    try {
        const investments = await Investment.findAll({
            include: [{
                model: User,
                attributes: ['fullName', 'email', 'phone']
            }],
            order: [['createdAt', 'DESC']]
        });
        res.json(investments);
    } catch (error) {
        console.error('Get All Investments Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const { Contact } = require('../models');

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(contacts);
    } catch (error) {
        console.error('Get All Contacts Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const totalInvestments = await Investment.count();
        const totalInquiries = await Contact.count();

        res.json({
            users: totalUsers,
            investments: totalInvestments,
            inquiries: totalInquiries
        });
    } catch (error) {
        console.error('Get Stats Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
