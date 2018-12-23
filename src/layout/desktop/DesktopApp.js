import React from 'react';
import './DesktopApp.css';
import 'antd/dist/antd.css';
import { Layout, Row, Col } from 'antd';
import ExpensesTableContainer from './../../containers/expenses_table/ExpensesTableContainer';
import RecapTableContainer from './../../containers/recap_table/RecapTableContainer';
import AddExpenseForm from './../../components/add_expenses/AddExpensesForm';

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
              <ExpensesTableContainer data={this.props.data} />
            </Col>
            <Col xs={8} offset={1}>
              <RecapTableContainer data={this.props.data} />
              <AddExpenseForm />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}
