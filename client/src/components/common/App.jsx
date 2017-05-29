import React from 'react';
import { Route, browserHistory } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Error from '../error/Error';
import Success from '../success/Success';
import ShareList from '../share/ShareList';
import Login from '../login/Login';
import MyList from '../user/MyList';
import Profile from '../profile/Profile';



/**
 * @export
 * @returns {void}
 */
export default function App() {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
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

