import React, { Component } from 'react'

export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  
  render() {
    const { onAdd } = this.props
    return (
      <div>
        <input value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
        <button onClick={(e) => {
          onAdd(this.state.value)
          this.setState({
            value: ''
          })
        }}>提交</button>
      </div>
    )
  }
}
