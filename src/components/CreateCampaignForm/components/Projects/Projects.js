import React, { Component } from 'react';
import { Spin } from 'antd';

import Tagger from 'components/Tagger';

class Projects extends Component {

  render() {
    const { data: { allProjects, loading }, onChange, checkedIds } = this.props;

    if ( loading ) return <Spin />;

    return (<Tagger tags={allProjects} onChange={onChange} checkedIds={checkedIds} />);
  }
}

export default Projects;

