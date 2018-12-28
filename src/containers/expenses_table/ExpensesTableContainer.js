import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExpensesTable from '../../components/expenses_table/ExpensesTable';
import ExpensesTableFilter from '../../components/expenses_table/ExpensesTableFilter';
import { loadExpenses } from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import ExpenseDetails from '../../components/expense_details/ExpenseDetails';
import MediaQuery from 'react-responsive';
import moment from 'moment';

const baseSorter = (a, b) => (a > b ? 1 : -1);

const formatAmount = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
}).format


const handleRowClick = rowInfo =>
  Modal.confirm({
    title: 'Details',
    content: <ExpenseDetails item={rowInfo} />,
    iconType: 'zoom-in',
    maskClosable: true,
    cancelButtonProps: {
      style: { display: 'none' }
    }
  });

const mapStateToProps = state => ({
  data: state.expenses,
  dateStart: state.dateStartFilter,
  dateEnd: state.dateEndFilter
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onFilterChanged: loadExpenses
    },
    dispatch
  );

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

const extendedColumns = [
  ...columns,
  {
    title: 'Description',
    dataIndex: 'description',
    sorter: baseSorter
  }
];

export class ExpensesTableContainer extends PureComponent {
  render = () => (
    <div>
      <MediaQuery maxDeviceWidth={1000}>
        <ExpensesTable
          data={this.props.data}
          handleRowClick={handleRowClick}
          columns={columns}
        />
      </MediaQuery>
      <MediaQuery minDeviceWidth={1000}>
        <ExpensesTable
          data={this.props.data}
          handleRowClick={handleRowClick}
          columns={extendedColumns}
        />
      </MediaQuery>
      <ExpensesTableFilter
        handleFilterChange={this.handleFilterChange}
        dateStartInit={this.props.dateStart}
        dateEndInit={this.props.dateEnd}
      />
    </div >
  );


  handleFilterChange = filters => {
    this.props.onFilterChanged(filters.dateStart, filters.dateEnd);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesTableContainer);
