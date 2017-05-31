import axios from 'axios';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const FetchlistActions = {
  fetchlist(userId) {
    axios.get(`/users/?q=${userId}`)
      .then((res) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.FETCH_LISTS,
          data: res.data.data
        });
      });
  }
};

module.exports = FetchlistActions;
