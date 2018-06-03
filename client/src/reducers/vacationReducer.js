import {
  FETCH_VACATION,
  FETCH_VACATIONS
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_VACATIONS:
      return action.payload;
    case FETCH_VACATION:
      return action.payload;
    default:
      return state;
  }
};
