import React from 'react';

let loading = (Com) => {
  class LoadingComponent extends Com {
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
          {super.render()}
          { loading ? 'loading' : ''}
        </div>
      )
    }
  }
  return LoadingComponent
}

@loading
class Decorator extends React.Component {
  render() {
    return (
      <div>
        ES6-Decorator
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

export default Decorator
