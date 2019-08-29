import React, { Component } from 'react';
import loading from '../Components/Loading/'

class DOM extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loading: false
    }
  }
  render() {
    return (
      <div>
        DOM
        {this.state.data.map(item => <p key={item}>{item}</p>)}
        {/* {this.state.loading && <Loading />} */}
      </div>
    )
  }

  componentDidMount() {
    // loading show
    // this.setState({
    //   loading: true
    // })

    loading.show()
    setTimeout(() => {
      this.setState({
        data: ['a', 'b', 'c'],
        // loading hide
        // loading: false
      })
      loading.hide()
    }, 2000);
  }
}

export default DOM