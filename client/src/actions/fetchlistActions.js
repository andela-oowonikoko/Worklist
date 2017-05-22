import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const FetchlistActions = {
  fetchlist(userId) {
    fetch(`/users/?q=${userId}`)
      .then(res => res.json())
      .then(data => {
        Dispatcher.dispatch({
          actionType: ActionTypes.FETCH_LISTS,
          data: data.data
        });
      });
  }
};

module.exports = FetchlistActions;

// fetch('url', {method: 'POST', body: data})