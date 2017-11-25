import React, { Component } from 'react';
import { Avatar, Button } from 'antd';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.user = props.userID;
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  _logout() {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken');
    location.reload();
  }

  render() {
    return (
      <div style={{ float:'right', position:'relative', zindex:'1000' }} onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>
        <div>
          <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
            <span>Jan Novak {this.user}</span>
          </div>
        {
          this.state.isHovering &&
        <div>
         <div>
          <Button onClick={this._logout}
            shape="circle" icon="logout" title="Logout" /> Odhlásit se
         </div>
        </div>
        }
      </div>
    );
  }
}

export default UserPanel;
