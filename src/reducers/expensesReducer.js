import { actionTypes } from './../actions/actions';

export const expenses = (state = [], action) => {
  switch (action.type) {
    case actionTypes.EXPENSE_ADDED:
      return [...state, { ...action.expense, key: state.length }];
    case actionTypes.EXPENSE_LOAD_SUCCESS:
      return action.data;
    default:
      return state;
  }
};
