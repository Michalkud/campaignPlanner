import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Spin } from 'antd';

const QUERY = gql`
query allCampaignsQuery( $userId: ID ) {
  allCampaigns( filter: { user: { id: $userId } }) {
    id
    name
    motto
    description
    target
    budget
    startDate
    endDate
  }
}`;

class CampaignsQuery extends Component {
  render() {
    if (!this.props.data || this.props.data.loading || !this.props.user ) return <Spin />;
    console.log(this.props.data);
    return this.props.children(this.props.data);
  }
}

export default graphql(QUERY, {
  skip: ({ user }) => !user,
  options: ({ user }) => ({ variables: { userId: user.id } }),
})(CampaignsQuery);
