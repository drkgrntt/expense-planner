import {
  FETCH_EXPENSES,
  FETCH_EXPENSE,
  CREATE_EXPENSE,
  CREATE_ITEM,
  UPDATE_EXPENSE,
  UNFETCH_EXPENSE,
  SUBMIT_EXPENSE_FAIL,
  SUBMIT_ITEM_FAIL,
  DELETE_ITEM,
  UPDATE_ITEM,
  FETCH_ITEM
} from '../actions/types';

const INITIAL_STATE = {
  selectedId: '',
  items: [], 
  title: '',
  total: 0, 
  itemError: '',
  expenseError: '',
  expenseList: {},
  selectedItem: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_EXPENSE:
      // reset title, item array, and total
      return { ...state, items: [], total: 0, title: '' };
    case FETCH_EXPENSES:
      return { ...state, expenseList: action.payload };
    case FETCH_EXPENSE:
      return { 
        ...state, 
        selectedId: action.payload._id,
        title: action.payload.title,
        items: action.payload.items,
        total: action.payload.total
      };
    case UPDATE_EXPENSE:
      // reset state after updating
      return { ...state, selectedId: '', items: [], total: 0, title: '' };
    case UNFETCH_EXPENSE:
      return {
        selectedId: '',
        items: [],
        total: 0,
        title: '',
        expenseError: '',
        itemError: '',
        expenseList: {},
        selectedItem: {}
      };
    case SUBMIT_EXPENSE_FAIL:
      return { ...state, expenseError: 'Please be sure to have an expense name and at least 1 item.' };


    // ITEMS ARE IN THE EXPENSE REDUCER SINCE THEY ARE
    // EXCLUSIVELY STATE PIECES OF EXPENSES AND
    // NOT SAVED INDIVIDUALLY IN THE BACK END
    case CREATE_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.cost,
        selectedItem: {},
        itemError: '',
      };
    case DELETE_ITEM:
      // update expense total and item list
      return { ...state, items: action.payload.items, total: action.payload.total };
    case FETCH_ITEM:
      return { ...state, selectedItem: action.payload };
    case UPDATE_ITEM:
      // update expense total and item list, unfetch item.
      return { 
        ...state, 
        items: action.payload.items, 
        total: action.payload.total, 
        selectedItem: {} 
      };
    case SUBMIT_ITEM_FAIL:
      return { ...state, itemError: 'Please complete all fields' };
    default:
      return state;
  }
};