import React, { Component } from 'react';
import SiderMenu from 'components/SiderMenu';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Switch, withRouter } from 'react-router-dom';
import LoginAuth0 from 'components/LoginAuth0';
import { PropTypes } from 'prop-types';
import { clientId, domain } from 'config';
import { Layout, Col } from 'antd';
import UserPanel from 'components/UserPanel';
const { Header, Content, Sider, Footer } = Layout;
import CampaignTimeline from 'components/CampaignTimeline';
import CreateCampaignForm from 'components/CreateCampaignForm';
import CampaignForm from 'components/CampaignOverview';
import UniversalChannelPage from 'components/UniversalChannelPage';
import CreateUser from 'components/CreateUser';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'styles/main.scss';
import 'antd/lib/locale-provider/style';

import SelectCampaign from 'components/SelectCampaign';

class DefaultLayout extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    collapsed: false,
    mobileDevice: false
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  resize() {
      this.setState({ mobileDevice: window.innerWidth <= 760 });
  }

  _logout() {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  }

  _isLoggedIn() {
    return localStorage.getItem('auth0IdToken');
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
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header" style={{ padding:'0 25px' }} >
          <Col span={this.state.mobileDevice ? 18 : 8}>
            <SelectCampaign />
          </Col>
          <Col span={2} push={this.state.mobileDevice ? 4 : 14}>
            <UserPanel />
          </Col>
        </Header>
        <Layout>
          <Sider collapsible={true}
            collapsed={this.state.collapsed || this.state.mobileDevice}
            onCollapse={this.onCollapse}>
            <SiderMenu collapsed={this.state.collapsed || this.state.mobileDevice} />
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <Switch>
                  <Route exact={true} path="/new-campaign" component={CreateCampaignForm} />
                  <Route exact={true} path="/campaign" component={CampaignForm} />
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
