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
      date: moment("20181225"),
      amount: 10,
      type: 'MOTO',
      description: 'test description'
    }

    axiosMock
      .onPost('http://localhost:8080/api/v1/expenses', {
        date: '20181225',
        amount: 10,
        type: 'MOTO',
        description: 'test description'
      })
      .reply(201, {});

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

describe('users actions', () => {
  it('should create loginSuccesedAction action', () => {
    const expected = {
      type: 'LOGIN_SUCCEDED',
      session: { username: "test user", token: "token" }
    };

    expect(actions.sessionCreated({ username: "test user", token: "token" })).toEqual(expected);
  });

  it('should call login and dispatch login action', () => {
    const axiosMock = new MockAdapter(axios);
    const store = mockStore([]);
    const loginData = {
      username: "test_user",
      password: "password"
    }

    const session = { 
      username: "test_user", 
      token: "token" 
    }

    axiosMock
      .onPost('http://localhost:8080/api/v1/users/login', {
        username: "test_user",
        password: "password"
      })
      .reply(200, session)

    const expected = [
      {
        type: 'LOGIN_SUCCEDED',
        session
      }
    ];

    return store
      .dispatch(
        actions.login(loginData)
      )
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });

  it('should handle login fail', () => {
    const axiosMock = new MockAdapter(axios);
    const store = mockStore([]);
    const loginData = {
      username: "test_user",
      password: "password"
    }

    const session = { 
      username: "test_user", 
      token: "token" 
    }

    axiosMock
      .onPost('http://localhost:8080/api/v1/users/login', {
        username: "test_user",
        password: "wrong_password"
      })
      .reply(401)

    const expected = [
      {
        type: 'LOGIN_FAILED'      }
    ];

    return store
      .dispatch(
        actions.login(loginData)
      )
      .then(() => {
        expect(store.getActions()).toEqual(expected);
      });
  });
});