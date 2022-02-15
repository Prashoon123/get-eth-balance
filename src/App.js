import axios from "axios";
import { useState } from "react";
import "./App.css";
const convert = require("ethereum-unit-converter");

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const getBalance = async () => {
    const result = await axios(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
    );

    const weiBalance = result.data.result;
    const etherBalance = convert(weiBalance, "wei", "ether");

    console.log(etherBalance)

    setBalance(`ETH ${etherBalance}`);
  };

  return (
    <div className="app">
      <main className="app__main">
        <h1>Get Ξther Balance</h1>

        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Enter the address"
          required={true}
        />

        <button
          onClick={getBalance}
          disabled={!address || address.substring(0, 2) !== "0x"}
        >
          Find balance
        </button>

        <div className="app__balance">
          <p>The balance is {balance}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
