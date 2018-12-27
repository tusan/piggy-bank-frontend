import axios from 'axios';
import * as urls from '../config/url';
import { message } from 'antd';

export const actionTypes = {
  EXPENSE_ADDED: 'EXPENSE_ADDED',
  EXPENSE_LOAD_SUCCESS: 'EXPENSE_LOAD_SUCCESS'
};

export const addExpense = expense => dispatch =>
  axios
    .post(
      `${urls.PROTOCOL}://${urls.EXPENSES_BASE_URL}/${urls.EXPENSES_PATH}`,
      {
        ...expense
      }
    )
    .then(() => dispatch(expenseAdded(expense)))
    .catch(res => message.error(res.message));

export const expenseAdded = expense => ({
  type: actionTypes.EXPENSE_ADDED,
  expense
});

export const expenseLoadSuccess = data => ({
  type: actionTypes.EXPENSE_LOAD_SUCCESS,
  data
});

export const loadExpenses = (dateStart, dateEnd) => dispatch =>
  axios
    .get(`${urls.PROTOCOL}://${urls.EXPENSES_BASE_URL}/${urls.EXPENSES_PATH}`, {
      params: {
        'date-start': dateStart.format('YYYYMMDD'),
        'date-end': dateEnd.format('YYYYMMDD')
      }
    })
    .then(res => res.data)
    .then(res => dispatch(expenseLoadSuccess(res)))
    .catch(res => message.error(res.message));
