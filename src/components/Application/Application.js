import React, { Component } from 'react';
import CreateCampaignForm from 'components/CreateCampaignForm';
import CampaignTimeline from 'components/CampaignTimeline';
//import LeftPanel from 'components/LeftPanel';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import LoginAuth0 from 'components/LoginAuth0';
import { PropTypes } from 'prop-types';
import { clientId, domain } from 'config';
import { Menu, Breadcrumb, Layout, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;


class Application extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  _logout() {
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  }

  _isLoggedIn() {
    return this.props.data.user;
  }

  render() {
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
          <Button
            onClick={this._logout}
          >
            Logout
          </Button>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
      <Layout style={{ padding: '24px 0', background: '#fff' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
          >
              <Menu.Item key="9">Základní informace</Menu.Item>
              <Menu.Item key="10">Texty</Menu.Item>
              <Menu.Item key="11">Vizuály</Menu.Item>
              <Menu.Item key="12">Vyhodnocení kampaně</Menu.Item>
              <Menu.Item key="12">Channels</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <CreateCampaignForm />
          <CampaignTimeline />
        </Content>
      </Layout>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      Ant Design ©2016 Created by Ant UED
    </Footer>
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
