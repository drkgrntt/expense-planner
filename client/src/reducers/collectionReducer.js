import {
  FETCH_COLLECTION,
  FETCH_COLLECTIONS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COLLECTIONS:
      return action.payload;
    case FETCH_COLLECTION:
      return action.payload;
    default:
      return state;
  }
};
