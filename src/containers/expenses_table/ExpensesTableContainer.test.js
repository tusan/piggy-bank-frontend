import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ExpensesTableContainer } from './ExpensesTableContainer';
import ExpensesTable from './../../components/expenses_table/ExpensesTable';

describe('Expense table logic', () => {
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });

  it('should create ExpenseTable component and load data', () => {
    const onContainerMounted = jest.fn();
    const fakeData = [
      {
        key: 0,
        amount: -100,
        type: 'MOTO',
        description: 'a description'
      }
    ];
    const wrapper = mount(
      <ExpensesTableContainer
        data={fakeData}
        onContainerMounted={onContainerMounted}
      />
    );

    const innerTable = wrapper.find(ExpensesTable);

    expect(innerTable.prop('data')).toEqual(fakeData);
    expect(innerTable.prop('handleRowClick')).toBeDefined();

    expect(onContainerMounted).toHaveBeenCalled();
  });
});
