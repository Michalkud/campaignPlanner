import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from 'models/user';
import { Spin } from 'antd';

const QUERY = gql`
query user {
  user {
    id
    name
    auth0UserId
    campaigns {
      id
    }
    company {
      id
    }
    emailAddress
    emailSubscription
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

const mapStateToProps = state => ({
  reduxUser: selectors.getUser(state)
});

export default connect(mapStateToProps)(graphql(QUERY, { skip: ({ reduxUser }) => !reduxUser })(UserQuery));
