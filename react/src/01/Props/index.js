import React, { Component } from 'react';
class Pro extends Component{
  render() {
    return (
      <div>
        <h3>组建通信</h3>
        <Clock
        time = {12}
          onWakeUp = {() => {
            alert('wake up')
          }}
          onSleep = {() => {
            alert('sleep')
          }}
        />
      </div>
    )
  }
}

class Clock extends Component {
  render() {
    let { onWakeUp, onSleep, time} = this.props
    if (time === 9) {
      onWakeUp()
    }
    if (time === 22) {
      onSleep()
    }
    return (
      <div>
        clock
      </div>
    )
  }
}

export default Pro