import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import '../../font/iconfont.css';
import './index.scss';

class ColumnItem extends Component {
  render() {
    const { 
      // render = () => 'ColHeader',
      title } = this.props.item
    return (
      <th key="title">{title}</th>
    );
  }
}

class Columns extends Component {
  render() {
    const { columns } = this.props
    return (
      <thead>
        <tr>
        {columns.map(item => <ColumnItem key="item.key" item={item} />)}
        </tr>
      </thead>
    );
  }
}

class DataSourceItem extends Component {
  render() {
    const {
      columns,
      dataItem,
      index
    } = this.props

    const tds = columns.map(item => <td>{item.render ? item.render(dataItem[item.dataIndex], dataItem, index) : dataItem[item.dataIndex]}</td>)
    return (
      <tr>
        {tds}
      </tr>
    );
  }
}

class DataSource extends Component {
  render() { 
    const {
      columns,
      dataSource
    } = this.props

    let trs = dataSource.map((item, index) => <DataSourceItem dataItem={item} index={index} columns={columns} />)

    return (
      <tbody>
        {trs}
      </tbody>
    );
  }
}

class Table extends Component {
  static propTypes = {
    columns: PropTypes.array,
    dataSource: PropTypes.array
  }

  static defaultProps = {
    columns: [],
    dataSource: []
  }

  
  render() {
    const {
      columns,
      dataSource,
      ...rest
    } = this.props
    return (
      <div>
        <table {...rest} border="1">
          <Columns columns={columns} />
          <DataSource dataSource={dataSource} columns={columns} />
        </table>
      </div>
    );
  }
}

export default Table;
