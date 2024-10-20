require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17", // Set the Solidity version according to your contract
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/2fcbf5953e8943dfaa0e71430c9f1916`, // Replace with your Infura project ID
      accounts: [`e0e14cfe7019c9c0d211a661ab4c317090bcff89d0b3fc4a53faeaefeb98db3f`], // Replace with your Sepolia MetaMask account private key
    }
  }
};