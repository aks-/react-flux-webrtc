var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var WebrtcAppConstants == require('../constants/WebrtcAppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = WebrtcAppConstants.ActionTypes;
var CHANGE_EVT = 'change';

var CallStore = assign({}, EventEmitter.prototype, {
  //add date time logic etc
});

WebrtcAppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.MAKE_AUDIO_CALL:
      //make a call
      //add date time
      break;
    case ActionTypes.MAKE_VIDEO_CALL:
      //MAKE A CALL
      break;
    case ActionTypes.HANG_UP:
      //hang up
      break;
  }
});

module.exports = CallStore;
