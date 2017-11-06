import React, { Component } from 'react';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


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
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      this.props.history.push(`/signup`);
    });
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
};

export default withRouter(LoginAuth0);
