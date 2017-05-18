import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const AddListActions = {
  addlist(bodyData) {
    fetch('/createtask', {
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
        Dispatcher.dispatch({
          actionType: ActionTypes.ADD_LIST,
          data
        });
      });
  }
};

module.exports = AddListActions;
