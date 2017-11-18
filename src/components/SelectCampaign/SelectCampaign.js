import React from 'react';
import { Select, Spin } from 'antd';

const Option = Select.Option;

const SelectCampaign = ({ data: { allCampaigns, loading, error }, selectCampaignId, selectedCampaignId }) => { 
  console.log(selectedCampaignId, 'here');
  return (<div>
    {loading && <Spin /> }
    {allCampaigns && allCampaigns.length > 0 && 
    <Select value={selectedCampaignId} style={{ width: 120 }} onChange={selectCampaignId}>
      {allCampaigns.map( campaign => <Option value={campaign.id}>{campaign.name}</Option>)}
    </Select>
    }
  </div>)
};

export default SelectCampaign;
