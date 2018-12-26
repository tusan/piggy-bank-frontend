import { actionTypes } from './../actions/actions';
import moment from 'moment';

const initialState = {
  expenses: [],
  dateStartFilter: moment().subtract(1, 'month'),
  dateEndFilter: moment()
};

export const expenses = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EXPENSE_ADDED:
      return addExpense(state, action);
    case actionTypes.EXPENSE_LOAD_SUCCESS:
      return { ...state, expenses: action.data.map(parseExpense) };
    case actionTypes.EXPENSE_FILTER_CHANGED:
      return {
        ...state,
        dateStartFilter: action.filters.dateStartFilter,
        dateEndFilter: action.filter.dateEndFilter
      };
    default:
      return state;
  }
};

const addExpense = (state, action) => ({
  ...state,
  expenses: [
    ...state.expenses,
    { ...action.expense, key: state.expenses.length }
  ]
});

const parseExpense = (expense, index) => ({
  ...expense,
  date: moment(expense.date),
  key: index
});
