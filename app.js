const path = require('path');
const express = require('express');
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const requestRoutes = require('./routes/requestRoutes');
require('dotenv').config();

const app = express();

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.56.1:3000', 
    'https://requestmanagement.netlify.app'
  ], // Update this with the origin of your frontend application
  credentials: true // Allow credentials to be included in requests
}));

// Middleware
app.use(express.json());
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/requests', requestRoutes);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });


// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
