import React, { Component } from 'react';
import { Button, Popover, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';
import Auth from '../../services/auth0';
const auth = new Auth();

class UserPanel extends Component {
  constructor(props) {
    super(props);
  }

  content = () =>
  (<div>
    <Button onClick={() => auth.logout(this.props.history)}>Odhlásit se</Button>
   </div>)

  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        <Popover placement="bottom" title={this.props.user && this.props.user.name}
            content={this.content()} trigger="click">
          <Avatar size="large"
            src={localStorage.getItem('auth_profile') && JSON.parse(localStorage.getItem('auth_profile')).picture} />
        </Popover>
      </div>
    );
  }
}

export default withRouter(UserPanel);
