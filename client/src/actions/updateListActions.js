import axios from 'axios';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const UpdateListActions = {
  updatelist(bodyData) {
    axios.post('/updatelist', bodyData)
      .then((res) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_SUCCESS_MESSAGE,
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

module.exports = UpdateListActions;
