import Events from 'events';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';
let _successMessage = {};

const SuccessStore = Object.assign({}, EventEmitter.prototype, {
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
    return _successMessage;
  }
});

Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.SET_SUCCESS_MESSAGE:
      _successMessage = action.data;
      SuccessStore.emitChange();
      break;
    default:
  }
});

export default SuccessStore;
