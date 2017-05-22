import axios from 'axios';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const ShareListActions = {
  getsharelist(userId, title) {
    axios.get(`/sharelist/?uid=${userId}&title=${title}`)
      .then((res) => {
        Dispatcher.dispatch({
          actionType: ActionTypes.SET_SHARE_LIST,
          data: res.data.data
        });
      });
  }
};

module.exports = ShareListActions;
