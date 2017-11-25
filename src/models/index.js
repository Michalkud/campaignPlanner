import { combineReducers } from 'redux';
import { reducer as campaignReducer } from './campaign';
import { reducer as userReducer } from './user';
import { reducer as channelTypeReducer } from './channelType';

const reducer = combineReducers({
    campaign: campaignReducer,
    user: userReducer,
    channelType: channelTypeReducer
});
export {
    reducer
};
