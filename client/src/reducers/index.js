import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import collectionReducer from './collectionReducer';
import receiptReducer from './receiptReducer';
import { CREATE_ITEM } from '../actions/types';

export default combineReducers({
  collections: collectionReducer,
  receipts: receiptReducer,
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
