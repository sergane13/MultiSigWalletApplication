const { ethers } = require("ethers");
const utils = require("ethers").utils;

// scripts/index.js
async function main() {
  const address = "0xd6613bd2bb0e63609346b3de0f43ef7df716c6d1";

  const SECRET_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

  let provider = new ethers.providers.JsonRpcProvider();
  //connects to the choosen framework in command line
  //console.log(provider);

  tx = {
    to: address,
    value: utils.parseEther("300.0"),
  };

  //
  const signer = new ethers.Wallet(SECRET_KEY, provider);
  //await signer.signTransaction(tx);

  //const Signer = signer.connect(provider);

  const confirmation = await signer.sendTransaction(tx);
  console.log(confirmation);

  //console.log(await provider.getBalance(address))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
