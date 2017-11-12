import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;
import { Link } from 'react-router-dom';

class SiderMenu extends Component {

render () {
    return (
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.handleClick}
        //  onOpenChange={onOpenChange}
        >
            <Menu.Item key="1"><Link to="/new-campaign">Základní informace</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/test">option2</Link></Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
    );
  }
}

export default SiderMenu;
