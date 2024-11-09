const express = require('express');
const { sendEmail } = require('../services/notificationService');
const router = express.Router();

router.post('/', (req, res) => {
    const { to, subject, text } = req.body;
    sendEmail(to, subject, text)
        .then(() => res.status(200).send('Email sent'))
        .catch(err => res.status(500).send('Error sending email: ' + err));
});

module.exports = router;
