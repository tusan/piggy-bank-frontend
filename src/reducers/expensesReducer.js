import { actionTypes } from './../actions/actions';
import moment from 'moment';

export const expenses = (state = [], action) => {
  switch (action.type) {
    case actionTypes.EXPENSE_ADDED:
      return addExpense(state, action);
    case actionTypes.EXPENSE_LOAD_SUCCESS:
      return action.data.map(parseExpense);
    default:
      return state;
  }
};

const addExpense = (state, action) => [
  ...state,
  { ...action.expense, key: state.length }
];

const parseExpense = (expense, index) => ({
  ...expense,
  date: moment(expense.date),
  key: index
});
