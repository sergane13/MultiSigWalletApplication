import { useState, useEffect } from "react";
import { addressContract, contractAbi } from "./CreatingWebConnection.js";

const ethers = require("ethers");
const utils = require("ethers").utils;

function FundContract(props) {
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    GetBalance();
  }, []);

  async function GetBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(addressContract);
    setBalance(ethers.utils.formatEther(balance));
  }
  async function SendEthContract() {
    if (window.ethereum) {
      try {
        const tx = {
          to: addressContract,
          value: utils.parseEther("4.0"),
          chainId: "31337",
        };

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const confirmationTx = await signer.sendTransaction(tx);

        if (confirmationTx) {
          alert("Contract Funded");
          setBalance(balance + 4);
        }
      } catch (error) {
        alert("error");
      }
    }
  }

  return (
    <div class="container">
      <div class="row my-2">
        <h5>Address</h5>
        <h6>{addressContract}</h6>
      </div>
      <div class="container my-5">
        <div class="row my-2"> Eth stored: {balance} </div>
        <div class="row my-2"> Minimum Confirmations: 1</div>
        <div class="row my-2"> Total tx number: </div>
        <div class="row my-4">
          <button class="btn btn-success" onClick={SendEthContract}>
            Fund Contract +4 eth
          </button>
        </div>
      </div>
    </div>
  );
}

export default FundContract;
