import { observable } from 'mobx'

class Post {
  @observable list = [
    {
      title: 'hello xiao a',
      content: 'hello xiao a post 1',
      id: 1,
      friendId: 1
    },
    {
      title: 'hello xiao b',
      content: 'hello xiao b post 2',
      id: 2,
      friendId: 1
    },
    {
      title: 'hello xiao c',
      content: 'hello xiao c post 3',
      id: 3,
      friendId: 1
    }
  ]
}

const post = new Post()
export default post
