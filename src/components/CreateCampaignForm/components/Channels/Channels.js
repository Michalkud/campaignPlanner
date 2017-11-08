import React, { Component } from 'react';
import Tagger from 'components/Tagger';
import { Spin } from 'antd';

class Channels extends Component {

  render() {
    const { data: { loading, allChannels }, onChange, checkedIds } = this.props;
    if ( loading ) return <Spin />;
    return (<Tagger tags={allChannels} onChange={onChange} checkedIds={checkedIds} />);
  }

}

export default Channels;

