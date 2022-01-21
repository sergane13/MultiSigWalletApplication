export const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const contractAbi = [
  "function getId() view returns(uint256)",
  "function submit(address recipient, uint256 value, bytes calldata data)",
  "function approve(uint txId)",
  "function execute(uint txId)",
  "function revokeApproval(uint txId)",
];
