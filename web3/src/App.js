import "./App.css";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./NavBar";
import CreateTx from "./CreateTx";
import ManageTx from "./ManageTx";
import ConnectionScreent from "./connection-screen/ConnectionScreen";
import FundContract from "./FundContract";

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
            <FundContract />
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
      <ConnectionScreent
        setAccount={setAccount}
        setConfirmation={setConfirmation}
        setBalance={setBalance}
      />
    </div>
  );
}

export default App;
