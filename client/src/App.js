import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [str, setStr] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3200")
    .then((resp) => {
      setStr(resp.data.message)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and {str} to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {str}
        </a>
      </header>
    </div>
  );
}

export default App;
