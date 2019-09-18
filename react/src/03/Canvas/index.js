import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Rect extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  }
  render() {
    const {
      ctx
    } = this.context
    const {
      x,
      y,
      width,
      height
    } =this.props
    ctx.strokeRect(x, y, width, height)
    return null
  }
}

class Path extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  }
  render() {
    const {
      ctx
    } = this.context
    
    ctx.beginPath()
    this.props.children.forEach(item => {
      if (item.type === Point) {
        ctx.lineTo(item.props.x, item.props.y)
        ctx.pos = { x: item.props.x, y: item.props.y} // 记录一下canvas的笔绘制到哪了
      }
      if (item.type === Arc) {
        ctx.arc(ctx.pos.x, ctx.pos.y, item.props.r, item.props.from, item.props.to, false)
      }
    })
    ctx.closePath()
    ctx.stroke()
    return this.props.children
  }
}

class Point extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  }
  render() {
    const {
      ctx
    } = this.context
    console.log(ctx, 'ctx in Point')
    return null
  }
}

class Arc extends Component {
  static contextTypes = {
    ctx: PropTypes.object
  }
  render() {
    const {
      ctx
    } = this.context
    console.log(ctx, 'ctx in Arc')
    return null
  }
}

// 执行思想很重要
class Canvas extends Component {
  state = {
    children: [],
    ctx: null
  }

  static childContextTypes = {
    ctx: PropTypes.object
  }

  getChildContext() {
    return {
      ctx: this.state.ctx
    }
  }

  render() {
    return (
      <canvas>
        {this.state.children}
      </canvas>
    )
  }

  componentDidMount() {
    this.setState({
      children: this.props.children,
      ctx: ReactDOM.findDOMNode(this).getContext('2d')
    })
  }
}

class CanvasDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0
    }
  }

  render() {
    return (
      <div>
        <Canvas>
          <Rect x={20} y={30} width={50} height={100} />
          <Path>
            <Point name='line1' x={this.state.x} y={this.state.y} />
            <Point name='line2' x={100} y={100} />
            <Point name='line2' x={100} y={50} />
            <Point name='line2' x={200} y={50} />
            <Arc r={10} from={0} to={2 * Math.PI} />
          </Path>
        </Canvas>
      </div>
    )
  }
}

export default CanvasDemo
