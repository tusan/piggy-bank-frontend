import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExpensesTable from '../../components/expenses_table/ExpensesTable';
import { loadExpenses } from '../../actions/actions';
import { bindActionCreators } from 'redux';
import { Modal } from 'antd';
import ExpenseDetails from '../../components/expense_details/ExpenseDetails';

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onContainerMounted: loadExpenses
    },
    dispatch
  );

export class ExpensesTableContainer extends PureComponent {
  componentDidMount = () => {
    this.props.onContainerMounted();
  };

  render() {
    return (
      <ExpensesTable
        data={this.props.data}
        handleRowClick={this.handleRowClick}
      />
    );
  }

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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesTableContainer);
