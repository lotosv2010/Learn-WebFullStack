import React from 'react'
import TodoList from '../Components/TodoList';
import Action from '../Components/Action/'

export default class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }
  render() {
    return (
      <div>
        <Action onAdd={(name) => {
          let data = this.state.data
          data.push(name)
          this.setState({data})
        }}/>
        <TodoList
          data={this.state.data}
          onDelete={(index) => {
            let data = this.state.data
            data.splice(index, 1)
            this.setState({data})
          }}
        />
      </div>
    )
  }
}
