import React, { useState } from 'react';
import { ethers, parseUnits } from 'ethers';

const App = () => {
    const [message, setMessage] = useState('');

    const handleTransferTokens = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum); // Use BrowserProvider
            const signer = await provider.getSigner();

            const cstTokenAddress = '0xEC3De877136145D53172f0a8A6E40cc2eA142104'; // CST token contract address
            const recipientAddress = '0x218E85782dcD225c6646Df190dAF627c21374BA7'; // Recipient address
            
            const cstTokenAbi = [
                "function transfer(address recipient, uint256 amount) public returns (bool)"
            ];

            const cstTokenContract = new ethers.Contract(cstTokenAddress, cstTokenAbi, signer);

            const amount = parseUnits('50', 18); // Amount of tokens to send (50 CST)

            // Transfer tokens
            const tx = await cstTokenContract.transfer(recipientAddress, amount);
            await tx.wait(); // Wait for the transaction to be processed

            setMessage(`Successfully transferred 500 CST to ${recipientAddress}.`);
        } catch (error) {
            console.error('Error transferring tokens:', error);
            setMessage(`Error transferring tokens: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>CarbonSustain Token Transfer</h1>
            <button onClick={handleTransferTokens}>Send 500 CST Tokens</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
