var WebrtcAppDispatcher = require('../dispatcher/WebrtcAppDispatcher');
var WebrtcAppConstants = require('../dispatcher/WebrtcAppConstants');
var WebrtcAPI = require('../utils/WebrtcAPI');

var ActionTypes = WebrtcAppConstants.ActionTypes;

module.exports = {
  makeAudioCall: function() {
    WebrtcAPI.makeAudioCall();
    WebrtcAppDispatcher.dispatch({
      type: ActionTypes.MAKE_AUDIO_CALL
    });
  },
  makeVideoCall: function() {
    WebrtcAPI.makeVideoCAll();
     WebrtcAppDispatcher.dispatch({
      type: ActionTypes.MAKE_VIDEO_CALL
    });
  },
  hangCall: function() {
    WebrtcAppDispatcher.dispatch({
      type: ActionTypes.HANG_UP
    });
  },
  afterCallHanged: function() {
    WebrtcAppDispatcher.dispatch({
      type: ActionTypes.AFTER_CALL_HANGED
    });
  },
  attachToSrc: function(url, event) {
    WebrtcAppDispatcher.dispatch({
      type: event,
      url: url
    });
  },
}
