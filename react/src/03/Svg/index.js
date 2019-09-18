import React, { Component } from 'react';


const DEFAULT_PROPS = {
  style: {stroke: 'red', strokeWidth: 1, fill: '#ff6600'}
}

export class Svg extends Component {
  render() {
    return (
      <svg
        width="100%"
        height="100%"
        version="1.1"
        xmlns="http://www.w3.org/200/svg"
      >
        {this.props.children}
      </svg>
    )
  }
}

export class Text extends Component {
  render() {
    return(
      <text {...this.props}>{this.props.children}</text>
    )
  }
}

export class Circle extends Component {
  static defaultProps = DEFAULT_PROPS
  render() {
    return (
      <circle {...this.props}></circle>
    )
  }
}

export class Rect extends Component {
  static defaultProps = DEFAULT_PROPS
  render() {
    return (
      <rect {...this.props}></rect>
    )
  }
}

export class Ellipse extends Component {
  static defaultProps = DEFAULT_PROPS
  render() {
    return (
      <ellipse {...this.props}></ellipse>
    )
  }
}

export class Line extends Component {
  static defaultProps = DEFAULT_PROPS

  get begin() {
    return this.props.children[0].props
  }

  get end() {
    return this.props.children[1].props
  }

  render() {
    return (
      <line x1={this.begin.x} y1={this.begin.y} x2={this.end.x} y2={this.end.y} {...this.props}>{this.props.children}</line>
    )
  }
}

export class Point extends Component {
  render() {
    return null
  }
}

export class PolyLine extends Component {
  static defaultProps = DEFAULT_PROPS
  render() {
    const points = this.props.children.map(item => {
      return `${item.props.x},${item.props.y}`
    }).join(' ')
    return (
      <polyline points={points} {...this.props}>
        {this.props.children}
      </polyline>
    )
  }
}

export class Polygon extends Component {
  static defaultProps = DEFAULT_PROPS
  render() {
    const points = this.props.children.map(item => {
      return `${item.props.x},${item.props.y}`
    }).join(' ')
    return (
      <polygon points={points} {...this.props}>
        {this.props.children}
      </polygon>
    )
  }
}

export default class SvgDemo extends Component {
  render() {
    return (
      <div style={{height:'100%'}}>
        <Svg>
          <Circle
            cx={500}
            cy={200}
            r={100}
            stroke={'yellow'}
          />
          <Rect
            x={800}
            y={400}
            width={100}
            height={100}
            stroke={'yellow'}
          />
          <Ellipse
            cx={150}
            cy={120}
            rx={10}
            ry={30}
            stroke={'yellow'}
          />
          <Line>
            <Point x={10} y={10} />
            <Point x={10} y={100} />
          </Line>
          <Line>
            <Point x={10} y={10} />
            <Point x={100} y={10} />
          </Line>
          <PolyLine>
            <Point x={0} y={40} />
            <Point x={40} y={40} />
            <Point x={40} y={80} />
            <Point x={80} y={80} />
            <Point x={80} y={120} />
            <Point x={120} y={120} />
            <Point x={120} y={160} />
          </PolyLine>
          <Polygon>
            <Point x={100} y={10} />
            <Point x={40} y={180} />
            <Point x={190} y={60} />
            <Point x={10} y={60} />
            <Point x={160} y={180} />
          </Polygon>
        </Svg>
      </div>
    )
  }
}
