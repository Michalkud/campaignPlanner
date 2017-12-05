import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const USER_ALREADY_EXISTS_ERROR_CODE = 3023;

class LoginAuth0 extends Component {

  constructor(props) {
    super(props);
    this._lock = new Auth0Lock(props.clientId, props.domain);
  }

  static propTypes = {
    clientId: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
  }

  componentDidMount() {
    this._lock.on('authenticated', (authResult) => {
      this._lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }

        // Save token and profile locally
        localStorage.setItem('auth0IdToken', authResult.idToken);
        this.signinGraphcool(authResult, profile);
        this.props.setUser(profile);
        this.props.history.push(`/campaign`);

        // Update DOM
      });

    });
  }

  signinGraphcool = async (auth0Token, profile) => {
    //console.info('Signing into Graphcool');
    // create user if necessary
    //console.log(auth0Token, profile);
    try {
      await this.props.createUser({
        variables: { idToken: auth0Token.idToken, name:profile.name, emailAddress: profile.email, emailSubscription:false }
      });
    } catch (e) {
      if (
        !e.graphQLErrors ||
        e.graphQLErrors[0].code !== USER_ALREADY_EXISTS_ERROR_CODE
      ) {
        throw e;
      }
    }
}

  _showLogin = () => {
    this._lock.show({
      closable: true,
      auth: {
        params: {
          state: '/' || window.location.pathname,
          scope: 'openid'
        },
      },
    });
  }

  render() {
    return (
      <div>
        <button
          onClick={this._showLogin}
          className="dib pa3 white bg-blue dim pointer"
        >
          Log in with Auth0
        </button>
      </div>
    );
  }
}

const createUser = gql`
  mutation ( $idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean! ) {
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }`;

/*const signinUser = gql`
  mutation signinUser($authToken: String!){
    signinUser(
      auth0: {
        idToken: $authToken
      }
    ) {
      token
      user {
        id,
        auth0UserId
      }
    }
  }
`*/

export default withRouter(graphql(createUser, { name: 'createUser' })(LoginAuth0));
