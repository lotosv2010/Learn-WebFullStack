import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../Icon/';
import '../../font/iconfont.css';
import './index.scss';

class Input extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      innerValue: ''
    }
  }
  static propTypes = {
    value: PropTypes.string,
    size: PropTypes.string,
    defaultValue: PropTypes.string,
    onChange: PropTypes.func
  }

  static defaultProps = {
    size: 'middle'
  }

  get isControl() {
    return 'value' in this.props
  }

  get value() {
    if(this.isControl) {
      return this.props.value
    } else {
      return this.state.innerValue
    }
  }

  render() {
    const {
      focus
    } = this.state

    const {
      icon,
      size,
      children,
      prefix,
      suffix,
      onChange,
      rule = new RegExp(),
      message,
      ...rest
    } = this.props

    let cls = classNames({
      input: true,
      focus,
      [`size-${size}`]: true,
      'gui__input': true
    })
    return (
      <div>
        <div  className={cls}>
          {prefix && <Icon name={prefix}/>}
          <input {...rest}
            value = {this.value}
            onFocus = { e => {
              this.setState({
                focus: true
              })
            }}

            onBlur = { e => {
              this.setState({
                focus: false
              })
            }}

            onChange={ e => {
              if(!this.isControl) {
                this.setState({
                  innerValue: e.target.value
                })
              }
              this.props.onChange(e)
            }}
          />
          {suffix && <Icon name={suffix}/>}
        </div>
        <p>{!rule.test(this.value) && message}</p>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props)
    this.setState({
      innerValue: this.props.defaultValue
    })
  }
}

export default Input;
