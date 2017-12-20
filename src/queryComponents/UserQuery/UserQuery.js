import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Component } from 'react';

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
    return this.props.children(this.props.data);
  }
}

export default graphql(QUERY)(UserQuery);
