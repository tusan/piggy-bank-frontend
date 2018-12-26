import React from 'react';
import { Table } from 'antd';

const baseSorter = (a, b) => (a > b ? 1 : -1);

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: baseSorter,
    width: 220,
    render: row => <span>{Intl.DateTimeFormat().format(row)}</span>
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    width: 220,
    render: row => <span>€ {row}</span>,
    sorter: baseSorter
  },
  {
    title: 'Type',
    dataIndex: 'type',
    sorter: baseSorter
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
