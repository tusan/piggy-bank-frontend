export const actionTypes = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  EDIT_EXPENSE: 'EDIT_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE'
};

export const addExpense = expense => ({
  type: actionTypes.ADD_EXPENSE,
  expense
});
