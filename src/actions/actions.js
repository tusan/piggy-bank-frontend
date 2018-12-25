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
