import { useState, useEffect, useLayoutEffect } from "react";
import React from "react";

const ethers = require("ethers");

class ConnectionScreent extends React.Component {
  ethereum = window.ethereum;
  state = { pass: false };

  constructor(props) {
    super(props);
    this.ConnectWithMetamask = this.ConnectWithMetamask.bind(this);
    this.MetamaskAccountConnection = this.MetamaskAccountConnection.bind(this);
  }

  componentDidMount() {
    if (this.ethereum) {
      this.MetamaskAccountConnection();
    } else {
      alert("No connection found");
      this.setState({ pass: true });
      this.render();
    }
  }

  // Check if any acount is connected to metamask
  async MetamaskAccountConnection() {
    var provider = new ethers.providers.Web3Provider(this.ethereum);
    const isMetaMaskConnected = async () => {
      const accounts = await provider.listAccounts();
      return accounts.length > 0;
    };
    await isMetaMaskConnected().then((connected) => {
      if (connected) {
        this.ConnectWithMetamask();
      } else {
        this.setState({ pass: true });
        this.render();
      }
    });
  }

  // Connect with metamask if no account was detected
  ConnectWithMetamask() {
    this.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        this.props.setAccount(result[0]);
        this.props.setConfirmation(true);
        this.GetBalanceUser(result[0]);
      })
      .catch(() => {
        this.setState({ pass: true });
        this.render();
      });
  }

  // Get balance of account
  GetBalanceUser(address) {
    this.ethereum
      .request({ method: "eth_getBalance", params: [address, "latest"] })
      .then((result) => {
        this.props.setBalance(result);
      });
  }

  render() {
    return this.state.pass ? (
      <div>
        <div class="d-flex justify-content-center container w-50 my-5">
          <div class="card bg-dark w-75">
            <div class="card-title">
              <h1 class="font-link my-2 text-light"> VAULT </h1>
            </div>
            <div class="card-body">
              <button
                class="font-link btn btn-primary"
                onClick={this.ConnectWithMetamask}
              >
                {" "}
                Connect Metamask{" "}
              </button>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center container w-25 text-danger font-link">
          Stay chill. Just connect your metamask to a random site a dude gave
          you and everything will be ok =)
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default ConnectionScreent;
