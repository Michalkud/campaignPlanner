import { Component } from 'react';
import { withRouter } from 'react-router';
import { getAndStoreParameters, getIdToken, getEmail, getName } from 'services/auth';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Callback extends Component {

  componentDidMount() {
    getAndStoreParameters();
    this.createUser();
  }

  createUser = () => {
    const variables = {
      idToken: getIdToken(),
      emailAddress: getEmail(),
      name: getName()
    };
    console.log('createUser', getIdToken(), variables);
    this.props.createUser({ variables })
      .then((response) => {
          localStorage.setItem('userId', response.data.createUser.id);
          this.props.router.replace('/');
      }).catch((e) => {
        console.error('Error of life ', e);
        this.props.router.replace('/');
      });
  }

  render() {
    return null;
  }
}

const createUser = gql`
  mutation ($idToken: String!, $name: String!, $emailAddress: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: false) {
      id
    }
  }
`;

const userQuery = gql`
  query {
    user {
      id
    }
  }
`;

export default graphql(createUser, { name: 'createUser' })(
  graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(withRouter(Callback))
);
