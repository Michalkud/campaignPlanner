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
        >
            <Menu.Item key="1">
              <Link to="/campaign">
                <Icon type="home" />
                <span>Základní informace</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2"><Link to="/media-plan"><Icon type="schedule" />
            <span>Média plán</span></Link></Menu.Item>
            { this.props.data &&
              this.props.data.Campaign &&
              this.props.data.Campaign.channelTypes &&
            <SubMenu key="sub3" title={<span><Icon type="notification" /><span>Kanály</span></span>} >
              { this.props.data.Campaign.channelTypes.map( channelType =>
                (<Menu.Item key={channelType.id}>
                  <Link to="/universal-channel-page" onClick={() => this.props.selectChannelTypeId(channelType.id)} >
                    <Icon type="mail" /><span>{channelType.name}</span>
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
