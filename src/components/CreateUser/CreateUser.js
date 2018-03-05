import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { selectors } from 'models/user';

class CreateUser extends Component {

  static propTypes = {
    createUser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  state = {
    emailAddress: '',
    name: '',
    emailSubscription: false
  }

  render() {
    if (this.props.data.loading) {
      return (<div>Loading...</div>);
    }

    //redirect if user is not logged in or did not finish Auth0 dialog
    if (this.props.data.user || window.localStorage.getItem('auth0IdToken') === null) {
      console.warn('Not a new user or already logged in!');
      return (<Redirect to={{
        pathname: '/'
      }} />);
    }

    return (
      <div>
        <input
          value={this.state.name}
          placeholder="Name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <input
          value={this.state.email}
          placeholder="Email"
          onChange={(e) => this.setState({ emailAddress: e.target.value })}
        />
        <div>
          <input
            value={this.state.emailSubscription}
            type="checkbox"
            onChange={(e) => this.setState({ emailSubscription: e.target.checked })}
          />
          <span>
            Subscribe to email notifications?
          </span>
          {this.state.name &&
          <button onClick={this.createUser}>Sign up</button>
          }
        </div>
      </div>
    );
  }

  createUser = () => {
    const variables = {
      idToken: window.localStorage.getItem('auth0IdToken'),
      name: this.state.name,
      emailAddress: this.state.emailAddress,
      emailSubscription: this.state.emailSubscription
    };

    this.props.createUser({ variables })
      .then((response) => {
        this.props.history.replace('/');
      })
      .catch((err) => {
        this.props.history.replace('/');
        console.error(err);
      });


  }
}

const createUser = gql`
  mutation ( $idToken: String!, $name: String!, $emailAddress: String!, $emailSubscription: Boolean! ) {
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, emailAddress: $emailAddress, emailSubscription: $emailSubscription) {
      id
    }
  }`;

  const userQuery = gql`
    query {
      user {
        id
      }
    }
  `;

  const mapStateToProps = state => ({
    reduxUser: selectors.getUser(state)
  });

export default connect(mapStateToProps)(graphql(createUser, { name: 'createUser' } )(
  graphql(userQuery, { options: { 
    fetchPolicy: 'network-only',
    skip: ({ reduxUser }) => !reduxUser 
  } })(withRouter(CreateUser)))
);

