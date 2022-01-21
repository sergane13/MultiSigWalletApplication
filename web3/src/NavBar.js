import react from "react";

function NavBar(props) {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand">MultiSigWallet</a>
        <div class="d-flex justify-content-around ml-auto text-light">
          {" "}
          Balance : {props.balance}{" "}
        </div>
        <div class="d-flex">
          <div class="text-light">Address: {props.address}</div>
        </div>
        <div class="d-flex">
          <div class="text-light">...</div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
