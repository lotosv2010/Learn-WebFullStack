import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

@inject('friend', 'post')
@observer
class MobxDemo2 extends Component {
  render() {
    console.log(this.props)
    const {
      friend,
      post
    } = this.props
    return (
      <div>
        <p>mobx-demo</p>
        {friend.list.length},{post.list.length}
      </div>
    )
  }
}

export default  MobxDemo2