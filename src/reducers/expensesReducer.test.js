import { actionTypes } from '../actions/actions';
import { expenses } from './expensesReducer';
import moment from 'moment';

describe('expenses reducer', () => {
  const initialState = { expenses: [], dateStartFilter: '', dateEndFilter: '' };

  it('should handle EXPENSES_ADDED', () => {
    const result = expenses(initialState, {
      type: actionTypes.EXPENSE_ADDED,
      expense: { amount: 0 }
    });

    expect(result).toEqual({
      dateStartFilter: '',
      dateEndFilter: '',
      expenses: [{ amount: 0, key: 0 }]
    });
  });

  it('should handle EXPENSE_LOAD_SUCCESS', () => {
    const expected = {
      dateStartFilter: '',
      dateEndFilter: '',
      expenses: [
        {
          type: 'MOTO',
          date: moment('20181226'),
          amount: 0,
          key: 0
        },
        {
          type: 'MOTO',
          date: moment('20181226'),
          amount: 1,
          key: 1
        }
      ]
    };

    const actual = expenses(initialState, {
      type: actionTypes.EXPENSE_LOAD_SUCCESS,
      data: [
        { type: 'MOTO', date: '20181226', amount: 0 },
        { type: 'MOTO', date: '20181226', amount: 1 }
      ]
    });

    expect(actual).toEqual(expected);
  });
});
