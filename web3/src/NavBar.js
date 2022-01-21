import react from "react";

const ethers = require("ethers");
const utils = require("ethers").utils;

function NavBar(props) {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand">MultiSigWallet</a>
        <div class="d-flex justify-content-around ml-auto text-light">
          {" "}
          Balance : {ethers.utils.formatEther(props.balance)} eth{" "}
        </div>
        <div class="d-flex">
          <div class="text-light">Address connected: {props.address}</div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
