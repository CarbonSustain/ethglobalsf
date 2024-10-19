Getting Messages via Telegram and XMTP
1. Running the Broadcast Bot
To receive a message when a token is sent to another address, you must first run node src/index.js in the broadcast-bot directory before sending any tokens.

2. Telegram Integration
If you want to receive messages via Telegram, follow these steps:

First, register with t.me/CST2024_bot.
Change the TELEGRAM_CHAT_ID in your configuration to your own Telegram user ID.
To find your user ID, message /userinfobot with /start. The bot will reply with your user ID, which you should set as TELEGRAM_CHAT_ID.

3. XMTP Integration
To receive messages via Converse (messages come from XMTP), follow these steps:

Change the XMTP_PRIVATE_KEY to your Ethereum address.
Log in to Converse using MetaMask to get your Ethereum address, then set it as the XMTP_PRIVATE_KEY.
However, there is currently an issue where the system says the address is undefined. We need to go to the booth tomorrow to resolve this issue.


Todo:
Centralization vs. Decentralization
Telegram is a centralized service, meaning messages are stored and managed on Telegram's servers. If Telegram's servers go down or access is blocked, you could lose access to your messages.

XMTP, on the other hand, is a decentralized messaging protocol that uses blockchain technology to send messages across a distributed network. This ensures greater data ownership and privacy by allowing direct user-to-user connections without relying on a central service.

Due to this difference in architecture, it's difficult to directly send messages from XMTP to Telegram. As a solution, we need to first receive the message in XMTP (e.g., via Converse) and then forward it to the Telegram bot.

