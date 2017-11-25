import * as types from './types';

const initState = {
  userID: 1341223
};

const reducer = (state = initState, action ) => {
  const { payload } = action;

  switch (action.type) {
    case types.USER_ID:
      return { ...state, userID: payload.userID };
    default:
      return state;
  }

};

export default reducer;
