import React from 'react';
import { Table, Row, Col } from 'antd';

class RecapTable extends React.PureComponent {
  columns = [
    {
      title: 'Type',
      dataIndex: 'type'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      defaultSortOrder: 'descend',
      sorter: (a, b) => (a > b ? 1 : -1),
      render: row => <span>{this.props.formatAmount(row)}</span>
    }
  ];

  render = () => (
    <Table
      defaultPageSize={5}
      dataSource={this.props.data}
      columns={this.columns}
      pagination={{
        simple: true,
        pageSize: 50,
        defaultPageSize: 50,
        hideOnSinglePage: true
      }}
      size="small"
      footer={() => (
        <Row type="flex">
          <Col>
            <b>Total: </b>
          </Col>
          <Col offset={8}>
            <span className="totalAmount">{this.props.formatAmount(this.props.totalAmount)}</span>
          </Col>
        </Row>
      )}
    />
  );
}

export default RecapTable;
