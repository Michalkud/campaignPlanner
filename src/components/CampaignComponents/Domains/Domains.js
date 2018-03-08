import React, { Component } from 'react';
import { Spin } from 'antd';

import Tagger from 'components/Tagger';

class Domains extends Component {

  render() {
    const { data: { allDomains, loading }, onChange, checkedIds } = this.props;

    if ( loading ) return <Spin />;

    return (<Tagger tags={allDomains} onChange={onChange} checkedIds={checkedIds} />);
  }
}

export default Domains;

