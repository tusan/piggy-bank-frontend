import React from 'react';
import { Table } from 'antd';
import './ExpenseDetails.css';

const ExpenseDetails = props => {
  const { item } = props;

  return (
    <Table
      dataSource={[
        {
          key: 1,
          prop: 'Date',
          value: Intl.DateTimeFormat().format(item.date)
        },
        {
          key: 2,
          prop: 'Amount',
          value: '€' + item.amount
        },
        {
          key: 3,
          prop: 'Type',
          value: item.type
        },
        {
          key: 4,
          prop: 'Description',
          value: item.description
        }
      ]}
      columns={[
        {
          title: 'prop',
          dataIndex: 'prop',
          key: 'prop',
          render: text => <b>{text}</b>,
          width: '120px'
        },
        { title: 'value', dataIndex: 'value', key: 'value' }
      ]}
      showHeader={false}
      pagination={false}
      size="small"
    />
  );
};

export default ExpenseDetails;
