import { useState } from "react";
import { addressContract, contractAbi } from "./CreatingWebConnection.js";

const ethers = require("ethers");
const utils = require("ethers").utils;

function CreateTx(props) {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);

  function SetAddress(event) {
    setAddress(event.target.value);
  }

  function SetAmount(event) {
    setAmount(event.target.value);
  }

  async function SubmitTransaction(event) {
    event.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, contractAbi, signer);

    if (address.length < 1) {
      alert("Invalid Address");
      return;
    }
    if (amount < 1) {
      alert("Amount must be positive");
      return;
    }

    try {
      const submission = await contract.submit(address, amount, "0x00");
      if (submission) {
        //props.setNewTxSubmited();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div class="card my-4">
      <div class="card-header">
        <h4 class="text-dark">Create Tx</h4>
      </div>
      <div class="card-body">
        <form onSubmit={SubmitTransaction}>
          <div class="form-group">
            <h5 class="form-label text-start">Address To send: </h5>
            <input
              onChange={SetAddress}
              class="form-control w-75"
              disabled={props.trigger}
            ></input>
          </div>
          <div class="form-group my-4">
            <h5 class="form-label text-start">Amount to send: </h5>
            <input
              onChange={SetAmount}
              class="form-control w-50"
              disabled={props.trigger}
            ></input>
          </div>
          <div class="d-flex">
            <button type="submit" value="Submit" class="btn btn-primary my-2">
              {" "}
              Submit Tx
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTx;
