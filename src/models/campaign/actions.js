import * as types from './types';

const selectCampaignId = (campaignId) => ({
  type: types.SELECT_CAMPAIGN_ID,
  payload: { campaignId }
});

export {
  selectCampaignId
};
