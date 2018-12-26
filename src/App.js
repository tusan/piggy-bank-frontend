import React, { PureComponent } from 'react';
import './App.css';
import MediaQuery from 'react-responsive';
import 'antd/dist/antd.css';
import MobileApp from './layout/mobile/MobileApp';
import DesktopApp from './layout/desktop/DesktopApp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadExpenses } from './actions/actions';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onContainerMounted: loadExpenses
    },
    dispatch
  );

const mapStateToProps = state => ({
  dateStart: state.dateStartFilter,
  dateEnd: state.dateEndFilter
});

export class App extends PureComponent {
  componentDidMount = () => {
    this.props.onContainerMounted(this.props.dateStart, this.props.dateEnd);
  };

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
