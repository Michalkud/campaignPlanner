import React, { Component } from 'react';
import { Col, Row } from 'antd';

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
          <span>Text</span>
        </Col>
      </Row>
    </div>
    );
  }
}

export default Dashboard;
