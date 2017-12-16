import React from 'react';
import { Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import { CampaignsQuery, UserQuery } from 'queryComponents';

const Option = Select.Option;

const SelectCampaign = ({ selectCampaignId, selectedCampaignId }) => {
  return (
    <div>
      <div>
        <UserQuery>
          {
            ({ user }) => (<CampaignsQuery user={user}>
              {
                ({ allCampaigns }) =>
                (<Select
                  value={selectedCampaignId}
                  style={{ width: '30vw', maxWidth: '168px' }}
                  onChange={selectCampaignId}
                >
                    {allCampaigns.map(campaign => (
                      <Option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </Option>
                    ))}
                </Select>)
              }
            </CampaignsQuery>)
          }
        </UserQuery>
        <Button
          style={{ marginLeft: '10px', top: '-1px' }}
          onClick={() => selectCampaignId(null)}
        >
          <Link to="/new-campaign">New</Link>
        </Button>
      </div>
    </div>
  );
};

export default SelectCampaign;
