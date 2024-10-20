const { ethers } = require("hardhat");

async function main() {
  //console.log("Starting deployment process...");

  // Get the contract factory for CarbonSustainToken
  const CarbonSustainToken = await ethers.getContractFactory("CarbonSustainToken");
  //console.log("Contract factory for CarbonSustainToken obtained successfully.");

  // Define the initial supply (adjust as needed)
  const initialSupply = 1;
  //console.log("Initial token supply to be minted:", initialSupply);

  // Deploy the CarbonSustainToken contract with the initial supply
  const token = await CarbonSustainToken.deploy(initialSupply);
  //console.log("Token deployment transaction sent. Waiting for confirmation...");

  // Wait for the contract to be deployed
  await token.waitForDeployment()
  //console.log("Contract deployed successfully to address:", token.target);

  // Get the address of the deployed contract using `.target`
  const contractAddress = token.target;
  console.log("Contract deployed at address:", contractAddress);
}

// Catch any errors and display them
main().catch((error) => {
  //console.error("Error during contract deployment:", error);
  process.exitCode = 1;
});