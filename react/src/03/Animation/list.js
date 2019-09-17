import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export class AnimationList extends React.Component {
  mounted = false
  static childContextTypes = {
    mountStyle: PropTypes.object,
    unMountStyle: PropTypes.object,
    parent: PropTypes.object,
    remove: PropTypes.func
  }

  getChildContext() {
    return {
      mountStyle: this.props.mountStyle,
      unMountStyle: this.props.unMountStyle,
      parent: this,
      remove: this.props.remove
    }
  }
  render() {
    return (
      <>
        {this.props.children}
      </>
    )
  }
}


export class AnimationItem extends React.Component {
  static contextTypes = {
    mountStyle: PropTypes.object,
    unMountStyle: PropTypes.object,
    parent: PropTypes.object,
    remove: PropTypes.func
  }

  unMountAnimation = () => {}
  
  remove = (index) => {
    const {
      unMountStyle
    } = this.context
    let dom = ReactDOM.findDOMNode(this)
    let move = () => {
      this.context.remove(index)
    }
    dom.style.transition = `0.5s`
    dom.addEventListener('transitionend', move, false)
    setTimeout(() => {
      for(var key in unMountStyle) {
        dom.style[key] = unMountStyle[key]
      }
    }, 0)
  }

  render() {
    let {
      render
    } = this.props
    return (
      <>
        {render(this.remove)}
        {/* {this.props.children} */}
      </>
    )
  }

  run(index) {
    const {
      mountStyle,
      parent
    } = this.context

    let dom = ReactDOM.findDOMNode(this)
    dom.style.transition = parent.mounted ? `0.5s` : `0.5s ${index * 0.2}s`
    parent.mounted = parent.props.children.length === index
    setTimeout(() => {
      for(var key in mountStyle) {
        dom.style[key] = mountStyle[key]
      }
    }, 0)
  }

  componentDidMount() {
    const {
      index
    } = this.props
    this.run(index)
  }
}