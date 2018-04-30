import {
  FETCH_RECEIPTS,
  FETCH_RECEIPT,
  CREATE_RECEIPT,
  CREATE_ITEM,
  UPDATE_RECEIPT,
  UNFETCH_RECEIPT,
  SUBMIT_ITEM_FAIL,
  DELETE_ITEM,
  UPDATE_ITEM,
  FETCH_ITEM
} from '../actions/types';

const INITIAL_STATE = {
  selectedId: '',
  items: [], 
  total: 0, 
  itemError: '', 
  receiptList: {},
  selectedItem: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_RECEIPT:
      // reset item array and total
      return { ...state, items: [], total: 0 };
    case FETCH_RECEIPTS:
      return { ...state, receiptList: action.payload };
    case FETCH_RECEIPT:
      return { 
        ...state, 
        selectedId: action.payload._id,
        items: action.payload.items,
        total: action.payload.total
      };
    case UPDATE_RECEIPT:
      // reset state after updating
      return { ...state, selectedId: '', items: [], total: 0 };
    case UNFETCH_RECEIPT:
      return {
        selectedId: '',
        items: [],
        total: 0,
        itemError: '',
        receiptList: {},
        selectedItem: {}
      };

    // ITEMS ARE IN THE RECEIPT REDUCER SINCE THEY ARE
    // EXCLUSIVELY STATE PIECES OF RECEIPTS AND
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
      // update receipt total and item list
      return { ...state, items: action.payload.items, total: action.payload.total };
    case FETCH_ITEM:
      return { ...state, selectedItem: action.payload };
    case UPDATE_ITEM:
      // update receipt total and item list, unfetch item.
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