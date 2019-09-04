import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import List from './List/'
// import Filter from './Filter/';
// import Func from './Func/';
// import HT from './HTML/';
// import Lifecycle from './Lifecycle/';
// import Pro from './Props/'
// import DOM from './DOM/'
// import Inp from './Inp/'
// import Todo from './Todo/'
// import ES from './ES6/'
// import Decorator from './Decorator/'
// import Icon from './GUI/Icon/';
// import Button from './GUI/Button/'
// import Input from './GUI/Input/'
// import Table from './GUI/Table/'

// let dataSource = [
//   {name: 'ryan', age: 30, sex: 'man'},
//   {name: 'ryan2', age: 32, sex: 'man'},
//   {name: 'ryan3', age: 33, sex: 'man'}
// ]

class A extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'a'
    }
  }

  value = '1'

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>
            欢迎学习react.
          </p>
          {/* <List name={'react'}></List>
          <Filter></Filter>
          <Func />
          <HT />
          <Lifecycle />
          <Pro /> 
          <DOM />
          <Inp />
          <Todo />
          <ES />
          <Decorator />
          <div><Icon name="shanchu1"/></div>
          <div><Button type="primary" icon="chenggong">提交</Button></div>
          <div><Button type="warning" icon="chenggong">提交</Button></div>
          <div>
            <div>受控组件：</div>
            <Input size="small" value={this.state.value} prefix="shangchuan" 
              onChange={ e => {
                this.setState({
                  value: e.target.value
                })
              }}
            />
          </div>
          <div>
            <div>非受控组件：</div>
            <Input size="small" defaultValue={this.value} prefix="shangchuan" 
              onChange={ e => {
                this.value = e.target.value
              }}
            />
          </div>
          <div>
            <div>验证组件：</div>
            <Input size="small" prefix="shangchuan"
              rule={/\d/}
              message="只允许输入数字"
              defaultValue={this.value}
              onChange={ e => {
                this.value = e.target.value
              }}
            />
          </div>
          <div>
            <Table
              columns={[
                {title: '姓名', dataIndex: 'name', key: 'name', render(text, item, index) {
                  return <div><a href="####">{`${text}?age=${item.age}&index=${index}`}</a></div>
                }},
                {title: '年龄', dataIndex: 'age', key: 'age'},
                {title: '性别', dataIndex: 'sex', key: 'sex'}
              ]}
              dataSource={dataSource}
            />
          </div> */}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

function App() {
  return (
    <A />
  );
}

export default App;
