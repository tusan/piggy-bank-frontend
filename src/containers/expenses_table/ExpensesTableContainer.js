import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ExpensesTable from '../../components/expenses_table/ExpensesTable';
import { loadExpenses } from '../../actions/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onContainerMounted: (_, getState) => loadExpenses
    },
    dispatch
  );

class ExpensesTableContainer extends PureComponent {
  componentDidMount = () => {
    this.props.onContainerMounted();
  };

  render() {
    return <ExpensesTable data={this.props.data} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesTableContainer);
