import React, { Component } from 'react';
import { Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Error from '../error/Error';
import Success from '../success/Success';
import ShareList from '../share/ShareList';
import Login from '../login/login';
import MyList from '../user/MyList';
import Profile from '../profile/Profile';


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
      <BrowserRouter history={browserHistory}>
        <div>
          <Error />
          <Success />
          <Route path="/app/login" component={Login} />
          <Route path="/app/mylist" component={MyList} />
          <Route path="/app/profile" component={Profile} />
          <Route path="/app/sharelist/" component={ShareList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
