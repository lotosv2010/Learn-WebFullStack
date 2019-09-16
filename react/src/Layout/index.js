import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './index.scss'

// import HashHistory from '../03/HashHistory/';
import BrowserHistory from '../03/BrowserHistory/';

const { Header, Sider, Content } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
            <img src={require('../assets/ant.svg')} alt="ant" />
            <img src={require('../assets/title.svg')} alt="title" style={{display: this.state.collapsed ? 'none' : 'block'}} />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
            <BrowserHistory />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout