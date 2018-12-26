import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';
import { fail, doesNotReject } from 'assert';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('expense actions', () => {
  it('should create addExpense action', () => {
    const expected = {
      type: 'EXPENSE_ADDED',
      expense: { amount: 0 }
    };

    expect(actions.addExpense({ amount: 0 })).toEqual(expected);
  });

  it('should call loadExpenses and dispatch loadExpensesSuccess action', () => {
    const axiosMock = new MockAdapter(axios);
    const store = mockStore([]);

    axiosMock
      .onGet('http://localhost:8080/api/v1/expenses', {
        params: {
          'date-start': '20181126',
          'date-end': '20181226'
        }
      })
      .reply(200, [{ amount: 0 }]);

    const expected = [
      {
        type: 'EXPENSE_LOAD_SUCCESS',
        data: [{ amount: 0 }]
      }
    ];

    return store
      .dispatch(actions.loadExpenses(moment('20181126'), moment('20181226')))
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
