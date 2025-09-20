// A simple Node.js server to handle push notifications.
// This file needs to be run on your local machine.

const express = require('express');
const bodyParser = require('body-parser');
const webpush = require('web-push');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Allow cross-origin requests from your HTML file

// VAPID keys - These must match the keys from your Firebase project.
// Public key from the user's input: BGi_92JYirDg4kk-XupSghiwd5QoKel2extirMxTxFYxvdUnpMo2rC5Esgkojv6Y1yk32hM2CexuqkbZlgenX4
// The private key is not exposed and should be generated securely.
const vapidKeys = {
    "publicKey": "BGi_92JYirDg4kk-XupSghiwd5QoKel2extirMxTxFYxvdUnlMoo2rC5Esgkojv6Y1yk32hM2CexuqkbZlgenX4",
    // NOTE: Replace this with your actual Firebase private key.
    // It is confidential and should never be hardcoded in production.
    "privateKey": "YOUR_FCM_PRIVATE_KEY_HERE"
};

webpush.setVapidDetails(
    'mailto:sushil@example.com', // Replace with your email address
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

app.post('/send-push', (req, res) => {
    const subscription = req.body.subscription;
    const payload = req.body.payload;

    if (!subscription || !payload) {
        return res.status(400).send('Invalid request body');
    }

    // Send the notification
    webpush.sendNotification(subscription, JSON.stringify(payload))
        .then(() => {
            console.log('Push notification sent successfully!');
            res.status(200).send('Notification sent');
        })
        .catch(error => {
            console.error('Error sending push notification:', error);
            res.status(500).send('Error sending notification');
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
