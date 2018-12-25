import React, { PureComponent } from 'react';
import './App.css';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import MobileApp from './layout/mobile/MobileApp';
import DesktopApp from './layout/desktop/DesktopApp';
import { connect } from 'react-redux';

export class App extends PureComponent {
  render = () => (
    <div>
      <MediaQuery minDeviceWidth={1224}>
        <DesktopApp />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1224}>
        <MobileApp />
      </MediaQuery>
    </div>
  );
}

export default connect()(App);
