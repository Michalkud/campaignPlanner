import React, { Component } from 'react';
import SiderMenu from 'components/SiderMenu';
import { withRouter, Route } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'antd/lib/locale-provider/style';
import 'styles/main.scss';
import LoginAuth0 from 'components/LoginAuth0';
import { PropTypes } from 'prop-types';
import { clientId, domain } from 'config';
import { Layout, Col } from 'antd';
import UserPanel from 'components/UserPanel';
const { Header, Content, Sider, Footer } = Layout;
import CampaignTimeline from 'components/CampaignTimeline';
import Dashboard from 'components/Dashboard';
import CreateCampaignForm from 'components/CreateCampaignForm';
import CampaignForm from 'components/CampaignOverview';
import UniversalChannelPage from 'components/UniversalChannelPage';
import CreateUser from 'components/CreateUser';


import SelectCampaign from 'components/SelectCampaign';

class DefaultLayout extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  state = {
    collapsed: false,
    mobileDevice: false,
    id_campaign: null
  };
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
    this.setState({ id_campaign:this.getCampaignIDFromUrl(this.props.location.pathname) });
  }

  getCampaignIDFromUrl(pathname) {
    return pathname.split('/')[2];
  }

  resize() {
      this.setState({ mobileDevice: window.innerWidth <= 1018 });
  }

  _logout() {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  }

  _isLoggedIn() {
    return localStorage.getItem('auth0IdToken');
  }

  componentDidUpdate() {
    if (this.state.id_campaign !== this.getCampaignIDFromUrl(this.props.location.pathname)) {
      this.setState({ id_campaign:this.getCampaignIDFromUrl(this.props.location.pathname) });
    }
  }

  render() {
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
          <Col span={this.state.mobileDevice ? 18 : 12}>
              <SelectCampaign />
          </Col>
          <Col span={2} push={this.state.mobileDevice ? 4 : 10}>
            <UserPanel />
          </Col>
        </Header>
        <Layout>
          <Sider collapsible={true}
            collapsed={this.state.collapsed || this.state.mobileDevice}
            onCollapse={this.onCollapse}>
            <SiderMenu collapsed={this.state.collapsed || this.state.mobileDevice} campaignID={this.state.id_campaign} />
          </Sider>
          <Layout style={{ padding: '0 8px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                  <Route exact={true} path="/" component={Dashboard} />
                  <Route exact={true} path="/new-campaign" component={CreateCampaignForm} />
                  <Route exact={true} path="/campaign/:id_campaign?" component={CampaignForm} />
                  <Route exact={true} path="/campaign/:id_campaign?/media-plan" component={CampaignTimeline} />
                  <Route exact={true} path="/campaign/:id_campaign?/universal-channel-page" component={UniversalChannelPage} />
                  <Route path="/signup" component={CreateUser} />
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

export default withRouter(DefaultLayout);
