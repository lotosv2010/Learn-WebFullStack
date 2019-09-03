import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../font/iconfont.css';
import './index.scss'
import Icon from '../Icon/';

class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    icon: PropTypes.string
  }

  static defaultProps = {
    type: 'primary',
    icon: 'chenggong'
  }

  render() {
    const {
      icon,
      type,
      children,
      ...rest
    } = this.props
    return (
      <button {...rest} className={`gui__btn--${type}`}>
        <Icon name={icon}/>
        {children}
      </button>
    );
  }
}
export default Button;