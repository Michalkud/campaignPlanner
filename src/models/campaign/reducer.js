import * as types from './types';

const initState = [];

const reducer = (state = initState, action ) => {
  const { payload } = action;

  switch (action.type) {
    case types.ADD_CAMPAIGN:
      let newCampaigns = [...state];
      newCampaigns.push(payload.campaign);
      return newCampaigns;
    default:
      return state;
  }

}

export default reducer;

