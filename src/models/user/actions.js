import * as types from './types';

const setUserID = (userID) => ({
  type: types.USER_ID,
  payload: { userID }
});

export {
  setUserID
};
