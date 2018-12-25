import axios from 'axios';

export const actionTypes = {
  EXPENSE_ADDED: 'EXPENSE_ADDED',
  APPLICATION_STARTED: 'APPLICATION_STARTED',
  EXPENSE_LOAD_SUCCESS: 'EXPENSE_LOAD_SUCCESS'
};

export const addExpense = expense => ({
  type: actionTypes.EXPENSE_ADDED,
  expense
});

export const expenseLoadSuccess = data => ({
  type: actionTypes.EXPENSE_LOAD_SUCCESS,
  data
});

export const loadExpenses = () => (dispatch, getState) =>
  axios
    .get('http://localhost:8080/api/v1/expenses')
    .then(res => res.data)
    .then(res => dispatch(expenseLoadSuccess(res)))
    .catch(res => console.error(res));
