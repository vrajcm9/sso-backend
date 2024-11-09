const express = require('express');
const passport = require('passport');
const router = express.Router();
const axios = require('axios');
const User = require('../models/userModel');


router.get('/auth/google', (req, res) => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: 'http://localhost:4000/api/auth/google/callback',
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ].join(' '),
    };
  
    const qs = new URLSearchParams(options);
    
    res.redirect(`${rootUrl}?${qs.toString()}`);
  });

router.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;

    try {
        // Exchange authorization code for access token
        const tokenResponse = await axios({
            url: 'https://oauth2.googleapis.com/token',
            method: 'post',
            data: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: 'http://localhost:4000/api/auth/google/callback',
                grant_type: 'authorization_code',
                code,
            }
        });

        const { access_token } = tokenResponse.data;

        // Now use the access token to get user info from Google
        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const user = userInfoResponse.data; // User details retrieved from Google
        
        // Check if user already exists
        let userData = await User.findOne({ googleId: user.id });
        if (!userData) {
            userData = await new User({
                googleId: user.id,
                displayName: user.given_name,
                email: user.email,
                image: user.picture
            }).save();
        }
        // Redirect back to the frontend with the user info and token
        res.redirect(`http://localhost:3000?token=${tokenResponse.data.id_token}&userId=${(user.id)}`);
    } catch (error) {
        console.error('Error during callback:', error);
        res.redirect('/'); // Handle error scenario
    }
});

router.get('/auth/logout', (req, res) => {
    res.redirect('http://localhost:3000');
});

router.get('/user', async (req, res) => {
    let userid  = req.query.userId;
    const userData = await User.findOne({ googleId: userid });
    res.send(userData);
});

module.exports = router;
