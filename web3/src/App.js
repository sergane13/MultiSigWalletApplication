import './App.css';
import {useState} from 'react'
const ethers = require('ethers')
const utils = require("ethers").utils;

function App(props) {

  const [account, setAccount] = useState('0x0')
  const [balance, setBalance] = useState(0)
  const [confirmation, setConfirmation] = useState(false)

  const ethereum = window.ethereum;

  function ConnectWithMetamask()
  { 
    if(ethereum)
    {
      ethereum.request({method: 'eth_requestAccounts'})
      .then(result => 
      {
        console.log(result[0])
        setAccount(result[0])
        GetBalanceUser(result[0])
      })  
    }
    else
    {
      console.log("No metamask")
    }
  }

  function GetBalanceUser(address)
  {
    ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
      .then(result => 
      {
        console.log(result)
        setBalance(result)
      })
  }

  async function FundContract()
  {
    // const contractAbi = [
    //   "function getId() view returns(uint256)",
    //   "function submit(address recipient, uint256 value, bytes calldata data)",
    //   "function approve(uint txId)",
    //   "function execute(uint txId)",
    //   "function revokeApproval(uint txId)",
    // ];

    const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    if(ethereum)
    {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      // const contract = new ethers.Contract(
      //   addressContract,
      //   contractAbi,
      //   signer
      // )

      try 
      {
        const tx = {
          to: addressContract,
          value: utils.parseEther("3.0"),
          chainId: "31337"
        };
        const confirmationTx = await signer.sendTransaction(tx);

        if(confirmationTx)
        {
          setConfirmation(true);
        }
      } 
      catch (error) 
      {
        console.log("ERRROR")
      }
    }
  }

  const [addressToSend, ChangeAddress] = useState('')
  const [amountToSend, ChangeAmount] = useState(0)

  async function SubmitTransaction()
  {
    const contractAbi = [
      "function getId() view returns(uint256)",
      "function submit(address recipient, uint256 value, bytes calldata data)",
      "function approve(uint txId)",
      "function execute(uint txId)",
      "function revokeApproval(uint txId)",
    ];

    const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      addressContract,
      contractAbi,
      signer
    )

    try {
      console.log(addressToSend)
      const submission = await contract.submit(addressToSend, amountToSend, '0x00')

    } catch (error) { 
      console.log(error)
    }
  }

  

  function submitAddress(value)
  {
    ChangeAddress(value.target.value)
  }

  function submitValue(value)
  {
    ChangeAmount(value.target.value)
  }


  return (
    <div className="App">
      <h1> {props.somtheing} </h1>
      <button onClick={ConnectWithMetamask}> Connect Wallet </button>
      <h2> {account} </h2>
      <h2> {balance} </h2>
      <button onClick={FundContract}> Fund Contract </button>

      <div>
        <input onChange={submitAddress} placeholder="Enter Address"/>
        <input onChange={submitValue} placeholder="Enter Amount"/>
        <button onClick={SubmitTransaction}> SubmitTx </button>
      </div>
      
      <h2> {confirmation} </h2>
    </div>
  );
}

export default App;
