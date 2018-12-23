import React from 'react';
import { Table } from 'antd';

import { Modal } from 'antd';
import ExpenseDetails from '../expense_details/ExpenseDetails';
import './ExpensesTable.css';

const baseSorter = (a, b) => (a > b ? 1 : -1);

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: baseSorter,
    width: 120,
    render: row => <span>{Intl.DateTimeFormat().format(row)}</span>
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: row => <span>€ {row}</span>,
    sorter: baseSorter
  },
  {
    title: 'Type',
    dataIndex: 'type'
  }
];

const handleClick = rowInfo =>
  Modal.confirm({
    title: 'Details',
    content: <ExpenseDetails item={rowInfo} />,
    iconType: 'zoom-in',
    maskClosable: true,
    cancelButtonProps: {
      style: { display: 'none' }
    }
  });

const ExpensesTable = props => (
  <Table
    dataSource={props.data}
    columns={columns}
    onRow={record => {
      return {
        onClick: () => handleClick(record)
      };
    }}
    pagination={{
      simple: true,
      pageSize: 50,
      defaultPageSize: 50,
      hideOnSinglePage: true
    }}
    size="small"
  />
);

export default ExpensesTable;
