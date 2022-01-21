import { useState } from "react";
import SetConnectionWithProvider from "./CreatingWebConnection.js";

const ethers = require("ethers");
const utils = require("ethers").utils;

function FundContract(props) {
  const [addressContract, setAddress] = useState("");
  const [signer, setSigner] = useState([]);

  async function SendEthContract() {
    if (window.ethereum) {
      try {
        const tx = {
          to: addressContract,
          value: utils.parseEther("4.0"),
          chainId: "31337",
        };
        const confirmationTx = await signer.sendTransaction(tx);

        if (confirmationTx) {
          alert("Contract Funded");
        }
      } catch (error) {
        alert("Error");
      }
    }
  }

  return (
    <div class="container">
      <SetConnectionWithProvider
        setAddress={setAddress}
        setSigner={setSigner}
      />
      <div class="row my-2">
        <h5>Address</h5>
        <h6>0x5FbDB2315678afecb367f032d93F642f64180aa3</h6>
      </div>
      <div class="container my-5">
        <div class="row my-2"> Eth stored: </div>
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
