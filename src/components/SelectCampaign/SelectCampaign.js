import React from 'react';
import { Select, Spin, Button } from 'antd';
import { Link } from 'react-router-dom';

const Option = Select.Option;

const SelectCampaign = ({ data: { allCampaigns, loading, error }, selectCampaignId, selectedCampaignId }) => { 
  return (<div>
    {loading && <Spin /> }
    {allCampaigns && allCampaigns.length > 0 &&
    <div>
    <Select value={selectedCampaignId} style={{ width: 120 }} onChange={selectCampaignId}>
      {allCampaigns.map( campaign => <Option value={campaign.id}>{campaign.name}</Option>)}
    </Select>
    <Button onClick={() => selectCampaignId(null)}><Link to="/campaign">New</Link></Button>
    </div>
    }
  </div>);
};

export default SelectCampaign;
