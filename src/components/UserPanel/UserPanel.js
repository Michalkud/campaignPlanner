import React, { Component } from 'react';
import { Button, Popover, Avatar } from 'antd';

class UserPanel extends Component {
  constructor(props) {
    super(props);
  }

  _logout() {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  }

  content = () => 
  (<Button onClick={this._logout}>Odhlásit se</Button>)
  
  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        <Popover placement="bottom" title={'User panel'} content={this.content()} trigger="click">
          <Avatar size="large" src={this.props && this.props.user && this.props.user.picture} />
        </Popover>
      </div>
    );
  }
}

export default UserPanel;
