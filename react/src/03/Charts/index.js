import React, { Component } from 'react';
import {
  Svg,
  Line,
  Text,
  Point,
  Rect
} from '../Svg/'


const colors = ['#e33e6e', '#e6736c', '#f9c665', '#fa9750', '#0a84ff', '#017ace', '#00b0f0', '#71c5e8', '#a35975', '#88bcb3', '#a6a4dc', '#6b75ca', '#684eb0', '#42ada5', '#4cc2c2']

export class Grid extends Component {
  render() {
    let line = []
    for (let i = 1; i < 15; i++) {
      line.push(
        <React.Fragment key={i}>
          <Line style={{stroke: '#999999'}}>
            <Point x={100 + i * 30} y={100} />
            <Point x={100 + i * 30} y={400} />
          </Line>
          <Line style={{stroke: '#666666'}}>
            <Point x={100} y={100  + (i-1) * 23} />
            <Point x={520} y={100  + (i-1) * 23} />
          </Line>
        </React.Fragment>
      )
    }
    return line
  }
}

export class Legend extends Component {
  render() {
    const {
      data
    } = this.props

    let nodes = data.map((item,index) => (
      <React.Fragment key={index}>
        <Rect x={110 + index * 90} y={60} width={50} height={20} style={{fill: colors[index]}} />
        <Text x={110 + index * 90} y={55} style={{fill: colors[index]}}>{item}</Text>
      </React.Fragment>
    ))
    return nodes
  }
}

export class Bar extends Component {
  render() {
    const {
      data,
      name
    } = this.props
    return (
      <Svg>
        <Text x={100 + (400) / 2 - (215/2)} y={30} style={{fill: colors[0], fontSize: "30"}}>{name}</Text>
        <Line>
          <Point x={100} y={400} />
          <Point x={520} y={400} />
        </Line>
        <Line>
          <Point x={100} y={100} />
          <Point x={100} y={400} />
        </Line>
        {
          data.map((item, index) => (
            <Rect x={110 + index * 90} y={400 - item} width={30} height={item} style={{fill: colors[index]}} key={index} />
          ))
        }
        {this.props.children}
      </Svg>
    )
  }
}

export class BarChart extends Component {
  render() {
    return (
      <div style={{width: '100%', height: '100%'}}>
        <Bar
          name='2019年销售数据'
          data={[100,150,200,300,50]}
        >
          <Grid />
          <Legend data={['第一月', '第二月', '第三月', '第四月', '第五月']} />
        </Bar>
      </div>
    )
  }
}

export default BarChart
