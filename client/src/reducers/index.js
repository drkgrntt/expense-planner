import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import vacationReducer from './vacationReducer';
import expenseReducer from './expenseReducer';
import userReducer from './userReducer';
import { CREATE_ITEM } from '../actions/types';

export default combineReducers({
  vacations: vacationReducer,
  expenses: expenseReducer,
  user: userReducer,
  form: formReducer.plugin({
    // clear item form after submit
    ItemForm: (state, action) => {
      switch(action.type) {
        case CREATE_ITEM:
          return undefined;
        default:
          return state;
      }
    }
  })
});
