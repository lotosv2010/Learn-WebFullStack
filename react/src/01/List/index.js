import React, { Component } from 'react';

class List extends Component {
  render() {
    return (
      <div>
        List-{ this.props.name }
      </div>
    )  
  }

  componentDidMount() {
    console.log('list mount');
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('list update');
  }

  
}

export default List