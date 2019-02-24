import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './actions';

import moment from 'moment';
import sinon from 'sinon';
import { ExpenseService } from '../services/expenseService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('expense actions', () => {
  let sandbox;
  let store;
  beforeEach(() => {
    store = mockStore([]);
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore()
  });

  it('should create expenseAdded action', () => {
    const expected = {
      type: 'EXPENSE_ADDED',
      expense: { amount: 0 }
    };

    expect(actions.expenseAdded({ amount: 0 })).toEqual(expected);
  });

  it('should call loadExpenses and dispatch loadExpensesSuccess action', () => {
    sandbox.stub(ExpenseService.prototype, "loadExpenses").returns([{ amount: 0 }]);

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
    sandbox.stub(ExpenseService.prototype, "addExpense").returns(true)

    const expense = {
      date: moment("20181225"),
      amount: 10,
      type: 'MOTO',
      description: 'test description'
    }

    const expected = [
      {
        type: 'EXPENSE_ADDED',
        expense
      }
    ];

    return store
      .dispatch(
        actions.addExpense(expense)
      )
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});
