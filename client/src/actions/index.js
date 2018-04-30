import axios from 'axios';
import _ from 'lodash';
import {
  CREATE_COLLECTION,
  FETCH_COLLECTIONS,
  FETCH_COLLECTION,

  CREATE_RECEIPT,
  FETCH_RECEIPTS,
  FETCH_RECEIPT,
  UPDATE_RECEIPT,
  UNFETCH_RECEIPT,

  CREATE_ITEM,
  FETCH_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,

  SUBMIT_ITEM_FAIL
} from './types';

// FETCH ALL COLLECTIONS
export const fetchCollections = () => async dispatch => {
  const res = await axios.get('/api/collections');

  dispatch({ type: FETCH_COLLECTIONS, payload: res.data });
};

// FETCH ONE COLLECTION
export const fetchCollection = id => async dispatch => {
  const res = await axios.get(`/api/collections/${id}`);

  dispatch({ type: FETCH_COLLECTION, payload: res.data });
};

// ============================
//       RECEIPT ACTIONS
// ============================

// CREATE A NEW RECEIPT
export const createReceipt = (values, history) => async dispatch => {
  const res = await axios.post('/api/receipts', values);

  history.push('/');
  dispatch({ type: CREATE_RECEIPT, payload: res.data });
};

// FETCH ALL RECEIPTS
export const fetchReceipts = () => async dispatch => {
  const res = await axios.get('/api/receipts');

  dispatch({ type: FETCH_RECEIPTS, payload: res.data });
};

// FETCH ONE RECEIPT
export const fetchReceipt = id => async dispatch => {
  const res = await axios.get(`/api/receipts/${id}`);

  dispatch({ type: FETCH_RECEIPT, payload: res.data });
};

// EDIT FETCHED RECEIPT
export const updateReceipt = (id, values, history) => async dispatch => {
  await axios.put(`/api/receipts/${id}`, values);

  history.push('/');
  dispatch({ type: UPDATE_RECEIPT });
};

// DELETE ONE RECEIPT
export const deleteReceipt = id => async dispatch => {
  await axios.delete(`/api/receipts/${id}`);

  dispatch(fetchReceipts());
};

// GIVE A CLEAN FORM WHEN "NEW RECEIPT" IS CLICKED
export const unfetchReceipt = () => dispatch => {
  dispatch({ type: UNFETCH_RECEIPT });
};

// ============================
//         ITEM ACTIONS
// ============================

// CREATE ITEMS FOR RECEIPTS
export const createItem = values => dispatch => {
  dispatch({ type: CREATE_ITEM, payload: values });
};

// FETCH ONE RECEIPT ITEM
export const fetchItem = item => dispatch => {
  dispatch({ type: FETCH_ITEM, payload: item });
};

// UPDATE FETCHED ITEM
export const updateItem = (items, id, { category, cost, description }) => dispatch => {
  const updatedItem = { 
    category,
    cost,
    description,
    _id: id
  };
  let newItems = {
    items: [],
    total: 0,
  };

  _.map(items, item => {
    if (item._id !== id) {
      newItems.items.push(item);
      newItems.total = newItems.total + item.cost;
    } else {
      newItems.items.push(updatedItem);
      newItems.total = newItems.total + updatedItem.cost;
    }
  });

  dispatch({ type: UPDATE_ITEM, payload: newItems });
};

// DELETE ONE ITEM
export const deleteItem = (items, id) => dispatch => {
  let newItems = {
    items: [],
    total: 0
  };

  _.map(items, item => {
    if (item._id !== id) {
      newItems.items.push(item);
      newItems.total = newItems.total + item.cost;
    }
  });

  dispatch({ type: DELETE_ITEM, payload: newItems });
};

// FORM VALIDATION
export const submitItemFail = () => dispatch => {
  dispatch({ type: SUBMIT_ITEM_FAIL });
};

// ============================
//      COLLECTION ACTIONS
// ============================

// CREATE A NEW COLLECTION
export const createCollection = receipts => async dispatch => {
  let info = {
    total: 0,
    receipts: receipts,
    dateRange: ''
  };

  // add collection total
  _.map(receipts, receipt => {
    info.total = info.total + receipt.total;
  });

  // concatonate readable date range
  info.dateRange = `From ${receipts[receipts.length - 1].dateString} to ${receipts[0].dateString}`;

  const res = await axios.post('/api/collections', info);

  dispatch({ type: CREATE_COLLECTION, payload: res.data });

  await axios.delete('/api/receipts');
};
