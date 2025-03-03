import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

function App() {
  const [manager, setManager] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);
  const [userBalance, setBalance] = useState("");
  const [inputAmount, setInputAmount] = useState(0);
  const [transactionState, setTransactionState] = useState("");

  useEffect(() => {
    async function fetchDeployedData() {
      try {
        const managerAddress = await lottery.methods.manager().call();
        setManager(managerAddress);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchNumberOfPlayers() {
      try {
        const response = await lottery.methods.getPlayers().call();
        setNumberOfPlayers(response.length);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchBalance() {
      try {
        const response = await web3.eth.getBalance(lottery.options.address);
        setBalance(response);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDeployedData();
    fetchNumberOfPlayers();
    fetchBalance();
  }, []);

  var onSubmit = async (event) => {
    event.preventDefault();
    try {
      const accounts = await web3.eth.getAccounts();
      setTransactionState("Your transaction is being sent...");

      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(inputAmount.toString(), "ether"),
      });

      setTransactionState("Your transaction has been received!");
    } catch (error) {
      console.error(error);
      setTransactionState("Transaction failed. Try again.");
    }
  };

  var getWinner = async () => {

    var accounts = await web3.eth.getAccounts();
    await lottery.methods.pickWinner().send({
      from : accounts[0],
    });

    setTransactionState("winner is picked")
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#121212",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Lottery deployed by: {manager || "Loading..."}
      </p>
      <p style={{ fontSize: "18px" }}>Number of players: {numberOfPlayers}</p>
      <p style={{ fontSize: "18px", color: "#4CAF50" }}>
        Balance: {`${web3.utils.fromWei(userBalance, "ether")} ETH`}
      </p>

      <form onSubmit={onSubmit}>
        <h1 style={{ marginTop: "20px", fontSize: "24px" }}>
          Wanna try your luck?
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            marginTop: "10px",
            background: "#1e1e1e",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <label style={{ fontSize: "16px", marginBottom: "5px" }}>
            Amount of Ether to enter:
          </label>

          <input
            type="number"
            onChange={(e) => setInputAmount(parseFloat(e.target.value) || 0)}
            value={inputAmount}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              outline: "none",
              fontSize: "16px",
              width: "100px",
              textAlign: "center",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#4CAF50",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.background = "#45a049")}
            onMouseOut={(e) => (e.target.style.background = "#4CAF50")}
          >
            Enter
          </button>
        </div>
      </form>

      <p>{transactionState}</p>

      <p>pick a winner</p>
      <button onClick={getWinner}></button>
    </div>
  );
}

export default App;