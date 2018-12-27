import React from 'react';
import renderer from 'react-test-renderer';
import ExpensesTable from './ExpensesTable';
import moment from 'moment';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('<ExpensesTable />', () => {
  it('should render with no items', () => {
    const table = renderer.create(<ExpensesTable data={[]} />).toJSON();
    expect(table).toMatchSnapshot();
  });

  it('should render with one item', () => {
    const fakeData = [
      {
        key: 0,
        amount: -100,
        type: 'MOTO',
        description: 'a description'
      }
    ];

    const table = renderer.create(<ExpensesTable data={fakeData} />).toJSON();
    expect(table).toMatchSnapshot();
  });

  it('should render with more items', () => {
    const fakeData = [...Array(5).keys()].map(index => ({
      key: index,
      amount: -100,
      type: 'CASA',
      description: 'a description',
      date: moment('20181226')
    }));

    const table = renderer.create(<ExpensesTable data={fakeData} />).toJSON();

    expect(table).toMatchSnapshot();
  });
});

describe('event listeners', () => {
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });
  it('should use callback when user click on single row', () => {
    const handleRowClick = jest.fn();
    const fakeData = [
      {
        key: 0,
        amount: -100,
        type: 'MOTO',
        description: 'a description'
      }
    ];
    const wrapper = mount(
      <ExpensesTable data={fakeData} handleRowClick={handleRowClick} />
    );
    wrapper.find('tr.ant-table-row').simulate('click');

    expect(handleRowClick).toHaveBeenCalled();
  });
});
