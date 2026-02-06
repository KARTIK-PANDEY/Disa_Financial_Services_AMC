// Mongoose not used
const { User, sequelize } = require('../models');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        const adminEmail = 'admin@disa.com';
        const adminPassword = 'admin'; // Simple password for now
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        const [admin, created] = await User.findOrCreate({
            where: { email: adminEmail },
            defaults: {
                fullName: 'Admin User',
                email: adminEmail,
                phone: '0000000000',
                password: hashedPassword,
                role: 'Admin'
            }
        });

        if (created) {
            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
            // Optional: Update password if needed
            // admin.password = hashedPassword;
            // await admin.save();
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
