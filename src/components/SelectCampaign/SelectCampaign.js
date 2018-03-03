import React from 'react';
import { Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import { CampaignsQuery, UserQuery } from 'queryComponents';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

const Option = Select.Option;

const SelectCampaign = ({ selectCampaignId, selectedCampaignId }) => {
  const changeSelection = (id) => {
    selectCampaignId(id);
    if (history && history.location && history.location.pathname) {
      const pathInArray = history.location.pathname.split('/');
      if (pathInArray.length > 2) {
        pathInArray[2] = id;
        history.push(pathInArray.join('/'));
        //location.reload();
      }
    }
  };
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
                  style={{ width: '30vw' }}
                  onChange={changeSelection}
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
