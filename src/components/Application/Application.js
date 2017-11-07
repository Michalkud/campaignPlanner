import React, { Component } from 'react';
import CreateCampaignForm from 'components/CreateCampaignForm';
//import LeftPanel from 'components/LeftPanel';
import CampaignTimeline from 'components/CampaignTimeline';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import LoginAuth0 from 'components/LoginAuth0';
import { PropTypes } from 'prop-types';
import { clientId, domain } from 'config';


class Application extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  }

  _logout() {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  }

  _isLoggedIn() {
    return this.props.data.user;
  }

  render() {
    if (this.props.data.loading) {
      return (<div>Loading</div>);
    }

    if (this._isLoggedIn()) {
      return this.renderLoggedIn();
    } else {
      return this.renderLoggedOut();
    }

  }

  renderLoggedIn() {
    return (
      <div>
        <div className="pv3">
          <button
            className="dib bg-red white pa3 pointer dim"
            onClick={this._logout}
          >
            Logout
          </button>
          <CreateCampaignForm />
          <CampaignTimeline />
        </div>
      </div>
    );
  }

  renderLoggedOut() {
    return (
      <div>
        <div className="pv3">
          <LoginAuth0
            clientId={clientId}
            domain={domain}
            history={history}
          />
        </div>
      </div>
    );
  }

}

const userQuery = gql`
query {
  user {
    id
    name
  }
}
`;


export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(withRouter(Application));
