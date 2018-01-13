import React, { Component } from 'react';
import { Button, Popover, Avatar } from 'antd';
import { login, logout, isLoggedIn } from 'services/auth';

class UserPanel extends Component {
  constructor(props) {
    super(props);
  }

  content = () => (
    <div>
      {isLoggedIn() ? (
        <Button onClick={() => logout()}>
          Log out
        </Button>
      ) : (
        <Button onClick={() => login()}>
          Log In
        </Button>
      )}
    </div>
  );

  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        <Popover
          placement="bottom"
          title={this.props.user.name}
          content={this.content()}
          trigger="click"
        >
          <Avatar
            size="large"
            src={this.props && this.props.user && this.props.user.picture}
          />
        </Popover>
      </div>
    );
  }
}

export default UserPanel;
