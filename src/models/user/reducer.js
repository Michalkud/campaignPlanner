import * as types from './types';
import { load, save } from 'services/localStorage';

const initState = load('user') || null;

const reducer = (state = initState, action ) => {
  const { payload } = action;

  switch (action.type) {
    case types.SET_USER:
      const { user } = payload;
      save('user', user);
      return user;
    default:
      return state;
  }

};

export default reducer;
