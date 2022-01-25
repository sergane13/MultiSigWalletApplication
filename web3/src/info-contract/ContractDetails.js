export const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const contractAbi = [
  "function getBalance() view returns(uint256)",
  "function submit(address recipient, uint256 value, bytes calldata data)",
  "function approve(uint txId)",
  "function execute(uint txId)",
  "function getUserApproval(uint256 txId, address adrs) view returns(bool)",
  "function revokeApproval(uint txId)",
  "function revokeTx(uint txId) returns(bool)",
  "function getLastTx() view returns(address, uint256, bool, uint256)",
  "function getTxCount() view returns(uint256)",
];
