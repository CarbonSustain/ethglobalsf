require("dotenv").config();
const { Web3 } = require("web3");
const BCT_CONTRACT_ADDRESS = process.env.BCT_CONTRACT_ADDRESS;

async function main() {
  // Configuring the connection to the Polygon node
  const network = process.env.NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  );

  web3.eth.accounts.wallet.add(signer);
  const gasPrice = await web3.eth.estimateGas();

  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: BCT_CONTRACT_ADDRESS,
    value: web3.utils.toWei("0.001", "ether"),
    gas: gasPrice,
  };

  // Assigning the right amount of gas

  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendTransaction(tx)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`Transaction hash: ${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

main();
