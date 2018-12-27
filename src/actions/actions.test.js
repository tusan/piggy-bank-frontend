import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import moment from 'moment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('expense actions', () => {
  it('should create expenseAdded action', () => {
    const expected = {
      type: 'EXPENSE_ADDED',
      expense: { amount: 0 }
    };

    expect(actions.expenseAdded({ amount: 0 })).toEqual(expected);
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

  it('should call addExpense and dispatch expenseAdded action', () => {
    const axiosMock = new MockAdapter(axios);
    const store = mockStore([]);
    const expense = {
      date: '20181126',
      amount: 10,
      type: 'MOTO',
      description: 'test description'
    };

    axiosMock
      .onPost('http://localhost:8080/api/v1/expenses', expense)
      .reply(201, {});

    const expected = [
      {
        type: 'EXPENSE_ADDED',
        expense
      }
    ];

    return store
      .dispatch(
        actions.addExpense({
          date: '20181126',
          amount: 10,
          type: 'MOTO',
          description: 'test description'
        })
      )
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
