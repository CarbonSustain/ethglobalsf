require("dotenv").config();
const { ethers } = require("ethers");
const { Utils } = require("alchemy-sdk");

const ToucanModule = require("toucan-sdk");
const ToucanClient = ToucanModule.default;

// Constants for the environment
const SIGNER_PRIVATE_KEY = process.env.SIGNER_PRIVATE_KEY;
const BCT_CONTRACT_ADDRESS = process.env.BCT_CONTRACT_ADDRESS;
const network = process.env.NETWORK;

//const INFURA_URL = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;
const INFURA_URL =
  "https://celo-alfajores.infura.io/v3/a0197779450c4dd39c77477a591aa247";

console.log("INFURA_URL");
console.log(INFURA_URL);

// Connect to the Polygon network
const provider = new ethers.JsonRpcProvider(INFURA_URL);
console.log("Provider 1");

console.log("Provider 2");

const wallet = new ethers.Wallet(SIGNER_PRIVATE_KEY, provider);
console.log("Provider 3");

// Example: Purchasing BCT (Sending MATIC to a seller's address to get BCT)
async function getToucanData() {
  await provider
    .getBlockNumber()
    .then((blockNumber) => {
      console.log("Current block number:", blockNumber);
    })
    .catch((error) => {
      console.error("Error fetching block number:", error);
    });

  console.log("Provider 4");

  const toucan = new ToucanClient(network, provider, wallet);
  //const toucan = new ToucanClient(wallet);
  //const toucan = new ToucanClient(provider);
  const weiAmt = Utils.parseEther("0.001");

  console.log("Provider 5");
  const tco2addresses = await toucan.redeemAuto("NCT", weiAmt);
  console.log("tco2addresses " + tco2addresses);

  await toucan.retire(Utils.parseEther("0.001"), tco2addresses[0].address);
}

async function getToucanWei() {
  try {
    const valueInWei = Utils.parseEther("0.001");
    console.log("Value in wei:", valueInWei.toString());
  } catch (error) {
    console.error("Error in getToucanData:", error);
  }
}

async function purchaseBCT(bctContract, amountInBCT) {
  try {
    // Check your wallet balance before purchasing
    const balance = await provider.getBalance(wallet.address);

    console.log(`Your Celo balance: ${ethers.utils.formatEther(balance)} Celo`);

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

async function main() {
  getToucanWei();

  getToucanData();

  // BCT Contract instance
  const bctContract = new ethers.Contract(
    BCT_CONTRACT_ADDRESS,
    BCT_ABI,
    wallet
  );
  const amountInBCT = 0.001;

  getToucanData();

  //await purchaseBCT(bctContract, amountInBCT);

  //await testConnection();
}

main();
