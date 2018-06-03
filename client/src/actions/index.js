import axios from 'axios';
import _ from 'lodash';
import {
  CREATE_VACATION,
  FETCH_VACATIONS,
  FETCH_VACATION,

  CREATE_EXPENSE,
  FETCH_EXPENSES,
  FETCH_EXPENSE,
  UPDATE_EXPENSE,
  UNFETCH_EXPENSE,

  CREATE_ITEM,
  FETCH_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,

  SUBMIT_ITEM_FAIL
} from './types';

// ============================
//       EXPENSE ACTIONS
// ============================

// CREATE A NEW EXPENSE
export const createExpense = (values, history) => async dispatch => {
  const res = await axios.post('/api/expenses', values);

  history.push('/');
  dispatch({ type: CREATE_EXPENSE, payload: res.data });
};

// FETCH ALL EXPENSES
export const fetchExpenses = () => async dispatch => {
  const res = await axios.get('/api/expenses');

  dispatch({ type: FETCH_EXPENSES, payload: res.data });
};

// FETCH ONE EXPENSE
export const fetchExpense = id => async dispatch => {
  const res = await axios.get(`/api/expenses/${id}`);

  dispatch({ type: FETCH_EXPENSE, payload: res.data });
};

// EDIT FETCHED EXPENSE
export const updateExpense = (id, values, history) => async dispatch => {
  await axios.put(`/api/expenses/${id}`, values);

  history.push('/');
  dispatch({ type: UPDATE_EXPENSE });
};

// DELETE ONE EXPENSE
export const deleteExpense = id => async dispatch => {
  await axios.delete(`/api/expenses/${id}`);

  dispatch(fetchExpenses());
};

// GIVE A CLEAN FORM WHEN "NEW EXPENSE" IS CLICKED
export const unfetchExpense = () => dispatch => {
  dispatch({ type: UNFETCH_EXPENSE });
};

// ============================
//         ITEM ACTIONS
// ============================

// CREATE ITEMS FOR EXPENSES
export const createItem = values => dispatch => {
  dispatch({ type: CREATE_ITEM, payload: values });
};

// FETCH ONE EXPENSE ITEM
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
//      VACATION ACTIONS
// ============================

// FETCH ALL VACATIONS
export const fetchVacations = () => async dispatch => {
  const res = await axios.get('/api/vacations');

  dispatch({ type: FETCH_VACATIONS, payload: res.data });
};

// FETCH ONE VACATION
export const fetchVacation = id => async dispatch => {
  const res = await axios.get(`/api/vacations/${id}`);

  dispatch({ type: FETCH_VACATION, payload: res.data });
};

// CREATE A NEW VACATION
export const createVacation = expenses => async dispatch => {
  let info = {
    total: 0,
    expenses: expenses,
    dateRange: ''
  };

  // add vacation total
  _.map(expenses, expense => {
    info.total = info.total + expense.total;
  });

  // concatonate readable date range
  info.dateRange = `From ${expenses[expenses.length - 1].dateString} to ${expenses[0].dateString}`;

  const res = await axios.post('/api/vacations', info);

  dispatch({ type: CREATE_VACATION, payload: res.data });

  await axios.delete('/api/expenses');
};
