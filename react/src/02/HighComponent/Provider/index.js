import React from 'react';
import PropTypes from 'prop-types';

class Provider extends React.Component {
  // 定义上下文方法
  getChildContext() {
    return this.props.store
  }

  // 定义子组件的数据类型
  static childContextTypes = {
    name: PropTypes.string,
    age: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      name: 'provider-user'
    }
  }
  render() {
    return this.props.children
  }
}

export default Provider;