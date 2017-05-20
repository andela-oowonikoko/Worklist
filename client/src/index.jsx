import ReactDom from 'react-dom';
import React from 'react';
import App from './components/common/App';

require('../dist/scss/style.scss');
const FetchlistActions = require('./actions/fetchlistActions');

if (localStorage.getItem('userId')) {
  const userId = localStorage.getItem('userId');

  FetchlistActions.fetchlist(userId);
}

ReactDom.render(
  <App />,
  document.getElementById('react-app')
);
