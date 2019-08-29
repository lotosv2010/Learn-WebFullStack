import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from '../../logo.svg';
import './index.css';


let node = null
const loading = {
  show() {
    node = document.createElement('div')
    document.body.appendChild(node)
    ReactDOM.render(<Loading />, node)
  },
  hide() {
    if(node) {
      ReactDOM.unmountComponentAtNode(node)
      document.body.removeChild(node)
    }
  }
}
class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img src={logo} className="loading-img" alt="logo" />
      </div>
    )
  }
}

export default loading