import React, { Component } from 'react';
import SiderMenu from 'components/SiderMenu';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Switch, withRouter } from 'react-router-dom';
import LoginAuth0 from 'components/LoginAuth0';
import { PropTypes } from 'prop-types';
import { clientId, domain } from 'config';
import { Layout, Breadcrumb } from 'antd';
import UserPanel from 'components/UserPanel';
const { Header, Content, Sider, Footer } = Layout;
import CampaignTimeline from 'components/CampaignTimeline';
import CreateCampaignForm from 'components/CreateCampaignForm';
import UniversalChannelPage from 'components/UniversalChannelPage';
import AdminUI from 'components/AdminUI';
import CreateUser from 'components/CreateUser';
import { Route } from 'react-router-dom';
import 'styles/main.scss';
import 'antd/lib/locale-provider/style';
import 'antd/dist/antd.css';
import SelectCampaign from 'components/SelectCampaign';

class DefaultLayout extends Component {

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
          <div className="logo" style={{ float:'left' }} >
            <h1 style={{ color:'white', fontWeight:'600' }}>Marketing planner</h1>
          </div>
          <SelectCampaign />
          <UserPanel />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <SiderMenu />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <Switch>
                  <Route exact={true} path="/new-campaign" component={CreateCampaignForm} />
                  <Route exact={true} path="/" component={AdminUI} />
                  <Route exact={true} path="/media-plan" component={CampaignTimeline} />
                  <Route exact={true} path="/universal-channel-page" component={UniversalChannelPage} />
                  <Route path="/signup" component={CreateUser} />
                </Switch>
            </Content>
          </Layout>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>

    );
  }

  renderLoggedOut() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" style={{ float:'left' }} >
            <h1 style={{ color:'white', fontWeight:'600' }}>Marketing planner</h1>
          </div>
          <UserPanel />
        </Header>
        <Layout>
          <div>
            <div className="pv3">
              <LoginAuth0
                clientId={clientId}
                domain={domain}
                history={history}
              />
            </div>
          </div>
      </Layout>
    </Layout>
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

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(withRouter(DefaultLayout));
