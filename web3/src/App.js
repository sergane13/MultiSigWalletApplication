import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./nav-bar/NavBar";
import CreateTx from "./contract-interactions/CreateTx";
import ManageTx from "./contract-interactions/ManageTx";
import ConnectionScreen from "./connection-screen/ConnectionScreen";
import FundContract from "./contract-interactions/FundContract";

function App(props) {
  // details about the account
  const [account, setAccount] = useState("0x0");
  const [balance, setBalance] = useState(0);
  const [confirmation, setConfirmation] = useState(false);

  const [txSubmited, setTxSubmited] = useState(false);

  return confirmation ? (
    <div className="App">
      <NavBar balance={balance} address={account} />
      <div class="container-lg my-4">
        <div class="row">
          <div class="col-md-4 bg-dark text-light">
            <h1 class="my-4">Contract</h1>
            <FundContract setBalance={setBalance} />
          </div>
          <div class="col my-2">
            <div class="container-sm">
              <CreateTx value={txSubmited} setTxSubmited={setTxSubmited} />
              <ManageTx value={txSubmited} setTxSubmited={setTxSubmited} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="App">
      <NavBar balance="0" address="0x0" />
      <ConnectionScreen
        setAccount={setAccount}
        setConfirmation={setConfirmation}
        setBalance={setBalance}
      />
    </div>
  );
}

export default App;
