import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Auth from '../../services/auth0';
const auth = new Auth();
class Callback extends React.Component {
  componentDidMount() {
    auth.handleAuthentication(async (err, authResult) => {
      // Failed. Send back home
      if (err) this.props.history.push('/');
      // Send mutation to Graphcool with idToken
      // as the accessToken
      const result = await this.props.authMutation({
        variables: {
          accessToken: authResult.idToken
        }
      });
      // Save response to localStorage
      auth.storeGraphCoolCred(result.data.authenticateUser);
      // Redirect to profile page
      this.props.history.push('/');
    });
  }
  render() {
    // Show a loading text while the app validates the user
    return <div>Loading...</div>;
  }
}

// Mutation query
const AUTH_MUTATION = gql`
  mutation authMutation($accessToken: String!) {
    authenticateUser(accessToken: $accessToken) {
      id
      token
    }
  }
`;

export default graphql(AUTH_MUTATION, { name: 'authMutation' })(Callback);
