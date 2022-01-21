import { useEffect } from "react";

const ethers = require("ethers");
const utils = require("ethers").utils;

const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function SetConnectionWithProvider(props) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  props.setSigner(signer);
  props.setAddress(addressContract);

  const contractAbi = [
    "function getId() view returns(uint256)",
    "function submit(address recipient, uint256 value, bytes calldata data)",
    "function approve(uint txId)",
    "function execute(uint txId)",
    "function revokeApproval(uint txId)",
  ];

  const contract = new ethers.Contract(addressContract, contractAbi, signer);

  props.setContract(contract);

  return "";
}

export default SetConnectionWithProvider;
