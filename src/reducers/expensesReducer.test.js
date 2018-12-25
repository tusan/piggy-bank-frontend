import { actionTypes } from '../actions/actions';

describe('expenses reducer', () => {
  it('should handle EXPENSES_ADDED', () => {
    const result = expenses([], {
      type: actionTypes.EXPENSE_ADDED,
      expense: { amount: 0 }
    });

    expect(result).toEqual([{ amount: 0, key: 0 }]);
  });

  it('should handle EXPENSE_LOAD_SUCCESS', () => {
    const result = expenses([], {
      type: actionTypes.EXPENSE_LOAD_SUCCESS,
      data: [{ amount: 0 }, { amount: 1 }]
    });

    expect(result).toEqual([{ amount: 0 }, { amount: 1 }]);
  });
});

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
