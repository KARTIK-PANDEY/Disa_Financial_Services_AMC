const sequelize = require('../config/database');
const User = require('./User');
const Investment = require('./Investment');
const Contact = require('./Contact');

// Associations
User.hasMany(Investment, { foreignKey: 'userId' });
Investment.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    User,
    Investment,
    Contact
};
