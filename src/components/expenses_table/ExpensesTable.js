import React from 'react';
import { Table } from 'antd';
import './ExpensesTable.css';

class ExpensesTable extends React.PureComponent {
  render = () => (
    <Table
      dataSource={this.props.data}
      columns={this.props.columns}
      onRow={record => ({
        onClick: () => this.props.handleRowClick(record)
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
}

export default ExpensesTable;
