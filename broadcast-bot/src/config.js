// src/config.js
require('dotenv').config();

module.exports = {
    telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
    xmtpPrivateKey: process.env.XMTP_PRIVATE_KEY
};
