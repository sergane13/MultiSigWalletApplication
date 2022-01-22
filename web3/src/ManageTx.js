import { useEffect, useState } from "react";
import {
  addressContract,
  contractAbi,
} from "./info-contract/ContractDetails.js";

const ethers = require("ethers");
const utils = require("ethers").utils;

function ManageTx(props) {
  const [addressSender, setAddressSender] = useState("0x00");
  const [value, setValue] = useState(0);
  const [numberOfConfirmations, setConfirmations] = useState(0);

  useEffect(() => {
    GetContractDetailes();
  }, []);

  async function GetContractDetailes() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, contractAbi, signer);

    const submitedTx = await contract.callStatic.getLastTx();

    if (submitedTx && !submitedTx[2]) {
      setAddressSender(submitedTx[0]);
      setValue(ethers.utils.formatEther(submitedTx[1]));
      setConfirmations(submitedTx[3].toNumber());

      props.setTxSumbited(!submitedTx[2]);
    }
  }

  async function ApproveTx() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, contractAbi, signer);

    const getLastTxIndex = await contract.callStatic.getTxCount();
    console.log(getLastTxIndex.toNumber());
    await contract.approve(getLastTxIndex.toNumber() - 1);

    alert("Tx aproved");
  }

  async function ExecuteTx() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, contractAbi, signer);

    const getLastTxIndex = await contract.callStatic.getTxCount();
    console.log(getLastTxIndex.toNumber());
    await contract.execute(getLastTxIndex.toNumber() - 1);

    alert("Tx executed");
  }

  return (
    <div class="card my-4">
      <div class="card-header">
        <h4 class="text-dark">Manage Tx</h4>
      </div>
      <div class="card-body">
        <div>
          <h5 class="form-label text-start">Address: {addressSender}</h5>
        </div>
        <div class="my-4">
          <h5 class="form-label text-start">Amount: {value} ETH</h5>
        </div>
        <div class="my-4">
          <h5 class="form-label text-start">
            Confirmations {numberOfConfirmations}
          </h5>
        </div>
        <div class="d-flex">
          <button class="btn btn-primary my-2" onClick={ApproveTx}>
            {" "}
            Approve Tx
          </button>
          {numberOfConfirmations > 0 ? (
            <button class="btn btn-success my-2 mx-3" onClick={ExecuteTx}>
              {" "}
              Execute Tx{" "}
            </button>
          ) : (
            ""
          )}
          <button class="btn btn-danger my-2 mx-1"> Revoke Tx</button>
        </div>
      </div>
    </div>
  );
}

export default ManageTx;
