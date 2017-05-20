import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Error from '../error/Error';
import Login from '../login/login';
import MyList from '../user/MyList';


/**
 * @class App
 * @extends {Component}
 */
class App extends Component {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
  render() {
    return (
      <BrowserRouter>
        <div>
          <Error />
          <Route path="/app/login" component={Login} />
          <Route path="/app/mylist" component={MyList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
