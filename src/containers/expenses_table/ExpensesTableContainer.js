import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExpensesTable from '../../components/expenses_table/ExpensesTable';

const mapStateToProps = (state) => ({
  data: state
});

class ExpensesTableContainer extends PureComponent {
  render() {
    return <ExpensesTable data={this.props.data} />;
  }
}

export default connect(mapStateToProps)(ExpensesTableContainer);
