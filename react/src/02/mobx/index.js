import React, { Component } from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
class MobxDemo extends Component {
  @observable value = 'a'
  constructor(props) {
    super(props)
    this.state = {
      time: 0
    }
  }
  render() {
    return (
      <div>
        mobx-demo
        <input value={this.value} onChange={e => this.value = e.target.value}></input>
        {this.value}
      </div>
    )
  }
}

export default  MobxDemo