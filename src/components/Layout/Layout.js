import React, { Component } from 'react';
import SiderMenu from 'components/SiderMenu';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Switch, withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import 'antd/lib/locale-provider/style';
import 'styles/main.scss';

import { PropTypes } from 'prop-types';
import { Layout, Col } from 'antd';
import UserPanel from 'components/UserPanel';
const { Header, Content, Sider, Footer } = Layout;
import CampaignTimeline from 'components/CampaignTimeline';
import CreateCampaignForm from 'components/CreateCampaignForm';
import CampaignOverview from 'components/CampaignOverview';
import UniversalChannelPage from 'components/UniversalChannelPage';
import { Route } from 'react-router-dom';
import { requireAuth } from 'services/auth';
import Callback from 'services/auth/callback';


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
      this.setState({ mobileDevice: window.innerWidth <= 1018 });
  }

  render() {

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
            <SiderMenu collapsed={this.state.collapsed || this.state.mobileDevice} />
          </Sider>
          <Layout style={{ padding: '0 8px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <Switch>
                  <Route exact={true} path="/" component={CampaignOverview} onEnter={requireAuth} />
                  <Route exact={true} path="/new-campaign" component={CreateCampaignForm} onEnter={requireAuth} />
                  <Route exact={true} path="/campaign" component={CampaignOverview} onEnter={requireAuth} />
                  <Route exact={true} path="/media-plan" component={CampaignTimeline} onEnter={requireAuth} />
                  <Route exact={true} path="/universal-channel-page" component={UniversalChannelPage} onEnter={requireAuth} />
                  <Route path="/callback" component={Callback} />
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
