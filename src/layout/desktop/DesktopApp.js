import React from 'react';
import './DesktopApp.css';
import 'antd/dist/antd.css';
import { Layout, Row, Col } from 'antd';
import ExpensesTableContainer from './../../containers/expenses_table/ExpensesTableContainer';
import RecapTableContainer from './../../containers/recap_table/RecapTableContainer';
import AddExpenseFormContainer from './../../containers/add_expenses/AddExpenseFormContainer';

const { Header, Content } = Layout;

export default class DesktopApp extends React.PureComponent {
  render = () => (
    <div className="App">
      <Layout>
        <Header className="App-header">PiggyBank</Header>
      </Layout>
      <Layout>
        <Content className="App-content">
          <Row type="flex">
            <Col xs={15}>
              <ExpensesTableContainer />
            </Col>
            <Col xs={8} offset={1}>
              <RecapTableContainer />
              <AddExpenseFormContainer />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
