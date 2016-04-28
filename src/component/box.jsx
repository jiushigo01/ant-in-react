import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, IndexLink, hashHistory } from 'react-router';
import { Menu, Breadcrumb, Icon } from 'antd';
import './App.less';

const SubMenu = Menu.SubMenu;

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

const App = React.createClass({
  render() {
    return (
      <div className="ant-layout-aside">
          <aside className="ant-layout-sider">
            <div className="ant-layout-logo"></div>
            <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
              <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
                <Menu.Item key="1"><IndexLink to="/">Home</IndexLink></Menu.Item>
                <Menu.Item key="2"><Link to="/ttt">TTT</Link></Menu.Item>
                <Menu.Item key="3">选项3</Menu.Item>
                <Menu.Item key="4">选项4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
                <Menu.Item key="5">选项5</Menu.Item>
                <Menu.Item key="6">选项6</Menu.Item>
                <Menu.Item key="7">选项7</Menu.Item>
                <Menu.Item key="8">选项8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="notification" />导航三</span>}>
                <Menu.Item key="9">选项9</Menu.Item>
                <Menu.Item key="10">选项10</Menu.Item>
                <Menu.Item key="11">选项11</Menu.Item>
                <Menu.Item key="12">选项12</Menu.Item>
              </SubMenu>
            </Menu>
          </aside>
          <div className="ant-layout-main">
            <div className="ant-layout-header"></div>
            <div className="ant-layout-breadcrumb">
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>应用列表</Breadcrumb.Item>
                <Breadcrumb.Item>某应用</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="ant-layout-container">
              <div className="ant-layout-content">
                <div>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }
})

render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="ttt" component={require('./ttt')} />
    </Route>
  </Router>
), document.body)

export default App;