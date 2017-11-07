import React, { Component } from 'react';
import { Avatar, Button } from 'antd';

class UserPanel extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div style={{ float:'right' }} onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}>
        <div>
          <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
            Jan Novak
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
