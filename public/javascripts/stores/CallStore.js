var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var WebrtcAppConstants == require('../constants/WebrtcAppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = WebrtcAppConstants.ActionTypes;
var CHANGE_EVT = 'change';

var CallStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVT);
  },
  addChangeListener: function() {
    this.on(CHANGE_EVT, callback);
  },
  removeChangeListener: function() {
    this.on(CHANGE_EVT, callback);
  }
});

WebrtcStore.dispatchToken = WebrtcAppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.MAKE_AUDIO_CALL:
      //made a call change the button state
      break;
    case ActionTypes.MAKE_VIDEO_CALL:
      //MAKE A CALL
      break;
    case ActionTypes.HANG_UP:
      //hang up
      break;
    case ActionTypes.ATTACH_AUDIO_SOURCE:
      //attach it
      break;
    case ActionTypes.ATTACH_VIDEO_SOURCE:
      //attach it
      break;
  }
});

module.exports = CallStore;
