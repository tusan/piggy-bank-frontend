import React from 'react';
import AddExpenseForm from '../../components/add_expenses/AddExpenseForm';

class AddExpenseFormContainer extends React.PureComponent {
  handleSubmitSuccess = value => {
    this.props.updateExpenses(value);
  };

  handleValueChange = e => {};

  render = () => {
    return (
      <AddExpenseForm
        handleSubmitSuccess={this.handleSubmitSuccess}
        handleValueChange={this.handleValueChange}
      />
    );
  };
}

export default AddExpenseFormContainer;
