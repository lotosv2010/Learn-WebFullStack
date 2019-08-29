import React from 'react';
import ReactDOM from 'react-dom'
import './index.css';


class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render () {
    const {
      onOk
    } = this.props

    return (
      <div className='input'>
        <input value={this.state.value} onChange={(e) => this.setState({value: e.target.value})}></input>
        <button onClick={(e) => {
          let v = this.state.value
          onOk(v)
          this.setState({
            value: ''
          })
          inp.hide()
        }}>提交</button>
      </div>
    )
  }
}

let node = null
const inp = {
  show(obj) {
    node = document.createElement('div')
    document.body.appendChild(node)
    ReactDOM.render(<Input onOk={obj.onOk} />, node)
  },
  hide() {
    if(node) {
      ReactDOM.unmountComponentAtNode(node)
      document.body.removeChild(node)
    }
  }
}

export default inp