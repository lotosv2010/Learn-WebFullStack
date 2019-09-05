import React, { Component } from 'react';
class LifeCycle extends Component{
  constructor(props) {
    super(props)
    this.state = {
      name : 'react'
    }
  }
  render() {
    console.log('LifeCycle render')
    return (
      <div>
        {this.state.name}
        {this.state.name && <Son name={this.props.name + '-son'} />}
      </div>
    )
  }
  componentDidMount() {
    console.log('LifeCycle Mount')
  }

  //WARNING! To be deprecated in React v17. Use componentDidUpdate instead.
  componentWillUpdate(nextProps, nextState) {
    console.log('LifeCycle Will Update')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('LifeCycle Did Update')
  }

  componentWillUnmount() {
    console.log('LifeCycle Will Unmount')
  }
}


class Son extends Component{
  render() {
    console.log('Son render')
    return (
      <div>
        {this.props.name}
        <GrandSon name={this.props.name + '-GrandSon'} />
      </div>
    )
  }
  componentDidMount() {
    console.log('Son Mount')
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('Son Will Update')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Son Did Update')
  }

  componentWillUnmount() {
    console.log('Son Will Unmount')
  }
}


class GrandSon extends Component {
  render() {
    console.log('GrandSon render')
    return (
      <div>
        {this.props.name}
      </div>
    )
  }

  componentDidMount() {
    console.log('GrandSon Mount')
  }

  componentWillUpdate(nextProps, nextState) {
    console.log('GrandSon Will Update')
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('GrandSon Did Update')
  }

  componentWillUnmount() {
    console.log('GrandSon Will Unmount')
  }
}

export default LifeCycle