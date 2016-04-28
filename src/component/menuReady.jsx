import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, IndexLink, hashHistory } from 'react-router';
import { Menu, Breadcrumb, Icon } from 'antd';
import './App.less';
import menuData from '../../data/menu.json';

const SubMenu = Menu.SubMenu;

const Dashboard = React.createClass({
  render() {
    return <div>Welcome to the app!</div>
  }
})

const App = React.createClass({
  render: function () {
    let menus = [],i=1,j=0;
    menuData.data.forEach(function(item,index){
      item.url?item.url:'/';
      if(item.submenu && item.submenu.length > 0){
        menus.push(
          <SubMenu key={'sub'+j} title={<span><Icon type="user" />{item.menu_name}</span>}>
            {item.submenu.map(
              function(subitem){
                if(!subitem.url){
                  return <Menu.Item key={i++}>{subitem.menu_name}</Menu.Item>
                }else{
                  return <Menu.Item key={i++}><Link to={subitem.url}>{subitem.menu_name}</Link></Menu.Item>
                }
              })
            }            
          </SubMenu>
        )
        j++;
      }else{
        if(item.url){
          menus.push(<Menu.Item key={i}><Link to={item.url}>{item.menu_name}</Link></Menu.Item>);
        }else{
          menus.push(<Menu.Item key={i}>{item.menu_name}</Menu.Item>);
        }
        i++
      }
    });
    return (
        <div className="ant-layout-aside">
          <aside className="ant-layout-sider">
            <div className="ant-layout-logo"></div>
            <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']} defaultOpenKeys={['sub0']}>
              {menus}
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
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="ttt" component={require('./ttt')} />
    </Route>
  </Router>
), document.getElementById('react-content'))

export default App;