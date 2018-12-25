import { expenseLoadSuccess } from './../actions/actions';
import axios from 'axios';

export const loadExpenses = () => (dispatch, getState) =>
  axios
    .get('http://localhost:8080/api/v1/expenses')
    .then(res => res.data)
    .then(res => dispatch(expenseLoadSuccess(res)))
    .catch(res => console.error(res));
