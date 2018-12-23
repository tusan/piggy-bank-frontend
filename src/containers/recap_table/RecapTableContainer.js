import React from 'react';
import RecapTable from '../../components/recap_table/RecapTable';

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

class RecapTableContainer extends React.PureComponent {
  render = () => {
    const filteredData = this.props.data
      .filter(onlyExpenses)
      .map(toTypeAmountOnly)
      .reduce(aggregateByType, {});

    const sortedData = toList(filteredData);

    return (
      <RecapTable
        data={sortedData}
        totalAmount={computeTotalAmount(sortedData)}
      />
    );
  };
}

export default RecapTableContainer;
