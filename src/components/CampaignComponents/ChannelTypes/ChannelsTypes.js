import React, { Component } from 'react';
import Tagger from 'components/Tagger';
import { Spin } from 'antd';

class ChannelTypes extends Component {

  render() {
    const { data: { loading, allChannelTypes }, onChange, checkedIds } = this.props;
    if ( loading ) return <Spin />;
    return (<Tagger tags={allChannelTypes} onChange={onChange} checkedIds={checkedIds} />);
  }

}

export default ChannelTypes;

