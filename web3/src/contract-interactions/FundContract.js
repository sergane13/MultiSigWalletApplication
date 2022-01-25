import { parse } from "@ethersproject/transactions";
import { useState, useEffect } from "react";
import {
  addressContract,
  contractAbi,
} from "../info-contract/ContractDetails.js";

const ethers = require("ethers");
const utils = require("ethers").utils;

function FundContract(props) {
  const [balance, setBalance] = useState(0.0);
  const [txCount, setTxCount] = useState(0);

  useEffect(() => {
    GetBalance();
  }, []);

  async function GetBalance() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balanceContract = await provider.getBalance(addressContract);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, contractAbi, signer);

    const nrTx = await contract.callStatic.getTxCount();

    setTxCount(nrTx.toNumber());
    setBalance(ethers.utils.formatEther(balanceContract));
  }

  // fund contract with +4 eth
  async function SendEthContract() {
    if (window.ethereum) {
      try {
        const tx = {
          to: addressContract,
          value: utils.parseEther("0.05"),
          chainId: "31337",
        };

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        await signer.sendTransaction(tx).then(() => {
          alert("Contract Funded");
          GetBalance();
        });
      } catch (error) {
        alert(error);
      }
    }
  }

  return (
    <div class="container font-link">
      <div class="row my-2">
        <h5>Address</h5>
        <h6>{addressContract}</h6>
      </div>
      <div class="container my-5">
        <div class="row my-2"> Eth stored: {balance} </div>
        <div class="row my-2"> Minimum Confirmations: 1</div>
        <div class="row my-2"> Total transactions: {txCount} </div>
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
