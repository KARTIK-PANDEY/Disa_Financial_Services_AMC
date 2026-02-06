const { Contact } = require('../models');

exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            phone,
            message
        });

        res.status(201).json({ message: 'Contact request submitted successfully', contact });
    } catch (error) {
        console.error('Create Contact Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.json(contacts);
    } catch (error) {
        console.error('Get Contacts Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
