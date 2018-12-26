import React from 'react';
import renderer from 'react-test-renderer';
import ExpensesTableFilter from './ExpensesTableFilter';
import moment from 'moment';

describe('<ExpensesTableFilter />', () => {
  it('should render with default values', () => {
    const handleFilterChange = jest.fn();
    const dateStart = moment('20181126');
    const dateEnd = moment('20181226');

    const filterForm = renderer
      .create(
        <ExpensesTableFilter
          handleFilterChange={handleFilterChange}
          dateStartInit={dateStart}
          dateEndInit={dateEnd}
        />
      )
      .toJSON();
    expect(filterForm).toMatchSnapshot();
  });
});
