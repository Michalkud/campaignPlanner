import React, { Component } from 'react';
import { Spin, Select } from 'antd';

const Option = Select.Option;

class SelectChannel extends Component {
  render() {
    const { data, onChange, selectedId } = this.props;
    if (data.loading) return <Spin />;
    return (
      <Select onChange={onChange} value={selectedId}>
        {data.Campaign &&
          data.Campaign.channelTypes &&
          data.Campaign.channelTypes.map(channelType => (
            <Option key={channelType.id} value={channelType.id}>
              {channelType.name}
            </Option>
          ))}
      </Select>
    );
  }
}

export default SelectChannel;
