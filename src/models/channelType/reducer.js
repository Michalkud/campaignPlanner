import * as types from './types';

const initState = {
  selectedChannelTypeId: null
};

const reducer = (state = initState, action ) => {
  const { payload } = action;

  switch (action.type) {
    case types.SELECT_CHANNEL_TYPE_ID:
      return { ...state, selectedChannelTypeId: payload.channelTypeId };
    default:
      return state;
  }

};

export default reducer;
