import Events from 'events';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';
let _userId = '';
let _resetPasswordMessage = '';

const AuthenticationStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  getUserId() {
    return _userId;
  },
  getResetMessage() {
    return _resetPasswordMessage;
  }
});

Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.SET_USERID:
      _userId = action.data;
      AuthenticationStore.emitChange();
      break;
    case ActionTypes.GET_EMAIL:
      _resetPasswordMessage = action.data;
      AuthenticationStore.emitChange();
      break;
    default:
  }
});

export default AuthenticationStore;
