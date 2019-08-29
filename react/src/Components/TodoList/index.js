import React from 'react';
import './index.css';


class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render () {
    const { data, onDelete } = this.props
    return (
      <div>
        {
          data.map((item, index) => (
            <ol key={index}>
              <li>
                <span>{item}</span>
                <button onClick={
                  (e) => {
                    onDelete(index)
                  }
                }>删除</button>
              </li>
            </ol>
          ))
        }
      </div>
    )
  }
}

export default TodoList