import { useState } from "react";

function FundContract() {
  return (
    <div class="container">
      <div class="row my-2">
        <h5>Address</h5>
        <h6>0x5FbDB2315678afecb367f032d93F642f64180aa3</h6>
      </div>
      <div class="container my-5">
        <div class="row my-2"> Eth stored: </div>
        <div class="row my-2"> Minimum Confirmations: 1</div>
        <div class="row my-2"> Total tx number: </div>
        <div class="row my-4">
          <button class="btn btn-success">Fund Contract +4 eth</button>
        </div>
      </div>
    </div>
  );
}

export default FundContract;

// const ethereum = window.ethereum;

//   async function FundContract() {
//     const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//     if (ethereum) {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();
//       // const contract = new ethers.Contract(
//       //   addressContract,
//       //   contractAbi,
//       //   signer
//       // )

//       try {
//         const tx = {
//           to: addressContract,
//           value: utils.parseEther("3.0"),
//           chainId: "31337",
//         };
//         const confirmationTx = await signer.sendTransaction(tx);

//         if (confirmationTx) {
//           setConfirmation(true);
//         }
//       } catch (error) {
//         console.log("ERRROR");
//       }
//     }
//   }

//   const [addressToSend, ChangeAddress] = useState("");
//   const [amountToSend, ChangeAmount] = useState(0);

//   function submitAddress(value) {
//     ChangeAddress(value.target.value);
//   }

//   function submitValue(value) {
//     ChangeAmount(value.target.value);
//   }
