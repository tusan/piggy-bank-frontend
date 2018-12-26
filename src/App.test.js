import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

it('renders without crashing', () => {
  const onMount = jest.fn();
  const div = document.createElement('div');
  ReactDOM.render(<App onContainerMounted={onMount} />, div);
  ReactDOM.unmountComponentAtNode(div);

  expect(onMount).toHaveBeenCalled();
});
