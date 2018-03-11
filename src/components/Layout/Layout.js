import React, { Component } from 'react';
import SiderMenu from 'components/SiderMenu';
import { withRouter, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'antd/lib/locale-provider/style';
import 'styles/main.scss';
import { PropTypes } from 'prop-types';
import { Layout, Col, Icon } from 'antd';
import UserPanel from 'components/UserPanel';
const { Header, Content, Sider, Footer } = Layout;
import CampaignTimeline from 'components/CampaignTimeline';
import Dashboard from 'components/Dashboard';
import CreateCampaignForm from 'components/CreateCampaignForm';
import CampaignForm from 'components/CampaignOverview';
import UniversalChannelPage from 'components/UniversalChannelPage';
import Callback from 'components/Callback';
import { Button } from 'antd';
import Auth from '../../services/auth0';
const auth = new Auth();

class DefaultLayout extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  state = {
    collapsed: false,
    mobileDevice: false,
    id_campaign: null
  };
  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize.bind(this));
    this.resize();
  }

  getCampaignIDFromUrl(pathname) {
    return pathname.split('/')[2];
  }

  resize() {
    this.setState({ mobileDevice: window.innerWidth <= 1018 });
  }

  render() {
    if (auth.isAuthenticated()) {
      return this.renderLoggedIn();
    } else {
      return this.renderLoggedOut();
    }
  }

  renderLoggedIn() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className="header" style={{ padding: '0 25px' }}>
          <Col span={this.state.mobileDevice ? 18 : 12}>
            <Link className="new-campaign" to="/new-campaign">
              <Icon type="plus" /> Create new campaign
            </Link>
          </Col>
          <Col span={2} push={this.state.mobileDevice ? 4 : 10}>
            <UserPanel />
          </Col>
        </Header>
        <Layout>
          <Sider
            collapsible={true}
            collapsed={this.state.collapsed || this.state.mobileDevice}
            onCollapse={this.onCollapse}
          >
            <SiderMenu
              collapsed={this.state.collapsed || this.state.mobileDevice}
              selectedCampaignId={this.getCampaignIDFromUrl(
                this.props && this.props.location && this.props.location.pathname
              )}
            />
          </Sider>
          <Layout style={{ padding: '0 8px 24px' }}>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280
              }}
            >
              <Route exact={true} path="/" component={Dashboard} />
              <Route
                exact={true}
                path="/new-campaign"
                component={CreateCampaignForm}
              />
              <Route
                exact={true}
                path="/campaign/:id_campaign?"
                component={CampaignForm}
              />
              <Route
                exact={true}
                path="/campaign/:id_campaign?/media-plan"
                component={CampaignTimeline}
              />
              <Route
                exact={true}
                path="/campaign/:id_campaign?/universal-channel-page/:id_channel"
                component={UniversalChannelPage}
              />
              <Route exact={true} path="/callback" component={Callback} />
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
          <Col span={this.state.mobileDevice ? 18 : 12}>
            <div className="logo" style={{ float: 'left' }}>
              <h1 style={{ color: 'white', fontWeight: '600' }}>
                Marketing planner
              </h1>
            </div>
          </Col>
          <Col span={2} push={this.state.mobileDevice ? 4 : 10}>
            <Button name="btnLogin" type="primary" onClick={() => auth.login()}>
              Log in
            </Button>
            <Route exact={true} path="/callback" component={Callback} />
          </Col>
        </Header>
        <Layout />
      </Layout>
    );
  }
}

export default withRouter(DefaultLayout);
