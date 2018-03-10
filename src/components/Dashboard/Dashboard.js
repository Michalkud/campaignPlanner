import React, { Component } from 'react';
import { Col, Row, List } from 'antd';
import { CampaignsQuery, UserQuery } from 'queryComponents';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(props) {

  }

  render() {
    return (
    <div>
      <Row gutter={16}>
        <Col md={18} lg={18} className="gutter-row">
          Dashboard
        </Col>
        <Col md={18} lg={12} className="card gutter-row">
          <UserQuery>
            {
              ({ user }) => (<CampaignsQuery user={user}>
                {
                  ({ allCampaigns }) =>
                  (<List
                    itemLayout="horizontal"
                    dataSource={allCampaigns}
                    renderItem={campaign => (
                    <List.Item gutter={16} key={campaign.id} >
                      <Col md={12}>
                      <Link to={`/campaign/${campaign.id}`}
                        value={campaign.id}
                      >
                        {campaign.name}
                      </Link>
                      </Col>
                      <Col md={4}>
                        {moment(campaign.startDate).format('DD-MM-YYYY')}
                      </Col>
                      <Col md={4}>
                        {moment(campaign.endDate).format('DD-MM-YYYY')}
                      </Col>
                      <Col md={4}>
                        {numeral(campaign.budget.amount).format('0,0[.]00')} Kč
                      </Col>
                    </List.Item>
                  )} />
                  )
                }
              </CampaignsQuery>)
            }
          </UserQuery>
        </Col>
      </Row>
    </div>
    );
  }
}

export default Dashboard;
