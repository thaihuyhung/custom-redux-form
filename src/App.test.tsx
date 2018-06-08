import * as React from 'react';
import * as ReactDOM from 'react-dom';
const configureStore = require('redux-mock-store');
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';

const store = configureStore([
    thunk,
])();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
});
