import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ExpensesTableContainer } from './ExpensesTableContainer';
import ExpensesTable from './../../components/expenses_table/ExpensesTable';
import ExpensesTableFilter from '../../components/expenses_table/ExpensesTableFilter';
import moment from 'moment';

describe('Expense table logic', () => {
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });

  it('should create ExpenseTable component and load data', () => {
    const fakeData = [
      {
        key: 0,
        amount: -100,
        type: 'MOTO',
        description: 'a description'
      }
    ];
    const wrapper = shallow(<ExpensesTableContainer data={fakeData} />);

    const innerTable = wrapper.find(ExpensesTable).first();

    expect(innerTable.prop('data')).toEqual(fakeData);
    expect(innerTable.prop('handleRowClick')).toBeDefined();
    expect(innerTable.prop('columns')).toBeDefined();
  });

  it('should create ExpenseTableFilter component and load data', () => {
    const dateStart = moment('20181226');
    const dateEnd = moment('20181126');
    const fakeData = [
      {
        key: 0,
        amount: -100,
        type: 'MOTO',
        description: 'a description'
      }
    ];
    const wrapper = shallow(
      <ExpensesTableContainer
        data={fakeData}
        dateEnd={dateEnd}
        dateStart={dateStart}
      />
    );

    const filterForm = wrapper.find(ExpensesTableFilter);

    expect(filterForm.prop('handleFilterChange')).toBeDefined();
    expect(filterForm.prop('dateEndInit')).toEqual(dateEnd);
    expect(filterForm.prop('dateStartInit')).toEqual(dateStart);
  });
});
