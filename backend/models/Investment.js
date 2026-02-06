const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Investment = sequelize.define('Investment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true // Changed to allow Guest requests
    },
    type: {
        type: DataTypes.STRING, // e.g., 'Mutual Fund', 'Stock', 'SIP Interest'
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    details: {
        type: DataTypes.JSON, // Store JSON details like fund name, units, etc.
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending' // pending, completed, cancelled
    }
});

module.exports = Investment;
