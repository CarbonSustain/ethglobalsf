import React, { useState } from 'react';
import { ethers, parseUnits } from 'ethers';

const App = () => {
    const [amount, setAmount] = useState(''); // State to hold the token amount
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

            const tokenAmount = parseUnits(amount, 18); // Convert the amount input to the appropriate units

            // Transfer tokens
            const tx = await cstTokenContract.transfer(recipientAddress, tokenAmount);
            console.log('Transaction Hash:', tx.hash); // Log the transaction hash
            console.log('Transaction Details:', tx); // Log the full transaction object

            await tx.wait(); // Wait for the transaction to be processed
            console.log('Transaction confirmed in block:', tx.blockNumber); // Log the block number

            setMessage(`Successfully transferred ${amount} CST to ${recipientAddress}.`);
        } catch (error) {
            console.error('Error transferring tokens:', error);
            setMessage(`Error transferring tokens: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>CarbonSustain Token Transfer</h1>
            <input 
                type="text" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Enter amount to send" 
            />
            <button onClick={handleTransferTokens}>Send CST Tokens</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default App;
