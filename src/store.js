import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer, saga } from 'models';

// Enable DevTools extension in Google Chrome
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    devTools,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(saga);

export default store;
