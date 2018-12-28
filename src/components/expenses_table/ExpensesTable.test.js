import React from 'react';
import renderer from 'react-test-renderer';
import ExpensesTable from './ExpensesTable';
import moment from 'moment';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const formatAmount = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
}).format

const baseSorter = (a, b) => (a > b ? 1 : -1);

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  defaultSortOrder: 'ascend',
  sorter: baseSorter,
  width: 220,
  render: row => <span>{moment(row).format('DD/MM/YYYY')}</span>
},
{
  title: 'Amount',
  dataIndex: 'amount',
  width: 220,
  render: row => <span>{formatAmount(row)}</span>,
  sorter: baseSorter
},
{
  title: 'Type',
  dataIndex: 'type',
  width: 200,
  sorter: baseSorter
}]

describe('<ExpensesTable />', () => {
  it('should render with no items', () => {
    const table = renderer.create(<ExpensesTable
      data={[]}
      formatAmount={formatAmount}
      columns={columns}
    />).toJSON();
    expect(table).toMatchSnapshot();
  });

  it('should render with one item', () => {
    const fakeData = [
      {
        key: 0,
        amount: -100,
        type: 'MOTO',
        description: 'a description',
        date: moment('20181227')
      }
    ];

    const table = renderer.create(<ExpensesTable
      data={fakeData}
      formatAmount={formatAmount}
      columns={columns}
    />).toJSON();
    expect(table).toMatchSnapshot();
  });

  it('should render with more items', () => {
    const fakeData = [...Array(5).keys()].map(index => ({
      key: index,
      amount: -100,
      type: 'CASA',
      description: 'a description',
      date: moment('20181227')
    }));

    const table = renderer.create(<ExpensesTable
      data={fakeData}
      formatAmount={formatAmount}
      columns={columns}
    />).toJSON();

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
        description: 'a description',
        date: moment('20181227')
      }
    ];
    const wrapper = mount(
      <ExpensesTable
        data={fakeData}
        handleRowClick={handleRowClick}
        formatAmount={formatAmount}
        columns={columns}
      />
    );
    wrapper.find('tr.ant-table-row').simulate('click');

    expect(handleRowClick).toHaveBeenCalled();
  });
});
