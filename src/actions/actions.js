import { message } from 'antd';
import { ExpenseService } from '../services/expenseService'

export const actionTypes = {
  EXPENSE_ADDED: 'EXPENSE_ADDED',
  EXPENSE_LOAD_SUCCESS: 'EXPENSE_LOAD_SUCCESS',
};

const expenseService = new ExpenseService();

export const addExpense = expense => async dispatch => {
  try {
    await expenseService.addExpense(expense);
    return dispatch(expenseAdded(expense));
  } catch (error) {
    message.error(error)
  };
}

export const expenseAdded = expense => ({
  type: actionTypes.EXPENSE_ADDED,
  expense
});

export const expenseLoadSuccess = data => ({
  type: actionTypes.EXPENSE_LOAD_SUCCESS,
  data
});

export const loadExpenses = (dateStart, dateEnd) => async dispatch => {
  try {
    const result = await expenseService.loadExpenses(dateStart, dateEnd);
    return dispatch(expenseLoadSuccess(result))
  } catch (error) {
    message.error(error)
  }
}