import React from 'react';
import logo from './logo.svg';
import './App.css';
// import List from './List/'
// import Filter from './Filter/';
// import Func from './Func/';
// import HT from './HTML/';
// import Lifecycle from './Lifecycle/';
import Pro from './Props/'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          欢迎学习react.
        </p>
        {/* <List name={'react'}></List>
        <Filter></Filter>
        <Func />
        <HT />
        <Lifecycle /> */}
        <Pro />
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
