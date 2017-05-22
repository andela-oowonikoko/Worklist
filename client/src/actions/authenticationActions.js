import axios from 'axios';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const AuthenticationActions = {
  signup(bodyData) {
    axios.post('/users', bodyData)
      .then((res) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_USERID,
          data: res.data.uid
        });
      })
      .catch((error) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_ERROR_MESSAGE,
          data: error.response.data.message
        });
      });
  },
  login(bodyData) {
    axios.post('/login', bodyData)
      .then((res) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_USERID,
          data: res.data.uid
        });
      })
      .catch((error) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_ERROR_MESSAGE,
          data: error.response.data.message
        });
      });
  },
  resetPassword(bodyData) {
    axios.post('/resetPassword', bodyData)
      .then((res) => {
        Materialize.toast(res.data.message, 4000, 'rounded');
        Dispatcher.dispatch({
          actionType: ActionTypes.GET_EMAIL,
          data: res.data.message
        });
      })
      .catch((error) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_ERROR_MESSAGE,
          data: error.response.data.message
        });
      });
  }
};

module.exports = AuthenticationActions;
