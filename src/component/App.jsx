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


/*
*   根据json动态渲染菜单
*/
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
            <Menu mode="inline" theme="dark" defaultSelectedKeys={['1']}>
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

/*
* 根据json渲染动态路由
*/
var rt = [],_data=menuData.data;
_data = (function genImageURL(items) {
    for (var i = 0, j = items.length; i < j; i++) {
      var item = items[i]
      if(item.submenu && item.submenu.length > 0){
        item.submenu.forEach(function(value){
          if(value.url){
            rt.push(<Route key={i} path={value.url} component={require('./user_manage' + value.url + value.url)} />)
          }
        })
      }else{
        if(item.url){
            rt.push(<Route key={i} path={item.url} component={require('./user_manage' + item.url + item.url)} />)
        }
      }
    }
    return rt;
})(_data);

/*
*路由的render
*/
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      {rt}
    </Route>
  </Router>
), document.body)

export default App;