import React from 'react';

/*
let obj = new Proxy ({
  a: 10,
  b: 20
}, {
  get(target,key) {
    console.log('get', key)
    return target[key] * 10
  },
  set(target, key, value) {
    return Reflect.set(target, key, value)
  } 
})
*/

class LoadingComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  showLoading() {
    this.setState({
      loading: true
    })
  }
  hideLoading() {
    this.setState({
      loading: false
    })
  }

  render() {
    const { loading } = this.state
    return (
      <div>
        { loading ? 'loading' : ''}
      </div>
    )
  }
}

class ES extends LoadingComponent {
  render() {
    return (
      <div>
        {super.render()}
        ES6
      </div>
    )
  }

  componentDidMount() {
    this.showLoading()
    setTimeout(() => {
      this.hideLoading()
    }, 3000);
  }
}

export default ES
