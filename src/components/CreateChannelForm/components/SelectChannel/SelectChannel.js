import React, { Component } from 'react';
import { Spin, Select } from 'antd';

const Option = Select.Option;

class SelectChannel extends Component {

  render() {
    const { data: { loading, allChannelTypes }, onChange, selectedId } = this.props;
    if ( loading ) return <Spin />;
    console.log(selectedId);
    return (
    <Select onChange={onChange} value={selectedId} >
      {allChannelTypes.map( channelType => <Option key={channelType.id} value={channelType.id}>{channelType.name}</Option>)}
    </Select>
    );
  }

}

export default SelectChannel;

