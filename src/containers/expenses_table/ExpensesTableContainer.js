import React, { PureComponent } from 'react';
import ExpensesTable from '../../components/expenses_table/ExpensesTable';

class ExpensesTableContainer extends PureComponent {
  render() {
    return <ExpensesTable data={this.props.data} />;
  }
}

export default ExpensesTableContainer;
