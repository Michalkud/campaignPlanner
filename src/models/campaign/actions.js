import * as types from './types';

const addCampaign = (campaign) => ({
  type: types.ADD_CAMPAIGN,
  payload: { campaign }
});

export {
  addCampaign
};
