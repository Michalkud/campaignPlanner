import React, { Component } from 'react';
import { Spin } from 'antd';

import Tagger from 'components/Tagger';

class Goals extends Component {

  render() {
    const { data: { allGoals, loading }, onChange, checkedIds } = this.props;

    if ( loading ) return <Spin />;

    return (<Tagger tags={allGoals} onChange={onChange} checkedIds={checkedIds} />);
  }
}

export default Goals;
