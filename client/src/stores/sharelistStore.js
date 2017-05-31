import Events from 'events';
import Dispatcher from '../dispatcher/appDispatcher';
import ActionTypes from '../constants/actionTypes';

const EventEmitter = Events.EventEmitter;
const CHANGE_EVENT = 'change';
let _list = {};

const ShareListStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange() {
    this.emit(CHANGE_EVENT);
  },
  getList() {
    return _list;
  }
});

Dispatcher.register((action) => {
  switch (action.actionType) {
    case ActionTypes.SET_SHARE_LIST:
      _list = action.data;
      ShareListStore.emitChange();
      break;
    default:
  }
});

export default ShareListStore;
