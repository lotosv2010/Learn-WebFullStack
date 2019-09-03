import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/';
import '../../font/iconfont.css';
import './index.scss';

class Input extends Component {
  static propTypes = {
    value: PropTypes.string,
    size: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    value: '',
    size: 'middle'
  }

  render() {
    const {
      value,
      size,
      children,
      prefix,
      suffix,
      ...rest
    } = this.props
    return (
      <div className={`gui__input size-${size}`}>
        <Icon name={prefix}/>
        <input {...rest}></input>
      </div>
    );
  }
}

export default Input;
