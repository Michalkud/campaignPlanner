import React, { Component } from 'react';
import { Button, Popover, Avatar } from 'antd';
import Auth from '../../services/auth0';
const auth = new Auth();

class UserPanel extends Component {
  constructor(props) {
    super(props);
  }

  content = () =>
  (<div>
    <Button onClick={auth.logout}>Odhlásit se</Button>
   </div>)

  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        <Popover placement="bottom" title={this.props.user && this.props.user.name}
            content={this.content()} trigger="click">
          <Avatar size="large"
            src={this.props && this.props.user && this.props.user.picture} />
        </Popover>
      </div>
    );
  }
}

export default UserPanel;
