import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../font/iconfont.css';

class Icon extends Component {
  static propTypes = {
    name: PropTypes.string
  }

  static defaultProps = {
    name: 'shanchu1'
  }

  render() {
    const { name, ...rest } = this.props
    return (
      <span {...rest} className={`icon iconfont icon-${name}`} style={{color: 'red', fontSize: '18px'}} />
    )
  }
}

export default Icon;