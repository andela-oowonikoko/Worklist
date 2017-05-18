import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const AuthenticationActions = {
  signup(bodyData) {
    fetch('/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(bodyData),
      credentials: 'include'
    })
      .then(res => res.json())
      .then((data) => {
        localStorage.setItem('userId', data.uid);
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_USERID,
          data: data.uid,
          error: data.errorMessage
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

module.exports = AuthenticationActions;
