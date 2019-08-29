import React, { Component } from 'react';
import inp from '../Components/Input/'

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
        <p>DOM</p>
        <button onClick={(e) => inp.show(this.obj)}>新增数据</button>
        {this.state.data.map(item => <p key={item}>{item}</p>)}
        {/* {this.state.loading && <Loading />} */}
      </div>
    )
  }

  obj = {
    onOk: (val) => {
      this.setState({
        data: [...this.state.data, val]
      })
    }
  }

  componentDidMount() {
    // loading show
    // this.setState({
    //   loading: true
    // })

    inp.show(this.obj)
    setTimeout(() => {
      this.setState({
        data: ['a', 'b', 'c'],
        // loading hide
        // loading: false
      })
      // inp.hide()
    }, 2000);
  }
}



export default DOM