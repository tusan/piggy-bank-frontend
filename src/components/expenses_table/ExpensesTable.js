import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import './ExpensesTable.css';

const baseSorter = (a, b) => (a > b ? 1 : -1);

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    defaultSortOrder: 'ascend',
    sorter: baseSorter,
    width: 220,
    render: row => <span>{moment(row).format('L')}</span>
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
    scroll={{ y: 420 }}
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
