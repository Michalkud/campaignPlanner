import React, { Component } from 'react';
import { 
  Menu, 
  MenuItem

} from 'material-ui';

class LeftPanel extends Component {
  render() {
    return (
      <Menu>
        <MenuItem primaryText="Preview" />
      </Menu>
    )
  }
}

export default LeftPanel;
