import * as types from './types';
import { load, save } from 'services/localStorage';

const initState = {
  selectedCampaignId: load('selectedCampaignId') || null
};

const reducer = (state = initState, action ) => {
  const { payload } = action;

  switch (action.type) {
    case types.SELECT_CAMPAIGN_ID:
      save('selectedCampaignId', payload.campaignId);
      return { ...state, selectedCampaignId: payload.campaignId };
    default:
      return state;
  }

};

export default reducer;
