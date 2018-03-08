import React, { Component } from 'react';
import { Button, Popover, Avatar } from 'antd';

class UserPanel extends Component {
  constructor(props) {
    super(props);
  }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    window.localStorage.removeItem('user');
    this.props.setUser(null);
    location.reload();
  }

  content = () =>
  (<div>
    <Button onClick={this._logout}>Odhlásit se</Button>
   </div>)

  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        <Popover placement="bottom" title={this.props.user.name}
            content={this.content()} trigger="click">
          <Avatar size="large"
            src={this.props && this.props.user && this.props.user.picture} />
        </Popover>
      </div>
    );
  }
}

export default UserPanel;
