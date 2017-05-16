import ReactDom from 'react-dom';
import React from 'react';
import App from './common/App';

require('../dist/scss/style.scss');

ReactDom.render(
  <App />,
  document.getElementById('react-app')
);
