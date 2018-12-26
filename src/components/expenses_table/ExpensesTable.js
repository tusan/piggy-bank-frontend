import React from 'react';
import { Table } from 'antd';

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

const ExpensesTable = props => (
  <Table
    dataSource={props.data}
    columns={columns}
    onRow={record => ({
      onClick: () => props.handleRowClick(record)
    })}
    scroll={{ y: 700 }}
    pagination={{
      simple: true,
      pageSize: 80,
      defaultPageSize: 80,
      hideOnSinglePage: true
    }}
    size="small"
  />
);

export default ExpensesTable;
