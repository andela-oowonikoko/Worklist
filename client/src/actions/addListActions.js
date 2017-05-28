import axios from 'axios';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const AddListActions = {
  addlist(bodyData) {
    axios.post('/createtask', bodyData)
      .then((res) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.ADD_LIST,
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

module.exports = AddListActions;
