import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { Spin } from 'antd';

const QUERY = gql`
query user {
  user {
    id
    auth0UserId
    campaigns {
      id
    }
    company {
      id
    }
    email
  }
}`;

class UserQuery extends Component {
  render() {
    if (!this.props.data || this.props.data.loading || !this.props.data.user) {
      return <Spin />;
    }
    return this.props.children(this.props.data);
  }
}

export default graphql(QUERY)(UserQuery);
