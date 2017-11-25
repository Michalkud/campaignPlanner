import { combineReducers } from 'redux';
import { reducer as campaignReducer } from './campaign';


const reducer = combineReducers({
    campaign: campaignReducer
});
export {
    reducer
};
