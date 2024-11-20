require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (e.g., your HTML form)
app.use(express.static('public'));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message || !validateEmail(email)) {
        return res.status(400).send('Invalid input');
    }

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Replace with your email address
        subject: 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Failed to send message');
        }
        res.send('Message sent successfully!');
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
