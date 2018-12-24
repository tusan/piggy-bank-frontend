import React from 'react';
import { connect } from 'react-redux';
import AddExpenseForm from '../../components/add_expenses/AddExpenseForm';
import { addExpense } from '../../actions/actions';

class AddExpenseFormContainer extends React.PureComponent {
  render = () => {
    return <AddExpenseForm onSubmitSuccess={this.props.onSubmitSuccess} />;
  };
}

const mapStateToProp = state => ({
  data: state
});

const mapDispatchToProps = dispatch => {
  return {
    onSubmitSuccess: value => {
      dispatch(addExpense(value));
    }
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(AddExpenseFormContainer);
