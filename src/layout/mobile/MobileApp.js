import React from 'react';
import './MobileApp.css';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon } from 'antd';
import ExpensesTableContainer from './../../containers/expenses_table/ExpensesTableContainer';
import RecapTableContainer from './../../containers/recap_table/RecapTableContainer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import AddExpenseFormContainer from '../../containers/add_expenses/AddExpenseFormContainer';

const { Header, Content, Sider } = Layout;
const { Item } = Menu;

export default class MobileApp extends React.PureComponent {
  render = props => (
    <Router>
      <div className="App">
        <Layout>
          <Header className="App-header">PIGGY BANK</Header>
        </Layout>
        <Layout>
          <Sider collapsed={true} theme="light">
            <div className="logo" />
            <Menu mode="inline" defaultSelectedKeys={['1']}>
              <Item key="1">
                <Icon type="file-excel" />
                <Link to="/">Expenses</Link>
              </Item>
              <Item key="2">
                <Icon type="area-chart" />
                <Link to="/recap">Recap</Link>
              </Item>
              <Item key="3">
                <Icon type="file-add" />
                <Link to="/add">Add New</Link>
              </Item>
            </Menu>
          </Sider>
          <Layout>
            <Content className="App-content">
              <Route path="/" exact render={() => <ExpensesTableContainer />} />
              <Route path="/recap/" render={() => <RecapTableContainer />} />
              <Route path="/add/" render={() => <AddExpenseFormContainer />} />
            </Content>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}
