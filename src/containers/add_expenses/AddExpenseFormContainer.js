import React from 'react';
import { connect } from 'react-redux';
import AddExpenseForm from '../../components/add_expenses/AddExpenseForm';
import { addExpense } from '../../actions/actions';
class AddExpenseFormContainer extends React.PureComponent {
  handleSubmitSuccess = value => {
    this.props.onAddExpense(value);
  };

  render = () => {
    return (
      <AddExpenseForm
        handleSubmitSuccess={this.handleSubmitSuccess}
        handleValueChange={this.handleValueChange}
      />
    );
  };
}

const mapStateToProp = state => ({
  data: state
});

const mapDispatchToProps = dispatch => {
  return {
    onAddExpense: value => {
      dispatch(addExpense(value));
    }
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(AddExpenseFormContainer);
