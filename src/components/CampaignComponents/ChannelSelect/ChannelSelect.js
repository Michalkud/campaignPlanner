import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const propTypes = {
  allChannelTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    //color: PropTypes.string,
      name: PropTypes.string,
      colorClass: PropTypes.string,
    }).isRequired
  ),
  onChange : PropTypes.function,
  defaultValues: PropTypes.array
};

class ChannelSelect extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedChannelTypes: props.defaultValue || []
    };

    props.onChange(this.state.selectedChannelTypes);
  }

  onChannelSelect = (channelTypeId) => {
    if (this.state.selectedChannelTypes.indexOf(channelTypeId) !== -1) {
      this.setState({ selectedChannelTypes : this.state.selectedChannelTypes.filter( cId => cId !== channelTypeId ) },
      () => this.props.onChange(this.state.selectedChannelTypes));
    } else {
      this.setState({ selectedChannelTypes : [...this.state.selectedChannelTypes, channelTypeId] },
      () => this.props.onChange(this.state.selectedChannelTypes) );
    }
  }

  render() {
    const { allChannelTypes } = this.props;
    const { selectedChannelTypes } = this.state;

    return (<div>
      Typy channelů:
        {allChannelTypes.map(channelType =>
          (<Tag
            onClick={() => this.onChannelSelect(channelType.id)}
            className={selectedChannelTypes.indexOf(channelType.id) !== -1 && channelType.colorClass}
          >
            {channelType.name}
          </Tag>)
        )}
    </div>);

  }
}

ChannelSelect.propTypes = propTypes;

export default ChannelSelect;
