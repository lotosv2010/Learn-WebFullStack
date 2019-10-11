import React from 'react';
import logo from './logo.svg';
import './App.css';

import MobxDemo from './mobx/index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <MobxDemo />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
      
    </div>
  );
}

export default App;
