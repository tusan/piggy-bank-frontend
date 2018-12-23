import { actionTypes } from './../actions/actions';

export const expenses = (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_EXPENSE:
      return [...state, { ...action.expense, key: state.length }];
    default:
      return state;
  }
};
