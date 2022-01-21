const hre = require("hardhat");

async function main() {
  const multiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await multiSigWallet.deploy(
    [
      "0xd6613bd2bb0E63609346B3dE0f43EF7df716C6D1",
      "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    ],
    1
  );
  //const contract = await multiSigWallet.deploy(120);

  //console.log()
  console.log("Contract deployed to address:", contract.address);
}

// this is a promise
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
