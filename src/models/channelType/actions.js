import * as types from './types';

const selectChannelTypeId = (channelTypeId) => ({
  type: types.SELECT_CHANNEL_TYPE_ID,
  payload: { channelTypeId }
});

export {
  selectChannelTypeId
};
