import React from 'react';
import { connect } from 'react-redux';
import AddExpenseForm from '../../components/add_expenses/AddExpenseForm';
import { addExpense } from '../../actions/actions';
import { bindActionCreators } from 'redux';

const mapStateToProp = state => ({
  data: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSubmitSuccess: value => {
        return _ => dispatch(addExpense(value));
      }
    },
    dispatch
  );

const AddExpenseFormContainer = () => (
  <AddExpenseForm onSubmitSuccess={this.props.onSubmitSuccess} />
);

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(AddExpenseFormContainer);
