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
  SUBMIT_EXPENSE_FAIL,

  CREATE_ITEM,
  FETCH_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SUBMIT_ITEM_FAIL,

  LOGIN_USER,
  REGISTER_USER,
  LOGIN_USER_FAIL,
  REGISTER_USER_FAIL,
  FETCH_USER,
  LOGOUT_USER
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

export const submitExpenseFail = () => dispatch => {
  dispatch({ type: SUBMIT_EXPENSE_FAIL });
};

// ============================
//         ITEM ACTIONS
// ============================

// CREATE ITEMS FOR EXPENSES
export const createItem = ({ category, cost, description }) => dispatch => {
  const makeid = () => {
    return Math.floor(Math.random() * 1000000000).toString();
  };
  const newItem = {
    category,
    cost,
    description,
    _id: makeid()
  };

  dispatch({ type: CREATE_ITEM, payload: newItem });
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
    total: 0
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
export const createVacation = (expenses, history, { title, description }) => async dispatch => {
  let info = {
    title,
    description,
    total: 0,
    expenses,
    dateRange: ''
  };

  // add vacation total
  _.map(expenses, expense => {
    info.total = info.total + expense.total;
  });

  // concatonate readable date range
  info.dateRange = `From ${expenses[expenses.length - 1].dateString} to ${expenses[0].dateString}`;

  const res = await axios.post('/api/vacations', info);

  history.push('/vacations');
  dispatch({ type: CREATE_VACATION, payload: res.data });

  await axios.delete('/api/expenses');
};

// ============================
//         USER ACTIONS
// ============================

// CREATE A NEW USER
export const registerUser = (values, history) => async dispatch => {
  const { username, password, verify } = values;

  const validateEmail = email => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(String(email).toLowerCase());
  }
  
  // form validation
  if (username === undefined || password === undefined) {
    return dispatch(registerUserFail("Please complete all the fields."))
  } else if (validateEmail(username) === false) {
    return dispatch(registerUserFail("Please use correct email format (example@gmail.com)."));
  } else if (password.length < 8) {
    return dispatch(registerUserFail("Password must be at least 8 characters."));
  } else if (password !== verify) {
    return dispatch(registerUserFail("Passwords do not match."));
  }

  const res = await axios.post('/api/register', values);

  if (res.data.message) {
    return dispatch(registerUserFail("This email is already in use."));
  }

  history.push('/');
  dispatch({ type: REGISTER_USER, payload: res.data });
};

// SENDS ERROR MESSAGE
const registerUserFail = error => async dispatch => {
  dispatch({ type: REGISTER_USER_FAIL, payload: error });
};

// LOGIN WITH EXISTING USER
export const loginUser = (values, history) => async dispatch => {
  const res = await axios.post('/api/login', values);

  if (res.data.message) {
    return dispatch(loginUserFail(res.data.message));
  }

  history.push('/');
  dispatch({ type: LOGIN_USER, payload: res.data });
};

// RETURNS ERROR MESSAGE
const loginUserFail = error => async dispatch => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
};

// FETCH CURRENT USER
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/currentUser');

  dispatch({ type: FETCH_USER, payload: res.data });
};

// LOGOUT
export const logoutUser = history => async dispatch => {
  const res = await axios.get('/api/logout');

  history.push('/');
  dispatch({ type: LOGOUT_USER, payload: res.data });
};
