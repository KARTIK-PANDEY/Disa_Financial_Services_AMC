const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const investmentRoutes = require('./routes/investmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatRoutes = require('./routes/chatRoutes');
const sipRoutes = require('./routes/sipRoutes'); // ✅ NEW SIP AI Route

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);      // Gemini Chatbot API
app.use('/api/sip', sipRoutes);        // ✅ Gemini SIP Explanation API

// Root Route
app.get('/', (req, res) => {
    res.send('Disa Financial Services API is running');
});

// Database Sync and Server Start
sequelize.sync()
    .then(() => {
        console.log('Database connected and synced');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
