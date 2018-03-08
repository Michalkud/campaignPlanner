import React from 'react';
import { Spin, Select } from 'antd';

const Option = Select.Option;

const SelectGoals = ({ data: { allGoals, loading, error }, onChange, checkedIds }) => {
  return (<div>
    {loading && <Spin /> }
    {allGoals && allGoals.length > 0 &&
    <Select value={checkedIds} onChange={onChange}>
      {allGoals.map( goal => <Option key={goal.id} value={goal.id}>{goal.name}</Option>)}
    </Select>
    }
  </div>);
};

export default SelectGoals;
