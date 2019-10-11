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

    const friendList = friend.list.map((item, index) => {
      return <p key={index}>name:{item.name}</p>
    })

    friend.id = 0
    return (
      <div>
        <p>mobx-demo</p>
        { friendList }
        {friend.friendPost.length > 0 ? friend.friendPost[0].content : 'no data'}
        <p>friend.list.length：{friend.list.length}</p>
        <p>post.list.length：{post.list.length}</p>
      </div>
    )
  }
}

export default  MobxDemo2