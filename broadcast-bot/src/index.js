const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { Client } = require('@xmtp/xmtp-js');
const ethers = require('ethers');
require('dotenv').config();

const app = express();
const PORT = 3001;

// CORS configuration
app.use(cors());
app.use(bodyParser.json());

// Handle root route
app.get('/', (req, res) => {
    res.send('Server is running.');
});
console.log('Recipient address:', process.env.XMTP_RECIPIENT_ADDRESS);
// Initialize XMTP client function
async function sendXmtpMessage(wallet, message) {
    try {
        console.log('Initializing XMTP client...');
        const xmtp = await Client.create(wallet);
        console.log('XMTP client initialized.');
        const conversation = await xmtp.conversations.newConversation(process.env.XMTP_RECIPIENT_ADDRESS);
        
        // Send message via XMTP
        await conversation.send(message);
        console.log('XMTP Message sent:', message);
    } catch (error) {
        console.error('Error sending XMTP message:', error);
    }
}

// Function to send a Telegram message
async function sendTelegramMessage(message) {
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

    const response = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            chat_id: telegramChatId,
            text: message
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Telegram API Error: ${errorData.description}`);
    }

    console.log('Telegram Message sent:', message);
}

// Endpoint to receive transaction information
app.post('/send-transaction', async (req, res) => {
    const { hash, from, to, value, timestamp } = req.body;

    const message = `
    Transaction Details:
    Hash: ${hash}
    From: ${from}
    To: ${to}
    Value: ${value}
    Timestamp: ${timestamp}
    `;

    console.log('Received transaction:', message);

    // Send message to XMTP and Telegram
    try {
        const wallet = ethers.Wallet.createRandom();
        console.log('Sending XMTP message...');
        await sendXmtpMessage(wallet, message);

        console.log('Sending Telegram message...');
        await sendTelegramMessage(message);

        res.status(200).send('Transaction broadcasted successfully.');
    } catch (error) {
        console.error('Error broadcasting transaction:', error);
        res.status(500).send('Error broadcasting transaction.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
