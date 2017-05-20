const Dispatcher = require('../dispatcher/appDispatcher');
const ActionTypes = require('../constants/actionTypes');
const EventEmitter = require('events').EventEmitter;

const CHANGE_EVENT = 'change';
let _errorMessage = {};

const ErrorStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  getMessage() {
    return _errorMessage;
  }
});

Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.SET_ERROR_MESSAGE:
      _errorMessage = action.data;
      ErrorStore.emitChange();
      break;
    default:
  }
});

module.exports = ErrorStore;
