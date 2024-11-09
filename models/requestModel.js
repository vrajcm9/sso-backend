const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: {type: String, enum: ["Leave", "Equipment", "Overtime"] },
    urgency: String,
    supervisorEmail: {
        type: String,
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          'Please enter a valid email',
        ],
      },
    googleId: String,
    userEmail: {
        type: String,
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          'Please enter a valid email',
        ],
      },
    status: { type: String, default: 'Pending', enum: ["Pending", "Approved", "Rejected" ] }
});

module.exports = mongoose.model('Request', requestSchema);
