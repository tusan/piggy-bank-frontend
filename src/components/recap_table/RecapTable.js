import React from 'react';
import { Table, Row, Col } from 'antd';

const columns = [
  {
    title: 'Type',
    dataIndex: 'type'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    render: row => <span>€ {row}</span>
  }
];

const RecapTable = props => (
  <Table
    defaultPageSize={5}
    dataSource={props.data}
    columns={columns}
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
        <Col offset={10}>
          <span className="totalAmount">€ {props.totalAmount.toFixed(2)}</span>
        </Col>
      </Row>
    )}
  />
);

export default RecapTable;
