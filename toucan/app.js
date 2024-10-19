require("dotenv").config();
const { ethers } = require("ethers");

// Constants for the environment
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
const BCT_CONTRACT_ADDRESS = process.env.BCT_CONTRACT_ADDRESS;

const INFURA_URL = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;
console.log("INFURA_URL");
console.log(INFURA_URL);

// Connect to the Polygon network
const provider = new ethers.providers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider);

// BCT Token ABI (Minimum ABI for interacting with ERC20 tokens)
const BCT_ABI = [
  // Transfer
  "function transfer(address to, uint amount) external returns (bool)",
  // Approve
  "function approve(address spender, uint amount) external returns (bool)",
  // Allowance
  "function allowance(address owner, address spender) external view returns (uint)",
  // Balance of
  "function balanceOf(address account) external view returns (uint)",
  // Decimals
  "function decimals() view returns (uint8)",
];

// BCT Contract instance
const bctContract = new ethers.Contract(BCT_CONTRACT_ADDRESS, BCT_ABI, wallet);

// Example: Purchasing BCT (Sending MATIC to a seller's address to get BCT)
async function purchaseBCT(sellerAddress, amountInBCT) {
  try {
    // Check your wallet balance before purchasing
    const balance = await wallet.getBalance();
    console.log(
      `Your MATIC balance: ${ethers.utils.formatEther(balance)} MATIC`
    );

    // Calculate BCT amount in decimals
    const decimals = await bctContract.decimals();
    const amountToBuy = ethers.utils.parseUnits(
      amountInBCT.toString(),
      decimals
    );

    // Send the transaction to the seller
    const tx = await bctContract.transfer(sellerAddress, amountToBuy);
    await tx.wait(); // Wait for the transaction to be mined
    console.log(`Purchased ${amountInBCT} BCT from ${sellerAddress}`);
  } catch (err) {
    console.error("Error purchasing BCT:", err);
  }
}

async function testConnection() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log(
      "Connected to Polygon network. Current block number:",
      blockNumber
    );
  } catch (error) {
    console.error("Failed to connect to the Polygon network:", error);
  }
}

// Example usage
const sellerAddress = "0xSellerAddress"; // Address of the entity selling the BCT
const amountInBCT = 10; // How much BCT you want to buy

purchaseBCT(sellerAddress, amountInBCT);

testConnection();
