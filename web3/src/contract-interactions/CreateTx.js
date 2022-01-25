import { useState } from "react";
import {
  addressContract,
  contractAbi,
} from "../info-contract/ContractDetails.js";

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

  function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, contractAbi, signer);
    return contract;
  }

  //Submit tx
  async function SubmitTransaction(event) {
    event.preventDefault();

    const contract = getContract();

    if (address.length < 1) {
      alert("Invalid Address");
      return;
    }
    if (amount < 0.01) {
      alert("Amount must be > 0.01 eth");
      return;
    }

    try {
      const submission = await contract.submit(
        address,
        utils.parseEther(amount),
        "0x00"
      );
      if (submission) {
        alert("Tx submited");
        props.setTxSubmited(true);
      }
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div class="card my-4 font-link">
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
              disabled={props.value}
            ></input>
          </div>
          <div class="form-group my-4">
            <h5 class="form-label text-start">Amount to send: </h5>
            <input
              onChange={SetAmount}
              class="form-control w-50"
              disabled={props.value}
            ></input>
          </div>
          <div class="d-flex">
            {!props.value ? (
              <button type="submit" value="Submit" class="btn btn-primary my-2">
                {" "}
                Submit Tx
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTx;
