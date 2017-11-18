import * as types from './types';

const initState = {
  selectedCampaignId: null
};

const reducer = (state = initState, action ) => {
  const { payload } = action;

  switch (action.type) {
    case types.SELECT_CAMPAIGN_ID:
      return { ...state, selectedCampaignId: payload.campaignId }
    default:
      return state;
  }

};

export default reducer;
