import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Modern dApp browsers (MetaMask, Brave, etc.)
  web3 = new Web3(window.ethereum);
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then(() => console.log("Ethereum wallet connected"))
    .catch((err) => console.error("User denied account access", err));
} else if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  // Legacy dApp browsers
  web3 = new Web3(window.web3.currentProvider);
} else {
  // No wallet detected, fallback to Infura
  console.warn("No Ethereum provider found. Using Infura fallback.");
  web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"));
}

export default web3;
