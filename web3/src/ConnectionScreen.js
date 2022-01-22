import { useState, useEffect, useLayoutEffect } from "react";

const ethers = require("ethers");
const utils = require("ethers").utils;

function ConnectionScreent(props) {
  const ethereum = window.ethereum;

  useLayoutEffect(() => {
    ConnectWithMetamask();
  }, []);

  function ConnectWithMetamask() {
    if (ethereum) {
      ethereum.request({ method: "eth_requestAccounts" }).then((result) => {
        props.setAccount(result[0]);
        props.setConfirmation(true);

        GetBalanceUser(result[0]);
      });
    } else {
      alert("No connection found");
    }
  }

  function GetBalanceUser(address) {
    ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((result) => {
        console.log(result);
        props.setBalance(result);
      });
  }

  return (
    <div class="container w-50 my-5">
      <div class="card">
        <img
          class="card-img-top img-responsive"
          src="logo512.png"
          alt="Card image cap"
        ></img>
        <div class="card-body">
          <div class="card-title my-5">
            <h4> Connect Metamask </h4>
          </div>
          <button class="btn btn-primary" onClick={ConnectWithMetamask}>
            {" "}
            Connect{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectionScreent;
