import React from 'react';
import renderer from 'react-test-renderer';
import ExpenseDetails from './ExpenseDetails';
import moment from 'moment';

describe('<ExpenseDetails />', () => {
  it('should display an ExpenseDetails table', () => {
    const fakeExpense = {
      key: 0,
      amount: -100,
      type: 'MOTO',
      description: 'a description',
      date: moment('20181226')
    };

    const table = renderer.create(<ExpenseDetails item={fakeExpense} />);

    expect(table).toMatchSnapshot();
  });
});
