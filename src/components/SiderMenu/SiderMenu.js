import React, { Component } from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import { Link } from 'react-router-dom';

class SiderMenu extends Component {

render () {
    console.log(this.props);
    return (
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          onClick={this.handleClick}
        >
            <Menu.Item key="1"><Link to="/new-campaign">Základní informace</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/media-plan">Média plán</Link></Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
            { this.props.data &&
              this.props.data.Campaign && 
              this.props.data.Campaign.channelTypes && 
            <SubMenu key="sub3" title="Kanály" >
              { this.props.data.Campaign.channelTypes.map( channelType =>
                (<Menu.Item key={channelType.id}>
                  <Link to="/universal-channel-page" onClick={() => this.props.selectChannelTypeId(channelType.id)} >
                    {channelType.name}
                  </Link>
                </Menu.Item>))
              }
            </SubMenu>
            }
        </Menu>
    );
  }
}

export default SiderMenu;
