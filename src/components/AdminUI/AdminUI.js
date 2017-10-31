import React, { Component } from 'react';
//import LeftPanel from 'components/LeftPanel';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import LoginAuth0 from 'components/LoginAuth0';
import { PropTypes } from 'prop-types';
import { clientId, domain } from 'config';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class Application extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  _logout() {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  }

  _isLoggedIn() {
    console.log(this.props.data.user);
    return this.props.data.user;
  }

  render() {
    console.log(this.props.data);
    if (this.props.data.loading) {
      return (<div>Loading</div>);
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn();
    } else {
      return this.renderLoggedOut();
    }

  }

  renderLoggedIn() {
    return (
      <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', float:'left' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      <Button style={{ float:'right', position: 'relative', top:'15px' }} onClick={this._logout}
      type="primary" shape="circle" icon="logout" title="Logout" />
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
            <Menu.Item key="5">option5</Menu.Item>
            <Menu.Item key="6">option6</Menu.Item>
            <Menu.Item key="7">option7</Menu.Item>
            <Menu.Item key="8">option8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
            <Menu.Item key="9">option9</Menu.Item>
            <Menu.Item key="10">option10</Menu.Item>
            <Menu.Item key="11">option11</Menu.Item>
            <Menu.Item key="12">option12</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>

    );
  }
  renderLoggedOut() {
    return (
      <div>
        <div className="pv3">
          <LoginAuth0
            clientId={clientId}
            domain={domain}
            history={history}
          />
        </div>
      </div>
    );
  }

}

const userQuery = gql`
query {
  user {
    id
    name
  }
}
`;


export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(withRouter(Application));
