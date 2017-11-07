import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { reducer as campaignReducer } from './campaign';

import { saga as contactsSaga } from './contacts';

const reducer = combineReducers({
    campaign: campaignReducer
});

const saga = function*() {
    yield all([...contactsSaga]);
};

export {
    reducer,
    saga
};
