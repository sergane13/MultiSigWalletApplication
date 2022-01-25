import { useEffect, useState } from "react";
import {
  addressContract,
  contractAbi,
} from "../info-contract/ContractDetails.js";

const ethers = require("ethers");

function ManageTx(props) {
  const [addressSender, setAddressSender] = useState("0x00");
  const [value, setValue] = useState(0);
  const [numberOfConfirmations, setConfirmations] = useState(0);
  const [approval, setApproval] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      GetContractDetails();
    }, 1000);
  }, [props.value]);

  // Get contract
  function getContract() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(addressContract, contractAbi, signer);

    return contract;
  }

  // Get informations about the deployed contract
  async function GetContractDetails() {
    const contract = getContract();
    const submitedTx = await contract.callStatic.getLastTx();

    if (!submitedTx[2]) {
      setAddressSender(submitedTx[0]);
      setValue(ethers.utils.formatEther(submitedTx[1]));
      setConfirmations(submitedTx[3].toNumber());

      const walletAddress = window.ethereum.selectedAddress;

      const getLastTxIndex = await contract.callStatic.getTxCount();
      const getApprovals = await contract.callStatic.getUserApproval(
        getLastTxIndex.toNumber() - 1,
        walletAddress
      );

      if (getApprovals) {
        setApproval(getApprovals);
      }
    }
    props.setTxSubmited(!submitedTx[2]);
  }

  // Approve transaction
  async function ApproveTx() {
    const contract = getContract();
    const getLastTxIndex = await contract.callStatic.getTxCount();
    const temp = await contract.approve(getLastTxIndex.toNumber() - 1);

    if (temp) {
      GetContractDetails();
      alert("Tx aproved");
    }
  }

  // Execute tansaction
  async function ExecuteTx() {
    const contract = getContract();
    const getLastTxIndex = await contract.callStatic.getTxCount();
    const temp = await contract.execute(getLastTxIndex.toNumber() - 1);

    if (temp) {
      GetContractDetails();
      alert("Tx executed");
    }
  }

  // Revoke submited transaction
  async function RevokeTx() {
    const contract = getContract();
    const getLastTxIndex = await contract.callStatic.getTxCount();
    const temp = await contract.revokeTx(getLastTxIndex.toNumber() - 1);

    if (temp) {
      GetContractDetails();
      alert("Tx Revoked");
    }

    props.setTxSubmited(false);
  }

  // Revoke approval
  async function RevokeApproval() {
    const contract = getContract();
    const getLastTxIndex = await contract.callStatic.getTxCount();
    const temp = await contract.revokeApproval(getLastTxIndex.toNumber() - 1);

    if (temp) {
      GetContractDetails();
      alert("Approval Revoked");
    }
  }

  return (
    <div class="card my-4 font-link">
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
          {approval === false ? (
            <button class="btn btn-primary my-2" onClick={ApproveTx}>
              {" "}
              Approve Tx
            </button>
          ) : (
            <button class="btn btn-danger my-2" onClick={RevokeApproval}>
              {" "}
              Revoke Approval
            </button>
          )}

          {numberOfConfirmations > 1 ? (
            <button class="btn btn-success my-2 mx-3" onClick={ExecuteTx}>
              {" "}
              Execute Tx{" "}
            </button>
          ) : (
            ""
          )}
          <button class="btn btn-danger my-2 mx-1" onClick={RevokeTx}>
            {" "}
            Revoke Tx
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageTx;
