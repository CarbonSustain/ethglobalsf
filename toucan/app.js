require("dotenv").config();
const { ethers } = require("ethers");
const ToucanModule = require("toucan-sdk");
const ToucanClient = ToucanModule.default;

// Constants for the environment
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
const BCT_CONTRACT_ADDRESS = process.env.BCT_CONTRACT_ADDRESS;
const network = process.env.NETWORK;

const INFURA_URL = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;
console.log("INFURA_URL");
console.log(INFURA_URL);

// Connect to the Polygon network
const provider = new ethers.JsonRpcProvider(INFURA_URL);
const wallet = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider);
//const toucan = new ToucanClient("alfajores", provider, wallet);
const toucan = new ToucanClient("alfajores", provider, wallet);

async function getToucanData() {
  nctPrice = await toucan.fetchTokenPriceOnDex("NCT");

  const nct = await toucan.getPoolContract("NCT");
  const tco2 = await toucan.getTCO2Contract(tco2Address);
  const registry = await toucan.getRegistryContract();
  const remainingTCO2 = await nct.tokenBalances(tco2Address);

  console.log("nctPrice " + nctPrice);
  console.log("nct " + nct);
  console.log("registry " + registry);
  console.log("remainingTCO2 " + remainingTCO2);
}

getToucanData();

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

const getBalance = async () => {
  try {
    const balance = await wallet.getBalance(); // Fetch balance in Wei
    console.log(`Wallet balance: ${ethers.utils.formatEther(balance)} ETH`);
  } catch (error) {
    console.error("Error fetching balance:", error);
  }
};

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
const amountInBCT = 10; // How much BCT you want to buy

purchaseBCT(BCT_CONTRACT_ADDRESS, amountInBCT);

testConnection();
