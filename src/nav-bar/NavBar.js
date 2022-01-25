const ethers = require("ethers");

function NavBar(props) {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="font-link navbar-brand">MultiSigWallet</a>
        <div class="d-flex justify-content-end">
          <div class="font-link text-light ">
            {" "}
            Balance :{" "}
            {Math.round(ethers.utils.formatEther(props.balance) * 1e4) /
              1e4}{" "}
            eth{" "}
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <div class="font-link text-light">
            Address connected: {props.address}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
