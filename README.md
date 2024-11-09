# Backend App.js Documentation

## Overview

The `app.js` file is the main entry point of the backend Node.js application for the Single Sign-On (SSO) Request Management System. It sets up the Express server, middleware, and routes for handling API requests. This file also establishes a connection to MongoDB and serves the built React frontend application.

## Structure

The `app.js` file consists of the following sections:

1. **Imports**: Required libraries and modules.
2. **Middleware Setup**: Configuring middleware for handling requests.
3. **Database Connection**: Connecting to MongoDB.
4. **Route Handling**: Defining the API routes for authentication, notifications, and requests.
5. **Starting the Server**: Configuring the server to listen for incoming requests.


path: Used for handling file and directory paths.
express: The web framework used to build the API.
cors: Middleware for enabling Cross-Origin Resource Sharing.
mongoose: ODM (Object Data Modeling) library for MongoDB.
cookie-session: Middleware for managing cookie sessions.
passport: Middleware for handling authentication.

## Steps to implement

1. **Navigate to the Backend Directory:**
   - Open a terminal and change to the backend directory.

2. **Install Dependencies:**
   - Run `npm install` to install all required packages.

3. **Set Up Environment Variables:**
   - Create a `.env` file in the backend directory.
   - Add the following variables:
     - `MONGODB_URI=<your_mongodb_connection_string>` (Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string).
     - `COOKIE_KEY=<your_cookie_key>` (Replace `<your_cookie_key>` with a secure key for cookie encryption).

4. **Run the Backend Application:**
   - Start the server by running `node app.js` or `npm start`.
   - Ensure that the server is running on `http://localhost:4000`.

## Running the Application

1. **Start the Backend:**
   - Make sure the backend server is running on `http://localhost:4000`.

2. **Start the Frontend:**
   - Ensure that the frontend is running on `http://localhost:3000`.

3. **Authenticate with Google:**
   - Visit `http://localhost:3000` in your browser.
   - Click on the login button to authenticate with Google.

4. **Manage Requests:**
   - Once logged in, you can view and manage requests and approvals.






# Testing Mail Notification Service with Ethereal

## Overview

The mail notification service in the SSO Request Management System can be tested using Ethereal, a fake SMTP service that allows you to send and receive emails without actually sending them to real email addresses. This is particularly useful for development and testing purposes, as it helps you verify email functionality without the need for a live email account.

## Steps to Test Mail Notifications

### Step 1: Create an Ethereal Account

1. **Visit Ethereal:**
   - Go to the [Ethereal website](https://ethereal.email/).

2. **Sign Up:**
   - Click on "Create Ethereal Account" to generate a new account.
   - Ethereal will provide you with an email address and SMTP configuration settings, including the server, port, user, and password.

### Step 2: Update Your Backend Configuration

1. **Open the Backend Directory:**
   - Navigate to the directory where your backend code is located.

2. **Locate the Email Configuration:**
   - Find the part of your code where the email service is configured (usually within the notification service).

3. **Update SMTP Settings:**
   - Replace the existing SMTP settings with the ones provided by Ethereal. Here is an example configuration:

   ```javascript
   const nodemailer = require('nodemailer');

   const transporter = nodemailer.createTransport({
       host: 'smtp.ethereal.email',
       port: 587,
       auth: {
           user: '<your_ethereal_username>', // Ethereal username
           pass: '<your_ethereal_password>'  // Ethereal password
       }
   });
