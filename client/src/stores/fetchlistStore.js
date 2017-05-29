import Events from 'events';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';
let _lists = {};

const FetchlistStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  getAllLists() {
    return _lists;
  }
});

Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.FETCH_LISTS:
      _lists = action.data;
      FetchlistStore.emitChange();
      break;
    default:
  }
});

export default FetchlistStore;
