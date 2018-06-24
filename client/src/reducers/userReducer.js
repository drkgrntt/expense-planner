import { 
  FETCH_USER, 
  LOGIN_USER_FAIL,
  REGISTER_USER_FAIL,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
  currentUser: null,
  error: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { error: '', currentUser: action.payload };
    case REGISTER_USER:
      return { error: '', currentUser: action.payload };
    case FETCH_USER:
      return { currentUser: action.payload || false };
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload };
    case REGISTER_USER_FAIL:
      return { ...state, error: action.payload };
    case LOGOUT_USER:
      return { currentUser: action.payload };
    default:
      return state;
  }
};
