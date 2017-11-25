import * as types from './types';

const setUser = (user) => ({
  type: types.SET_USER,
  payload: { user }
});

export {
  setUser
};
