const Dispatcher = require('../dispatcher/appDispatcher');
const ActionTypes = require('../constants/actionTypes');
const EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change';
let _userId = '';
let _error = '';

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
    return {
      userId: _userId,
      error: _error
    };
  }
});

Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.ADD_LIST:
      _userId = action.data;
      _error = action.error;
      AuthenticationStore.emitChange();
      break;
    default:
  }
});

module.exports = AuthenticationStore;
