import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExpensesTable from '../../components/expenses_table/ExpensesTable';
import ExpensesTableFilter from '../../components/expenses_table/ExpensesTableFilter';
import { loadExpenses } from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import ExpenseDetails from '../../components/expense_details/ExpenseDetails';

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

export class ExpensesTableContainer extends PureComponent {
  render = () => (
    <div>
      <ExpensesTable
        data={this.props.data}
        handleRowClick={this.handleRowClick}
      />
      <ExpensesTableFilter
        handleFilterChange={this.handleFilterChange}
        dateStartInit={this.props.dateStart}
        dateEndInit={this.props.dateEnd}
      />
    </div>
  );

  handleRowClick = rowInfo =>
    Modal.confirm({
      title: 'Details',
      content: <ExpenseDetails item={rowInfo} />,
      iconType: 'zoom-in',
      maskClosable: true,
      cancelButtonProps: {
        style: { display: 'none' }
      }
    });

  handleFilterChange = filters => {
    this.props.onFilterChanged(filters.dateStart, filters.dateEnd);
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesTableContainer);
