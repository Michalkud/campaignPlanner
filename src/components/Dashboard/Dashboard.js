import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { CampaignsQuery, UserQuery } from 'queryComponents';
import { Link } from 'react-router-dom';

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
        <Col md={18} lg={12} className="gutter-row">
          Dashboard
        </Col>
        <Col md={18} lg={12} className="card gutter-row">
          <UserQuery>
            {
              ({ user }) => (<CampaignsQuery user={user}>
                {
                  ({ allCampaigns }) =>
                  (<div>
                      {allCampaigns.map(campaign => (
                        <Row gutter={16}>
                          <Link to={`/campaign/${campaign.id}`}>
                            {campaign.name}
                          </Link>
                        </Row>
                      ))}
                  </div>)
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
