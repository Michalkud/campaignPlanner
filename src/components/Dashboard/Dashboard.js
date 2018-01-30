import React, { Component } from 'react';
import { Col, Row } from 'antd';
import { CampaignsQuery, UserQuery } from 'queryComponents';
import { Link } from 'react-router-dom';
import { actions } from 'models/campaign';
import { connect } from 'react-redux';
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
                        <Row gutter={16} key={campaign.id} >
                          <Col md={12}>
                          <Link to={`/campaign/${campaign.id}`}
                            value={campaign.id}
                            onClick={() => this.props.selectCampaignId(campaign.id)}
                          >
                            {campaign.name}
                            {}
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
const mapDispatchToProps = (dispatch) => {
  return {
    selectCampaignId: (id) => dispatch(actions.selectCampaignId(id)),
  };
};

export default connect(null, mapDispatchToProps)(Dashboard);
