import React, { PureComponent } from 'react';
import './App.css';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import MobileApp from './layout/mobile/MobileApp';
import DesktopApp from './layout/desktop/DesktopApp';
import { fakeData } from './mock/api/mockExpenseService';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }
  updateExpenses = newData => {
    console.log('updating state...');
    this.setState({
      data: [...this.state.data, { ...newData, key: this.state.data.length }]
    });
  };

  render = () => (
    <div>
      <MediaQuery minDeviceWidth={1224}>
        <DesktopApp
          data={this.state.data}
          updateExpenses={this.updateExpenses}
        />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1224}>
        <MobileApp
          data={this.state.data}
          updateExpenses={this.updateExpenses}
        />
      </MediaQuery>
    </div>
  );

  componentDidMount = () => {
    //TODO add http call to backend service
    console.log('fetching data...');
    this.setState({ data: fakeData });
    console.log('data loaded');
  };
}

export default App;
