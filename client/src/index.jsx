import ReactDom from 'react-dom';
import React from 'react';
import App from './components/common/App';

require('../dist/scss/style.scss');
const FetchlistActions = require('./actions/fetchlistActions');

const userDetails = JSON.parse(localStorage.getItem('worklist'));
const userId = userDetails.uid;

FetchlistActions.fetchlist(userId);

ReactDom.render(
  <App />,
  document.getElementById('react-app')
);
