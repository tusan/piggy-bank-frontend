import React from 'react';
import RecapTable from '../../components/recap_table/RecapTable';
import { connect } from 'react-redux';

export const onlyExpenses = data => data.amount < 0;

export const toTypeAmountOnly = data => ({
  key: data.key,
  amount: data.amount,
  type: data.type
});

export const aggregateByType = (acc, current) => {
  acc[current.type] = (acc[current.type] || 0) + current.amount;
  return acc;
};

export const toList = data =>
  Object.entries(data).map((entry, index) => ({
    type: entry[0],
    amount: entry[1],
    key: index
  }));

export const computeTotalAmount = data => {
  return data.reduce((curr, prev) => curr + prev.amount, 0);
};

export const buildRecapFromData = data => {
  const filteredData = data
    .filter(onlyExpenses)
    .map(toTypeAmountOnly)
    .reduce(aggregateByType, {});

  const aggregatedData = toList(filteredData);

  return {
    data: aggregatedData,
    totalAmount: computeTotalAmount(aggregatedData)
  };
};

const mapStateToProps = state => {
  console.log(buildRecapFromData(state.expenses))
  return buildRecapFromData(state.expenses);
}

export class RecapTableContainer extends React.PureComponent {
 render = () => {
   return <RecapTable data={this.props.data} totalAmount={this.props.totalAmount} />
  }
}

export default connect(mapStateToProps)(RecapTableContainer);
