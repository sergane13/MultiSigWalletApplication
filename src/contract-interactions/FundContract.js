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
        <h6>
          {" "}
          <a href="https://rinkeby.etherscan.io/address/0x3363504Fe39A0cedD211547BE70898De5041fEc5">
            {addressContract}
          </a>
        </h6>
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
      <div class="d-flex mt-auto text-light">Owner 1 address: 0xd6613bd...</div>
      <div class="d-flex mt-auto text-light">Owner 2 address: 0x1d2A9B5...</div>
      <div class="d-flex mt-auto text-light">Owner 3 address: 0x7099797...</div>
      <div class="d-flex my-4">
        <div class="text-light">Deployed: Rinkeby Testnet</div>
      </div>
      <div class="d-flex my-4">Made by Serban C.</div>
      <div></div>
    </div>
  );
}

export default FundContract;
