import { observable, computed } from 'mobx'
import post from './post'

class Friend {
  @observable list = [
    {
      name: 'xiao a',
      id: 1
    },
    {
      name: 'xiao b',
      id: 2
    },
    {
      name: 'xiao c',
      id: 3
    }
  ]

  @observable id = 1

  @computed
  get friendPost() {
    return post.list.filter(item => item.friendId === this.id)
  }
}

const friend = new Friend()
export default friend
